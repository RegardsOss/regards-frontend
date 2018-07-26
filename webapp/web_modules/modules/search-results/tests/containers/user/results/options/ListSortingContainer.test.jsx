/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TableSortOrders, TableColumnBuilder } from '@regardsoss/components'
import ListSortingComponent from '../../../../../src/components/user/results/options/ListSortingComponent'
import { ListSortingContainer } from '../../../../../src/containers/user/results/options/ListSortingContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

const models = [
  {
    key: '0', label: { en: 'L3', fr: 'L3' }, visible: true, attributes: [], enableSorting: true, sortOrder: '', defaultSorting: true,
  },
  {
    key: '1', label: { en: 'L2', fr: 'L2' }, visible: true, attributes: [], enableSorting: false, sortOrder: '', defaultSorting: false,
  },
  {
    key: '2', label: { en: 'L1', fr: 'L1' }, visible: true, attributes: [], enableSorting: true, sortOrder: '', defaultSorting: false,
  },
  {
    key: '3', label: { en: 'L4', fr: 'L4' }, visible: true, attributes: [], enableSorting: true, sortOrder: '', defaultSorting: false,
  },
  { // Table options column
    key: TableColumnBuilder.optionsColumnKey, visible: true, enableSorting: false, sortOrder: TableSortOrders.NO_SORT,
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
      presentationModels: models,
      onSortByAttribute: () => { },
      locale: 'en',
    }
    const enzymeWrapper = shallow(<ListSortingContainer {...props} />, { context })
    const component = enzymeWrapper.find(ListSortingComponent)
    assert.lengthOf(component, 1, 'There should be the render component')
    // check that non sortable attributes were removed
    const { sortableModels, sortingModel, defaultSortingModel } = component.props()
    assert.lengthOf(sortableModels, 3, 'The non sortable and table columns models should be filters')
    // check that no model was retrieved
    assert.isNotOk(sortingModel, 'No sorting model should be configured')
    // check that default sorting model was retireved
    assert.deepEqual(defaultSortingModel, models[0], 'Model 3 should be retrieved as default sorting model')
  })
  it('should filter and sort attributes, and retrieve no default sorting model when none is set', () => {
    const props = {
      presentationModels: models.slice(1), // remove first model which is default one
      onSortByAttribute: () => { },
      locale: 'fr',
    }
    const enzymeWrapper = shallow(<ListSortingContainer {...props} />, { context })
    const component = enzymeWrapper.find(ListSortingComponent)
    assert.lengthOf(component, 1, 'There should be the render component')
    // check that default sorting model was not found
    const { defaultSortingModel } = component.props()
    assert.isNotOk(defaultSortingModel, 'No default sorting model should be set')
  })
  it('should retrieve the currently sorted attribute', () => {
    const modelsWithSortingOn3 = [...models]
    modelsWithSortingOn3[3] = {
      ...models[3],
      sortOrder: TableSortOrders.ASCENDING_ORDER,
    }
    const props = {
      presentationModels: modelsWithSortingOn3,
      onSortByAttribute: () => { },
      locale: 'fr',
    }
    const enzymeWrapper = shallow(<ListSortingContainer {...props} />, { context })
    const component = enzymeWrapper.find(ListSortingComponent)
    assert.lengthOf(component, 1, 'There should be the render component')
    // verify the model was retrieved as sorting model
    const { sortingModel } = component.props()
    assert.isOk(sortingModel, 'A sorting model should be retrieved')
    assert.equal(sortingModel.key, '3', 'The sorting model retrieved should be 3')
  })
  it('should handle add and remove sorting, and ignore it when no previous sorting was set', () => {
    let sortSpy = null
    const props = {
      presentationModels: models,
      onSortByAttribute: (key, order) => {
        sortSpy = { key, order }
      },
      locale: 'fr',
    }
    const enzymeWrapper = shallow(<ListSortingContainer {...props} />, { context })
    // 1 - there is currently no sorting: attempt removing sorting should not be propagated
    enzymeWrapper.instance().onSortBy(null)
    assert.isNull(sortSpy, 'Sort should no propagate a remove sorting event when there is no sorting')
    // 2 - add sorting on a model
    const sortingAttribute = props.presentationModels[1]
    enzymeWrapper.instance().onSortBy(sortingAttribute)
    assert.deepEqual(sortSpy, { key: sortingAttribute.key, order: TableSortOrders.ASCENDING_ORDER }, 'Sort callback should be called to set new attribute as sorting element')
    // 3 - change props to clear an existing sorting
    const modelsWithSortingOn3 = [
      ...models.slice(0, -1), {
        ...models[3],
        sortOrder: TableSortOrders.ASCENDING_ORDER,
      }]
    enzymeWrapper.setProps({
      ...props,
      presentationModels: modelsWithSortingOn3,
    })
    enzymeWrapper.instance().onSortBy(null)
    assert.deepEqual(sortSpy, { key: models[3].key, order: TableSortOrders.NO_SORT }, 'Sort callback should be called to remove order on attribute')
  })
})
