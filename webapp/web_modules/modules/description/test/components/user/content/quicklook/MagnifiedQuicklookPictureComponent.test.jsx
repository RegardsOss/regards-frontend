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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { CommonDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MagnifiedQuicklookPictureComponent from '../../../../../src/components/user/content/quicklook/MagnifiedQuicklookPictureComponent'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test MagnifiedQuicklookPictureComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing MagnifiedQuicklookPictureComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MagnifiedQuicklookPictureComponent)
  })

  function buildImgDataFile(dataType, {
    name, reference = false, online = true, size, groupName,
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
      types: groupName ? [groupName] : [],
    }
  }

  const testCases = [{
    title: 'should render correctly using HD file by default',
    quicklookFile: {
      label: 'aGroup',
      primary: true,
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD, {
        name: 'small', reference: true, online: true, size: 16, groupName: 'any',
      }),
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD, {
        name: 'medium', reference: true, online: true, size: 256, groupName: 'any',
      }),
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD, {
        name: 'high', reference: true, online: true, size: 2048, groupName: 'any',
      }),
    },
    expectedURI: 'http://mydomain.com/myURI/high.png',
  }, {
    title: 'should render correctly fallbacking on MD when HD is not available',
    quicklookFile: {
      label: 'aGroup',
      primary: false,
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD, {
        name: 'small', reference: true, online: true, size: 16, groupName: 'any',
      }),
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD, {
        name: 'medium', reference: true, online: true, size: 256, groupName: 'any',
      }),
    },
    expectedURI: 'http://mydomain.com/myURI/medium.png',
  }, {
    title: 'should render correctly fallbacking on SD when both HD and MD are not available',
    quicklookFile: {
      label: 'aGroup',
      primary: false,
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD, {
        name: 'small', reference: true, online: true, size: 16, groupName: 'any',
      }),
    },
    expectedURI: 'http://mydomain.com/myURI/small.png',
  }]
  testCases.forEach(({ title, quicklookFile, expectedURI }) => it(title, () => {
    const props = {
      quicklookFile,
      onToggleMagnified: () => {},
    }
    const enzymeWrapper = shallow(<MagnifiedQuicklookPictureComponent {...props} />, { context })
    const rootWrapper = enzymeWrapper.find('div')
    assert.lengthOf(rootWrapper, 1, 'There should be root wrapper')
    assert.equal(rootWrapper.props().onClick, props.onToggleMagnified, 'Root wrapper should provide toggle magnified callback')
    const pictureWrapper = enzymeWrapper.find('img')
    assert.lengthOf(pictureWrapper, 1, 'There should be picture wrapper')
    testSuiteHelpers.assertWrapperProperties(pictureWrapper, {
      src: expectedURI,
      alt: 'module.description.content.quicklook.alt.message',
    }, 'Picture wrapper should show the right picture and an alternative internationalized message')
  }))
})
