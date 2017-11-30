/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import MenuItem from 'material-ui/MenuItem'
import { DropDownButton } from '@regardsoss/components'
import ListSortingComponent from '../../../../../src/components/user/results/options/ListSortingComponent'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

const models = [
  {
    key: '1', label: 'L1', attributes: [], enableSorting: true, sortOrder: '',
  },
  {
    key: '2', label: 'L2', attributes: [], enableSorting: true, sortOrder: '',
  },
  {
    key: '3', label: 'L3', attributes: [], enableSorting: true, sortOrder: '',
  },
  {
    key: '4', label: 'L4', attributes: [], enableSorting: true, sortOrder: '',
  },
]

/**
 * Tests for SearchResultsComponent
 * @author Sébastien binda
 */
describe('[Search Results] Testing ListSortingComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render available models and selected model', () => {
    const props = {
      sortingModel: models[1], // model '2'
      sortableModels: models,
      onSortBy: () => { },
    }
    const renderWrapper = shallow(<ListSortingComponent {...props} />, { context })
    // 1 - check selected value
    const button = renderWrapper.find(DropDownButton)
    assert.lengthOf(button, 1, 'There must be one drop down button')
    assert.deepEqual(button.props().value, props.sortingModel, 'Drop down value must be set to selected sorting model')
    // 2 - check rendered options
    const menuItems = renderWrapper.find(MenuItem)
    assert.lengthOf(menuItems, models.length + 1, `There must be ${models.length} + 1 options for models and NO SORT option`)
    // 3 - check the selected menu item
    const selectedMenuItem = renderWrapper.findWhere(n => n.props().checked)
    assert.lengthOf(selectedMenuItem, 1, 'There must be one and only one selected menu item')
    assert.equal(selectedMenuItem.props().primaryText, 'L2', 'The model menu item L2 should be selected')
  })

  it('Should render available models without selection', () => {
    const props = {
      // sortingModel: no selection
      sortableModels: models,
      onSortBy: () => { },
    }
    const renderWrapper = shallow(<ListSortingComponent {...props} />, { context })
    // 1 - check selected value
    const button = renderWrapper.find(DropDownButton)
    assert.lengthOf(button, 1, 'There must be one drop down button')
    assert.isNull(button.props().value, 'Drop down value must be null (no option)')
    // 2 - check rendered options
    const menuItems = renderWrapper.find(MenuItem)
    assert.lengthOf(menuItems, models.length + 1, `There must be ${models.length} + 1 options for models and NO SORT option`)
    // 3 - check the selected menu item
    const selectedMenuItem = renderWrapper.findWhere(n => n.props().checked)
    assert.lengthOf(selectedMenuItem, 1, 'There must be one and only one selected menu item')
    assert.include(selectedMenuItem.props().primaryText, 'list.sort.none.label', 'The no data option should be selected')
  })
})
