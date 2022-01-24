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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CommonDomain } from '@regardsoss/domain'
import NormalQuicklookPictureComponent from '../../../../../src/components/user/content/quicklook/NormalQuicklookPictureComponent'
import styles from '../../../../../src/styles'
import { buildQuicklookGroupFor } from '../../../../dumps/quicklook.dumps'

const context = buildTestContext(styles)

/**
 * Test NormalQuicklookPictureComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing NormalQuicklookPictureComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NormalQuicklookPictureComponent)
  })
  it('should render correctly, showing name when there are other quicklook groups', () => {
    const props = {
      hasOtherQuicklooks: true,
      quicklookFile: buildQuicklookGroupFor('testGroupName', true),
      onToggleMagnified: () => {},
    }
    const enzymeWrapper = shallow(<NormalQuicklookPictureComponent {...props} />, { context })
    // A - check there is toggle magnify callback
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().onClick === props.onToggleMagnified), 1, 'Toggle magnify callback should be provided to user')
    // B - check picture
    const pictureWrapper = enzymeWrapper.find('img')
    assert.lengthOf(pictureWrapper, 1, 'There should be the picture')
    testSuiteHelpers.assertWrapperProperties(pictureWrapper, {
      src: props.quicklookFile[CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD].uri,
      alt: 'module.description.content.quicklook.alt.message',
    }, 'Picture should show the right picture and an alternative internationalized message')
    // C - check group name is shown but not unknown group name
    assert.include(enzymeWrapper.debug(), 'testGroupName', 'Group name should be displayed')
    assert.notInclude(enzymeWrapper.debug(), 'module.description.content.quicklook.group.unknown', 'Unknown group name should not be shown')
  })
  it('should render correctly, defaulting unknown group name when there are other quicklook groups', () => {
    const props = {
      hasOtherQuicklooks: true,
      quicklookFile: buildQuicklookGroupFor(null, false),
      onToggleMagnified: () => {},
    }
    const enzymeWrapper = shallow(<NormalQuicklookPictureComponent {...props} />, { context })
    // A - check there is toggle magnify callback
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().onClick === props.onToggleMagnified), 1, 'Toggle magnify callback should be provided to user')
    // B - check picture
    const pictureWrapper = enzymeWrapper.find('img')
    assert.lengthOf(pictureWrapper, 1, 'There should be the picture')
    testSuiteHelpers.assertWrapperProperties(pictureWrapper, {
      src: props.quicklookFile[CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD].uri,
      alt: 'module.description.content.quicklook.alt.message',
    }, 'Picture should show the right picture and an alternative internationalized message')
    // C - check group name is shown but not unknown group name
    assert.include(enzymeWrapper.debug(), 'module.description.content.quicklook.group.unknown', 'Unknown group name should shown')
  })
  it('should render correctly, hiding name when there is no other quicklook groups', () => {
    const props = {
      hasOtherQuicklooks: false,
      quicklookFile: buildQuicklookGroupFor('testGroupName2', true),
      onToggleMagnified: () => {},
    }
    const enzymeWrapper = shallow(<NormalQuicklookPictureComponent {...props} />, { context })
    // A - check there is toggle magnify callback
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().onClick === props.onToggleMagnified), 1, 'Toggle magnify callback should be provided to user')
    // B - check picture
    const pictureWrapper = enzymeWrapper.find('img')
    assert.lengthOf(pictureWrapper, 1, 'There should be the picture')
    testSuiteHelpers.assertWrapperProperties(pictureWrapper, {
      src: props.quicklookFile[CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD].uri,
      alt: 'module.description.content.quicklook.alt.message',
    }, 'Picture should show the right picture and an alternative internationalized message')
    // C - check group name is shown but not unknown group name
    assert.notInclude(enzymeWrapper.debug(), 'testGroupName2', 'Group name should be hidden')
    assert.notInclude(enzymeWrapper.debug(), 'module.description.content.quicklook.group.unknown', 'Unknown group name should be hidden')
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
    title: 'should use MD file when available',
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
    expectedURI: 'http://mydomain.com/myURI/medium.png',
  }, {
    title: 'should fallback on HD file when MD is not available',
    quicklookFile: {
      label: 'aGroup',
      primary: false,
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD, {
        name: 'small', reference: true, online: true, size: 16, groupName: 'any',
      }),
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD, {
        name: 'high', reference: true, online: true, size: 2048, groupName: 'any',
      }),
    },
    expectedURI: 'http://mydomain.com/myURI/high.png',
  }, {
    title: 'should fallback on SD file when both HD and MD are not available',
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
      hasOtherQuicklooks: false,
      quicklookFile,
      onToggleMagnified: () => {},
    }
    const enzymeWrapper = shallow(<NormalQuicklookPictureComponent {...props} />, { context })
    // A - check there is toggle magnify callback
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().onClick === props.onToggleMagnified), 1, 'Toggle magnify callback should be provided to user')
    // B - check picture
    const pictureWrapper = enzymeWrapper.find('img')
    assert.lengthOf(pictureWrapper, 1, 'There should be the picture')
    testSuiteHelpers.assertWrapperProperties(pictureWrapper, {
      src: expectedURI,
      alt: 'module.description.content.quicklook.alt.message',
    }, 'Picture should show the right picture and an alternative internationalized message')
  }))
})
