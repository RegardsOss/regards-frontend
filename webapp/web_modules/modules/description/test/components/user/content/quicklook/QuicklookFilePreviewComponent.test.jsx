/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import QuicklookFilePreviewComponent from '../../../../../src/components/user/content/quicklook/QuicklookFilePreviewComponent'
import styles from '../../../../../src/styles'
import { buildQuicklookGroupFor } from '../../../../dumps/quicklook.dumps'

const context = buildTestContext(styles)

/**
 * Test QuicklookFilePreviewComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing QuicklookFilePreviewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(QuicklookFilePreviewComponent)
  })
  it('should render correctly selected (unknwon group)', () => {
    const spyOnSelectGroup = {}
    const props = {
      groupIndex: 18,
      selected: true,
      quicklookFile: buildQuicklookGroupFor(null, false),
      onSelectGroup: (groupIndex) => {
        spyOnSelectGroup.groupIndex = groupIndex
      },
    }
    const enzymeWrapper = shallow(<QuicklookFilePreviewComponent {...props} />, { context })
    // A - Check the root div
    const rootDivWrapper = enzymeWrapper.find('div')
    assert.lengthOf(rootDivWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(rootDivWrapper, {
      style: context.moduleTheme.user.main.content.quicklook.groupLists.pictureContainer.selected,
      onClick: enzymeWrapper.instance().onSelectGroup,
    }, 'Root div wrapper should allow group selection and reflect selection styles')
    // B - Check picture
    const pictureWrapper = enzymeWrapper.find('img')
    assert.lengthOf(pictureWrapper, 1, 'There should be the picture')
    testSuiteHelpers.assertWrapperProperties(pictureWrapper, {
      src: props.quicklookFile[CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD].uri,
      alt: 'module.description.content.quicklook.group.unknown',
      title: 'module.description.content.quicklook.group.unknown',
    }, 'The preview picture should be SD picture. Alternative and tooltip text should be unknown group label')
    // C - Test callback
    assert.isNotOk(spyOnSelectGroup.groupIndex, 'Callback should not have been invoked yet')
    rootDivWrapper.props().onClick()
    assert.isNotOk(spyOnSelectGroup.groupIndex, 'Callback should not have been invoked on click, as group is already selected')
  })
  it('should render correctly unselected (labelled group)', () => {
    const spyOnSelectGroup = {}
    const props = {
      groupIndex: 5,
      selected: false,
      quicklookFile: buildQuicklookGroupFor('myGroup', false),
      onSelectGroup: (groupIndex) => {
        spyOnSelectGroup.groupIndex = groupIndex
      },
    }
    const enzymeWrapper = shallow(<QuicklookFilePreviewComponent {...props} />, { context })
    // A - Check the root div
    const rootDivWrapper = enzymeWrapper.find('div')
    assert.lengthOf(rootDivWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(rootDivWrapper, {
      style: context.moduleTheme.user.main.content.quicklook.groupLists.pictureContainer.unselected,
      onClick: enzymeWrapper.instance().onSelectGroup,
    }, 'Root div wrapper should allow group selection and reflect selection styles')
    // B - Check picture
    const pictureWrapper = enzymeWrapper.find('img')
    assert.lengthOf(pictureWrapper, 1, 'There should be the picture')
    testSuiteHelpers.assertWrapperProperties(pictureWrapper, {
      src: props.quicklookFile[CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD].uri,
      alt: 'myGroup',
      title: 'myGroup',
    }, 'The preview picture should be SD picture. Alternative and tooltip text should show group label')
    // C - Test callback
    assert.isNotOk(spyOnSelectGroup.groupIndex, 'Callback should not have been invoked yet')
    rootDivWrapper.props().onClick()
    assert.equal(spyOnSelectGroup.groupIndex, props.groupIndex, 'Callback should have invoked on click with the right index')
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
    title: 'should use SD file when available',
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
    expectedURI: 'http://mydomain.com/myURI/small.png',
  }, {
    title: 'should fallback on MD file when SD is not available',
    quicklookFile: {
      label: 'aGroup',
      primary: false,
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD, {
        name: 'medium', reference: true, online: true, size: 256, groupName: 'any',
      }),
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD, {
        name: 'high', reference: true, online: true, size: 2048, groupName: 'any',
      }),
    },
    expectedURI: 'http://mydomain.com/myURI/medium.png',
  }, {
    title: 'should fallback on HD file when both MD and SD are not available',
    quicklookFile: {
      label: 'aGroup',
      primary: false,
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD]: buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD, {
        name: 'high', reference: true, online: true, size: 2048, groupName: 'any',
      }),
    },
    expectedURI: 'http://mydomain.com/myURI/high.png',
  }]

  testCases.forEach(({ title, quicklookFile, expectedURI }) => it(title, () => {
    const props = {
      groupIndex: 5,
      selected: false,
      quicklookFile,
      onSelectGroup: () => {},
    }
    const enzymeWrapper = shallow(<QuicklookFilePreviewComponent {...props} />, { context })
    const pictureWrapper = enzymeWrapper.find('img')
    assert.lengthOf(pictureWrapper, 1, 'There should be the picture')
    testSuiteHelpers.assertWrapperProperties(pictureWrapper, {
      src: expectedURI,
      alt: 'aGroup',
      title: 'aGroup',
    })
  }))
})
