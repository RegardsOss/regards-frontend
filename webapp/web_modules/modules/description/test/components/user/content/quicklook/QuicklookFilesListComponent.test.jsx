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
import QuicklookFilesListComponent from '../../../../../src/components/user/content/quicklook/QuicklookFilesListComponent'
import QuicklookFilePreviewComponent from '../../../../../src/components/user/content/quicklook/QuicklookFilePreviewComponent'
import styles from '../../../../../src/styles'
import { buildQuicklookGroupFor } from '../../../../dumps/quicklook.dumps'

const context = buildTestContext(styles)

/**
 * Test QuicklookFilesListComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[Description] Testing QuicklookFilesListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(QuicklookFilesListComponent)
  })
  it('should render correctly', () => {
    const spyOnSelectGroup = {}
    const props = {
      selectedIndex: 3,
      quicklookFiles: [
        buildQuicklookGroupFor('group1', true),
        buildQuicklookGroupFor('group2', false),
        buildQuicklookGroupFor('group3', false),
        buildQuicklookGroupFor(null, false),
      ],
      scrollAreaHeight: 760,
      onSelectGroup: (selectedIndex) => {
        spyOnSelectGroup.selectedIndex = selectedIndex
      },
    }
    const enzymeWrapper = shallow(<QuicklookFilesListComponent {...props} />, { context })
    const filePreviewComponents = enzymeWrapper.find(QuicklookFilePreviewComponent)
    // check each quicklook is rendered with selection state
    props.quicklookFiles.forEach((file, index) => {
      const filePreviewWrapper = filePreviewComponents.findWhere((n) => n.props().groupIndex === index)
      assert.lengthOf(filePreviewWrapper, 1, `There should be file preview wrapper for group ${index}`)
      testSuiteHelpers.assertWrapperProperties(filePreviewWrapper, {
        groupIndex: index,
        selected: index === props.selectedIndex,
        quicklookFile: file,
        onSelectGroup: props.onSelectGroup,
      }, `File preview wrapper properties should be correctly set for group ${index}`)
    })
  })
})
