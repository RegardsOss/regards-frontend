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
import QuicklookViewComponent from '../../../../../src/components/user/content/quicklook/QuicklookViewComponent'
import QuicklookFilesListComponent from '../../../../../src/components/user/content/quicklook/QuicklookFilesListComponent'
import NormalQuicklookPictureComponent from '../../../../../src/components/user/content/quicklook/NormalQuicklookPictureComponent'
import MagnifiedQuicklookPictureComponent from '../../../../../src/components/user/content/quicklook/MagnifiedQuicklookPictureComponent'
import styles from '../../../../../src/styles'
import { buildQuicklookGroupFor } from '../../../../dumps/quicklook.dumps'

const context = buildTestContext(styles)

/**
 * Test QuicklookViewComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[ Module name] Testing QuicklookViewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(QuicklookViewComponent)
  })
  it('should render correctly with multiple quicklooks, controlling quicklook selection and magnify enabling / disabling', () => {
    const props = {
      quicklookFiles: [
        buildQuicklookGroupFor('g1', true),
        buildQuicklookGroupFor('g2', false),
        buildQuicklookGroupFor('g3', false),
      ],
      scrollAreaHeight: 760,
    }
    // 1 - Render in initial mode
    const enzymeWrapper = shallow(<QuicklookViewComponent {...props} />, { context })
    assert.deepEqual(enzymeWrapper.state(), {
      groupIndex: 0,
      magnified: false,
    }, '(1) Initial mode should be normal, and selected index 0')
    // 1.a - check group list is shown
    let groupListWrapper = enzymeWrapper.find(QuicklookFilesListComponent)
    assert.lengthOf(groupListWrapper, 1, '(1) There should be group list displayer, allowing group selection')
    testSuiteHelpers.assertWrapperProperties(groupListWrapper, {
      selectedIndex: 0,
      quicklookFiles: props.quicklookFiles,
      onSelectGroup: enzymeWrapper.instance().onSelectGroup,
      scrollAreaHeight: props.scrollAreaHeight,
    }, '(1) Group list displayer properties should be correctly set')
    // 1.b - check picture is shown in normal mode displayer
    let normalModePictureWrapper = enzymeWrapper.find(NormalQuicklookPictureComponent)
    assert.lengthOf(normalModePictureWrapper, 1, '(1) There should be normal mode picture displayer')
    testSuiteHelpers.assertWrapperProperties(normalModePictureWrapper, {
      hasOtherQuicklooks: true,
      quicklookFile: props.quicklookFiles[0],
      onToggleMagnified: enzymeWrapper.instance().onToggleMagnified,
    }, '(1) Normal mode picture displayer properties should be correctly set')
    // 1.c - check maximized picture is not displayed
    let magnifiedModePictureWrapper = enzymeWrapper.find(MagnifiedQuicklookPictureComponent)
    assert.lengthOf(magnifiedModePictureWrapper, 0, '(1) Magnified picture displayer should be hidden')
    // 2 - Test selecting another picture
    groupListWrapper.props().onSelectGroup(2) // g3
    assert.deepEqual(enzymeWrapper.state(), {
      groupIndex: 2,
      magnified: false,
    }, '(2) Selected group index should be correctly updated')
    // check selection related properties were correctly updated
    groupListWrapper = enzymeWrapper.find(QuicklookFilesListComponent)
    assert.lengthOf(groupListWrapper, 1, '(2) There should be group list displayer, allowing group selection')
    assert.equal(groupListWrapper.props().selectedIndex, 2, '(2) Group list displayer selected index should be updated')
    normalModePictureWrapper = enzymeWrapper.find(NormalQuicklookPictureComponent)
    assert.lengthOf(normalModePictureWrapper, 1, '(2) There should be normal mode picture displayer')
    assert.equal(normalModePictureWrapper.props().quicklookFile, props.quicklookFiles[2], '(2) Shown picture should be updated')
    magnifiedModePictureWrapper = enzymeWrapper.find(MagnifiedQuicklookPictureComponent)
    assert.lengthOf(magnifiedModePictureWrapper, 0, '(2) Magnified picture displayer should be hidden')

    // 3 - Test toggling magnified mode on: group list and normal mode should now be hidden
    normalModePictureWrapper.props().onToggleMagnified()
    enzymeWrapper.update()
    assert.deepEqual(enzymeWrapper.state(), {
      groupIndex: 2,
      magnified: true,
    }, '(3) Magnified state should be correctly updated')
    // check selection related properties were correctly updated
    groupListWrapper = enzymeWrapper.find(QuicklookFilesListComponent)
    assert.lengthOf(groupListWrapper, 0, '(3) Group list displayer should be hidden')
    normalModePictureWrapper = enzymeWrapper.find(NormalQuicklookPictureComponent)
    assert.lengthOf(normalModePictureWrapper, 0, '(3) Normal mode picture displayer should be hidden')
    magnifiedModePictureWrapper = enzymeWrapper.find(MagnifiedQuicklookPictureComponent)
    assert.lengthOf(magnifiedModePictureWrapper, 1, '(3) Magnified picture displayer should be shown')
    testSuiteHelpers.assertWrapperProperties(magnifiedModePictureWrapper, {
      quicklookFile: props.quicklookFiles[2],
      onToggleMagnified: enzymeWrapper.instance().onToggleMagnified,
    }, '(3) Magnified picture displayer properties should be correctly set')

    // 4 - Goggle mangnified mode off and check elements were correctly updated
    magnifiedModePictureWrapper.props().onToggleMagnified()
    assert.deepEqual(enzymeWrapper.state(), {
      groupIndex: 2,
      magnified: false,
    }, '(4) Magnified state should be correctly updated')
    // check selection related properties were correctly updated
    groupListWrapper = enzymeWrapper.find(QuicklookFilesListComponent)
    assert.lengthOf(groupListWrapper, 1, '(4) Group list displayer should be shown')
    normalModePictureWrapper = enzymeWrapper.find(NormalQuicklookPictureComponent)
    assert.lengthOf(normalModePictureWrapper, 1, '(4) Normal mode picture displayer should be shown')
    magnifiedModePictureWrapper = enzymeWrapper.find(MagnifiedQuicklookPictureComponent)
    assert.lengthOf(magnifiedModePictureWrapper, 0, '(4) Magnified picture displayer should be hidden')
  })
  it('should render correctly with a single quicklook', () => {
    const props = {
      quicklookFiles: [
        buildQuicklookGroupFor('g1', true),
      ],
    }
    // 1 - Render in initial mode
    const enzymeWrapper = shallow(<QuicklookViewComponent {...props} />, { context })
    assert.deepEqual(enzymeWrapper.state(), {
      groupIndex: 0,
      magnified: false,
    }, '(1) Initial mode should be normal, and selected index 0')
    // Check group list is hidden
    const groupListWrapper = enzymeWrapper.find(QuicklookFilesListComponent)
    assert.lengthOf(groupListWrapper, 0, 'Group list displayer should be hidden when there is only one quicklook')
  })
})
