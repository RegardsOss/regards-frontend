/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ProcessingClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { InfiniteTableContainer, TableLayout, TableColumnsVisibilityOption } from '@regardsoss/components'
import { OrdersNavigationActions } from '../../../src/model/OrdersNavigationActions'
import OrderDatasetsComponent from '../../../src/components/datasets/OrderDatasetsComponent'
import OrderDatasetsCountHeaderMessage from '../../../src/components/datasets/OrderDatasetsCountHeaderMessage'
import { ORDER_DISPLAY_MODES } from '../../../src/model/OrderDisplayModes'
import { SOME_ORDERS } from '../../dumps/Orders.dumb'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrderDatasetsComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing OrderDatasetsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderDatasetsComponent)
  })
  it('should render correctly without data (USER)', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.USER,
      datasets: [],
      navigationActions: new OrdersNavigationActions('any'),
      columnsVisibility: {},
      onChangeColumnsVisibility: () => { },
      processingSelectors: ProcessingClient.getProcessingSelectors(['idk']),
      isProcessingDependenciesExist: true,
    }
    const enzymeWrapper = shallow(<OrderDatasetsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    assert.lengthOf(enzymeWrapper.find(OrderDatasetsCountHeaderMessage), 1, 'There should be the header message')
    assert.lengthOf(enzymeWrapper.find(TableColumnsVisibilityOption), 1, 'There should be the column visibiltiy option')

    const tableWrapper = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be an infinite table')
    assert.deepEqual(tableWrapper.props().entities, props.datasets, 'Entities should be correctly reported to table')
  })
  it('should render correctly with data (USER)', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.USER,
      datasets: SOME_ORDERS.content[0].content.datasetTasks,
      navigationActions: new OrdersNavigationActions('any'),
      columnsVisibility: {},
      onChangeColumnsVisibility: () => { },
      processingSelectors: ProcessingClient.getProcessingSelectors(['idk']),
      isProcessingDependenciesExist: true,
    }
    const enzymeWrapper = shallow(<OrderDatasetsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    assert.lengthOf(enzymeWrapper.find(OrderDatasetsCountHeaderMessage), 1, 'There should be the header message')
    assert.lengthOf(enzymeWrapper.find(TableColumnsVisibilityOption), 1, 'There should be the column visibiltiy option')
    assert.lengthOf(enzymeWrapper.find(InfiniteTableContainer), 1, 'There should be an infinite table')

    const tableWrapper = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be an infinite table')
    assert.deepEqual(tableWrapper.props().entities, props.datasets, 'Entities should be correctly reported to table')
  })
  it('should render correctly without data (ADMIN)', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
      datasets: [],
      navigationActions: new OrdersNavigationActions('any'),
      columnsVisibility: {},
      onChangeColumnsVisibility: () => { },
      processingSelectors: ProcessingClient.getProcessingSelectors(['idk']),
      isProcessingDependenciesExist: true,
    }
    const enzymeWrapper = shallow(<OrderDatasetsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    assert.lengthOf(enzymeWrapper.find(OrderDatasetsCountHeaderMessage), 1, 'There should be the header message')
    assert.lengthOf(enzymeWrapper.find(TableColumnsVisibilityOption), 1, 'There should be the column visibiltiy option')

    const tableWrapper = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be an infinite table')
    assert.deepEqual(tableWrapper.props().entities, props.datasets, 'Entities should be correctly reported to table')
  })
  it('should render correctly with data (ADMIN)', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
      datasets: SOME_ORDERS.content[0].content.datasetTasks,
      navigationActions: new OrdersNavigationActions('any'),
      columnsVisibility: {},
      onChangeColumnsVisibility: () => { },
      processingSelectors: ProcessingClient.getProcessingSelectors(['idk']),
      isProcessingDependenciesExist: true,
    }
    const enzymeWrapper = shallow(<OrderDatasetsComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    assert.lengthOf(enzymeWrapper.find(OrderDatasetsCountHeaderMessage), 1, 'There should be the header message')
    assert.lengthOf(enzymeWrapper.find(TableColumnsVisibilityOption), 1, 'There should be the column visibiltiy option')
    assert.lengthOf(enzymeWrapper.find(InfiniteTableContainer), 1, 'There should be an infinite table')

    const tableWrapper = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be an infinite table')
    assert.deepEqual(tableWrapper.props().entities, props.datasets, 'Entities should be correctly reported to table')
  })
})
