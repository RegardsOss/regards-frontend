/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TableSortOrders } from '@regardsoss/components'
import ListSortingComponent from '../../../../../src/components/user/results/options/ListSortingComponent'
import { ListSortingContainer } from '../../../../../src/containers/user/results/options/ListSortingContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

const models = [
  {
    key: '0', label: 'L3', attributes: [], enableSorting: true, sortOrder: '',
  },
  {
    key: '1', label: 'L2', attributes: [], enableSorting: false, sortOrder: '',
  },
  {
    key: '2', label: 'L1', attributes: [], enableSorting: true, sortOrder: '',
  },
  {
    key: '3', label: 'L4', attributes: [], enableSorting: true, sortOrder: '',
  },
]

/**
* Test ListSortingContainer
* @author Raphaël Mechali
*/
describe('[Search Results] Testing ListSortingContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ListSortingContainer)
  })
  it('should filter and sort attributes, and retrieve no sorting model when none is set', () => {
    const props = {
      attributePresentationModels: models,
      onSortByAttribute: () => { },
    }
    const enzymeWrapper = shallow(<ListSortingContainer {...props} />, { context })
    const component = enzymeWrapper.find(ListSortingComponent)
    assert.lengthOf(component, 1, 'There should be the render component')
    // check that non sortable attributes were removed and alphabetical order is granted
    const { sortableModels } = component.props()
    assert.lengthOf(sortableModels, 3, 'The non sortable models should be filters!')
    assert.equal(sortableModels[0].key, '2', 'Model 2 should be at alphabetical position 0')
    assert.equal(sortableModels[1].key, '0', 'Model 0 should be at alphabetical position 1')
    assert.equal(sortableModels[2].key, '3', 'Model 3 should be at alphabetical position 2')
    // check that no model was
    assert.isNotOk(component.props().sortingModel, 'No sorting model should be configured')
  })
  it('should retrieve the currently sorted attribute', () => {
    const modelsWithSortingOn3 = [...models]
    modelsWithSortingOn3[3].sortOrder = TableSortOrders.ASCENDING_ORDER
    const props = {
      attributePresentationModels: modelsWithSortingOn3,
      onSortByAttribute: () => { },
    }
    const enzymeWrapper = shallow(<ListSortingContainer {...props} />, { context })
    const component = enzymeWrapper.find(ListSortingComponent)
    assert.lengthOf(component, 1, 'There should be the render component')
    // verify the model was retrieved as sorting model
    const { sortingModel } = component.props()
    assert.isOk(sortingModel, 'A sorting model should be retrieved')
    assert.equal(sortingModel.key, '3', 'The sorting model retrieved should be 3')
  })
})
