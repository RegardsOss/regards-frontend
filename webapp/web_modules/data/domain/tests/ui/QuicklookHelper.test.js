/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import isNil from 'lodash/isNil'
import { assert } from 'chai'
import { DATA_TYPES_ENUM } from '../../common/DataTypes'
import { QuicklookHelper } from '../../ui/QuicklookHelper'

/**
 * Test ModulesManager
 * @author Raphaël Mechali
 */
describe('[Domain] Testing QuicklookHelper', () => {
  /** 1 - Test grouping */
  function buildImgDataFile(dataType, {
    name, reference = false, online = true, size, types,
  }) {
    return {
      dataType,
      reference,
      uri: `http://mydomain.com/myURI/${name}.png`,
      mimeType: 'image/png',
      imageWidth: size,
      imageHeight: size,
      online,
      checksum: name,
      digestAlgorithm: 'potatoes-digest',
      filesize: 25,
      filename: name,
      types,
    }
  }
  function buildDataFiles(quicklooksSD, quicklooksMD, quicklookHD) {
    return {
      [DATA_TYPES_ENUM.RAWDATA]: [],
      [DATA_TYPES_ENUM.DOCUMENT]: [],
      [DATA_TYPES_ENUM.OTHER]: [],
      [DATA_TYPES_ENUM.THUMBNAIL]: [],
      [DATA_TYPES_ENUM.QUICKLOOK_SD]: quicklooksSD.map((f) => buildImgDataFile(DATA_TYPES_ENUM.QUICKLOOK_SD, f)),
      [DATA_TYPES_ENUM.QUICKLOOK_MD]: quicklooksMD.map((f) => buildImgDataFile(DATA_TYPES_ENUM.QUICKLOOK_MD, f)),
      [DATA_TYPES_ENUM.QUICKLOOK_HD]: quicklookHD.map((f) => buildImgDataFile(DATA_TYPES_ENUM.QUICKLOOK_HD, f)),
    }
  }

  const testCases = [{
    title: 'getQuicklooks method should group correctly when group name is not specified (no filter)',
    files: buildDataFiles([
      {
        name: 'sd_1', reference: false, online: true, size: 35,
      },
    ], [
      {
        name: 'md_1', reference: false, online: false, size: 70,
      },
    ], [
      {
        name: 'hd1', reference: true, online: false, size: 140,
      },
      {
        name: 'hd2', reference: false, online: false, size: 140,
      }]),
    filter: () => true,
    primaryGroup: 'any',
    expectedGroups: [{
      primary: false,
      [DATA_TYPES_ENUM.QUICKLOOK_SD]: 0, // using index here for convenience
      [DATA_TYPES_ENUM.QUICKLOOK_MD]: 0,
      [DATA_TYPES_ENUM.QUICKLOOK_HD]: 1, // last should be the one selected
    }],
  }, {
    title: 'getQuicklooks method should group correctly on group name and filter using default predicate (available file)',
    files: buildDataFiles([{
      name: 'sd1', reference: false, online: true, size: 35, types: ['g1'],
    }, {
      name: 'sd2', reference: false, online: false, size: 35, types: ['g2'], // filtered
    }, {
      name: 'sd3', reference: true, online: false, size: 35, types: ['g3', 'mainGrupp'],
    }, {
      name: 'sd4', reference: false, online: false, size: 35, types: ['g4'], // filtered
    }], [{
      name: 'md1', reference: true, online: false, size: 35, types: ['g1'],
    }, {
      name: 'md2', reference: false, online: true, size: 35, types: ['g2'],
    }, {
      name: 'md3', reference: false, online: true, size: 35, types: ['g3', 'mainGrupp'],
    }, {
      name: 'md4', reference: false, online: false, size: 35, types: ['g4'], // filtered
    }], [{
      name: 'hd1', reference: true, online: false, size: 35, types: ['g1'],
    }, {
      name: 'hd2', reference: false, online: false, size: 35, types: ['g2'], // filtered
    }, {
      name: 'hd3', reference: false, online: false, size: 35, types: ['g3', 'mainGrupp'], // filtered
    }, {
      name: 'hd4', reference: false, online: false, size: 35, types: ['g4'], // filtered
    }, {
      name: 'hd8', reference: true, online: false, size: 35, // should create the unknwon group
    }]),
    primaryGroup: 'mainGrupp',
    expectedGroups: [{
      label: 'g3', // primary first
      primary: true,
      [DATA_TYPES_ENUM.QUICKLOOK_SD]: 2,
      [DATA_TYPES_ENUM.QUICKLOOK_MD]: 2,
    }, { // next: alpha (unknwown first)
      primary: false,
      [DATA_TYPES_ENUM.QUICKLOOK_HD]: 4,
    }, {
      label: 'g1',
      primary: false,
      [DATA_TYPES_ENUM.QUICKLOOK_SD]: 0,
      [DATA_TYPES_ENUM.QUICKLOOK_MD]: 0,
      [DATA_TYPES_ENUM.QUICKLOOK_HD]: 0,
    }, {
      label: 'g2',
      primary: false,
      [DATA_TYPES_ENUM.QUICKLOOK_MD]: 1,
    }], // g4 should be removed as completely filtered
  }]

  testCases.forEach(({
    title, files, primaryGroup, filter, expectedGroups,
  }) => it(title, () => {
    const realExpected = expectedGroups.map((group) => ({
      label: group.label,
      primary: group.primary,
      ...[DATA_TYPES_ENUM.QUICKLOOK_SD, DATA_TYPES_ENUM.QUICKLOOK_MD, DATA_TYPES_ENUM.QUICKLOOK_HD].reduce((acc, type) => {
        const acc2 = { ...acc }
        if (!isNil(group[type])) {
          acc2[type] = files[type][group[type]]
        }
        return acc2
      }, {}),
    }))
    const results = QuicklookHelper.getQuicklooks(files, primaryGroup, null, null, filter)
    assert.deepEqual(results, realExpected)
  }))

  function makeGroup(hasSD, hasMD, hasHD) {
    return {
      label: 'any',
      primary: false,
      [DATA_TYPES_ENUM.QUICKLOOK_SD]: hasSD ? buildImgDataFile(DATA_TYPES_ENUM.QUICKLOOK_SD, { name: 'sd_1' }) : null,
      [DATA_TYPES_ENUM.QUICKLOOK_MD]: hasMD ? buildImgDataFile(DATA_TYPES_ENUM.QUICKLOOK_MD, { name: 'md_1' }) : null,
      [DATA_TYPES_ENUM.QUICKLOOK_HD]: hasHD ? buildImgDataFile(DATA_TYPES_ENUM.QUICKLOOK_HD, { name: 'hd_1' }) : null,
    }
  }

  // 2. test quicklook fallback fallback
  const fallbackTestCases = [{
    title: 'SD fallback should prefer SD',
    group: makeGroup(true, true, true),
    toSelect: DATA_TYPES_ENUM.QUICKLOOK_SD,
    expectedSelection: DATA_TYPES_ENUM.QUICKLOOK_SD,
  }, {
    title: 'SD fallback should use MD when SD is not available',
    group: makeGroup(false, true, true),
    toSelect: DATA_TYPES_ENUM.QUICKLOOK_SD,
    expectedSelection: DATA_TYPES_ENUM.QUICKLOOK_MD,
  }, {
    title: 'SD fallback should select HD when SD and MD are not available',
    group: makeGroup(false, false, true),
    toSelect: DATA_TYPES_ENUM.QUICKLOOK_SD,
    expectedSelection: DATA_TYPES_ENUM.QUICKLOOK_HD,
  },
  {
    title: 'MD fallback should prefer MD',
    group: makeGroup(true, true, true),
    toSelect: DATA_TYPES_ENUM.QUICKLOOK_MD,
    expectedSelection: DATA_TYPES_ENUM.QUICKLOOK_MD,
  }, {
    title: 'MD fallback should use HD when MD is not available',
    group: makeGroup(true, false, true),
    toSelect: DATA_TYPES_ENUM.QUICKLOOK_MD,
    expectedSelection: DATA_TYPES_ENUM.QUICKLOOK_HD,
  }, {
    title: 'MD fallback should select SD when MD and HD are not available',
    group: makeGroup(true, false, false),
    toSelect: DATA_TYPES_ENUM.QUICKLOOK_MD,
    expectedSelection: DATA_TYPES_ENUM.QUICKLOOK_SD,
  }, {
    title: 'HD fallback should prefer HD',
    group: makeGroup(true, true, true),
    toSelect: DATA_TYPES_ENUM.QUICKLOOK_HD,
    expectedSelection: DATA_TYPES_ENUM.QUICKLOOK_HD,
  }, {
    title: 'HD fallback should use MD when HD is not available',
    group: makeGroup(true, true, false),
    toSelect: DATA_TYPES_ENUM.QUICKLOOK_HD,
    expectedSelection: DATA_TYPES_ENUM.QUICKLOOK_MD,
  }, {
    title: 'HD fallback should select SD when HD and MD are not available',
    group: makeGroup(true, false, false),
    toSelect: DATA_TYPES_ENUM.QUICKLOOK_HD,
    expectedSelection: DATA_TYPES_ENUM.QUICKLOOK_SD,
  }]
  fallbackTestCases.forEach(({
    title, group, toSelect, expectedSelection,
  }) => it(title, () => {
    const selected = QuicklookHelper.getQLDimensionOrFallback(toSelect, group)
    assert.deepEqual(selected, group[expectedSelection])
  }))
})
