/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FileCellComponent from '../../../../../../src/components/user/tree/cells/links/FileCellComponent'
import TreeLinkComponent from '../../../../../../src/components/user/tree/cells/links/TreeLinkComponent'
import styles from '../../../../../../src/styles'
import { BROWSING_SECTIONS_ENUM } from '../../../../../../src/domain/BrowsingSections'
import { resolvedDatasetEntity } from '../../../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test FileCellComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing FileCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FileCellComponent)
  })
  it('should render correctly selectable / selected', () => {
    const spyOnSelectInnerLink = {}
    const props = {
      type: BROWSING_SECTIONS_ENUM.FILES,
      index: 1,
      file: resolvedDatasetEntity.displayModel.descriptionFiles[1],
      selected: true,
      onSelectInnerLink: (section, index) => {
        spyOnSelectInnerLink.section = section
        spyOnSelectInnerLink.index = index
      },
    }
    const enzymeWrapper = shallow(<FileCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: props.file.label,
      tooltip: 'module.description.common.file.preview.tooltip',
      selected: true,
      section: false,
      onClick: enzymeWrapper.instance().onLinkClicked,
      disabled: false, // as file is available
    }, 'Link properties should be correctly set')
    assert.deepEqual(spyOnSelectInnerLink, {}, 'On select callback should not have been invoked yet')
    linkWrapper.props().onClick()
    assert.deepEqual(spyOnSelectInnerLink, {
      section: props.type,
      index: props.index,
    }, 'On select callback should have been invoked with the right parameters')
  })
  it('should render correctly not selectable, nor selected', () => {
    const props = {
      type: BROWSING_SECTIONS_ENUM.FILES,
      index: 1,
      file: {
        ...resolvedDatasetEntity.displayModel.descriptionFiles[1],
        available: false,
      },
      selected: false,
      onSelectInnerLink: () => {},
    }
    const enzymeWrapper = shallow(<FileCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: props.file.label,
      tooltip: props.file.label,
      selected: false,
      section: false,
      onClick: enzymeWrapper.instance().onLinkClicked,
      disabled: true, // as file is not available
    }, 'Link properties should be correctly set')
  })
})
