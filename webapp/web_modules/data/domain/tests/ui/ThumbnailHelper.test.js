/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ThumbnailHelper } from '../../ui/ThumbnailHelper'

/**
 * Test ModulesManager
 * @author Raphaël Mechali
 */
describe('[Domain] Testing ThumbnailHelper', () => {
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

  function buildThumbnailFile(name, reference, online) {
    return buildImgDataFile(DATA_TYPES_ENUM.THUMBNAIL, { name, reference, online })
  }

  /** 1. test getThumbnail */
  const getThumbnailTestCases = [{
    title: 'getThumbnail should use the first available thumbnail (no filter)',
    thumbnails: [
      buildThumbnailFile('A1', false, false),
      buildThumbnailFile('A2', false, false),
      buildThumbnailFile('B1', false, true),
    ],
    filter: () => true,
    expectedSelectionIndex: 0,
  }, {
    title: 'getThumbnail should use the first available thumbnail (filter on server availability)',
    thumbnails: [
      buildThumbnailFile('A1', false, false),
      buildThumbnailFile('A2', false, false),
      buildThumbnailFile('B1', false, true),
    ],
    // filter: undefined (uses the default one)
    expectedSelectionIndex: 2,
  }, {
    title: 'getThumbnail should return null when no element available (filter on server availability)',
    thumbnails: [
      buildThumbnailFile('A1', false, false),
      buildThumbnailFile('A2', false, false),
      buildThumbnailFile('B1', false, true),
    ],
    filter: (file) => false,
    expectedSelectionIndex: null,
  }]
  getThumbnailTestCases.forEach(({
    title, thumbnails, filter, expectedSelectionIndex,
  }) => it(title, () => {
    const projectName = 'p1'
    const token = 't1'

    const selectedThumbnail = ThumbnailHelper.getThumbnail(thumbnails, token, projectName, filter)
    if (isNil(expectedSelectionIndex)) {
      assert.isNull(selectedThumbnail)
    } else {
      assert.deepEqual(selectedThumbnail, {
        ...thumbnails[expectedSelectionIndex],
        uri: `${thumbnails[expectedSelectionIndex].uri}?token=${token}`,
      })
    }
  }))

  /* 2. Test getQuicklookFallback:
  * QL fallback should search first in primary, any resolution, then in other groups (smaller resolution first)
  */
  function makeGroup(marker, hasSD, hasMD, hasHD, primary = false) {
    return {
      label: `g${marker}`,
      primary,
      [DATA_TYPES_ENUM.QUICKLOOK_SD]: hasSD ? buildImgDataFile(DATA_TYPES_ENUM.QUICKLOOK_SD, { name: `g${marker}_sd` }) : null,
      [DATA_TYPES_ENUM.QUICKLOOK_MD]: hasMD ? buildImgDataFile(DATA_TYPES_ENUM.QUICKLOOK_MD, { name: `g${marker}_md` }) : null,
      [DATA_TYPES_ENUM.QUICKLOOK_HD]: hasHD ? buildImgDataFile(DATA_TYPES_ENUM.QUICKLOOK_HD, { name: `g${marker}_hd` }) : null,
    }
  }
  const getQuicklookFallbackTestCases = [{
    title: 'getQuicklookFallback should search in primary group first (SD found)',
    groups: [
      makeGroup(1, true, true, true, true),
      makeGroup(2, true, true, true),
      makeGroup(3, true, true, true),
      makeGroup(4, true, true, true),
    ],
    expectedThumbnailFromGroup: 0,
    expectedResolution: DATA_TYPES_ENUM.QUICKLOOK_SD,
  }, {
    title: 'getQuicklookFallback should search in primary group first (MD found)',
    groups: [
      makeGroup(1, false, true, true, true),
      makeGroup(2, true, true, true),
      makeGroup(3, true, true, true),
      makeGroup(4, true, true, true),
    ],
    expectedThumbnailFromGroup: 0,
    expectedResolution: DATA_TYPES_ENUM.QUICKLOOK_MD,
  }, {
    title: 'getQuicklookFallback should search in primary group first (HD found)',
    groups: [
      makeGroup(1, false, false, true, true),
      makeGroup(2, true, true, true),
      makeGroup(3, true, true, true),
      makeGroup(4, true, true, true),
    ],
    expectedThumbnailFromGroup: 0,
    expectedResolution: DATA_TYPES_ENUM.QUICKLOOK_HD,
  }, {
    title: 'getQuicklookFallback should search smaller resolution first when no primary group first (SD found)',
    groups: [
      makeGroup(1, false, true, true),
      makeGroup(2, false, true, true),
      makeGroup(3, true, true, true),
    ],
    expectedThumbnailFromGroup: 2,
    expectedResolution: DATA_TYPES_ENUM.QUICKLOOK_SD,
  }, {
    title: 'getQuicklookFallback should search smaller resolution first when no primary group first (MD found)',
    groups: [
      makeGroup(1, false, false, true),
      makeGroup(2, false, true, true),
      makeGroup(3, false, false, true),
    ],
    expectedThumbnailFromGroup: 1,
    expectedResolution: DATA_TYPES_ENUM.QUICKLOOK_MD,
  }, {
    title: 'getQuicklookFallback should search smaller resolution first when no primary group first (HD found)',
    groups: [
      makeGroup(1, false, false, true),
      makeGroup(2, false, false, false),
      makeGroup(3, false, false, false),
    ],
    expectedThumbnailFromGroup: 0,
    expectedResolution: DATA_TYPES_ENUM.QUICKLOOK_HD,
  }, {
    title: 'getQuicklookFallback should return null when no fallback found',
    groups: [],
    expectedThumbnailFromGroup: null,
    expectedResolution: null,
  }]
  getQuicklookFallbackTestCases.forEach(({
    title, groups, expectedThumbnailFromGroup, expectedResolution,
  }) => it(title, () => {
    const selectedQLFallback = ThumbnailHelper.getQuicklookFallback(groups)
    if (isNil(expectedThumbnailFromGroup)) {
      assert.isNull(selectedQLFallback)
    } else {
      const expectedThumbnail = groups[expectedThumbnailFromGroup][expectedResolution]
      assert.deepEqual(selectedQLFallback, expectedThumbnail)
    }
  }))
})
