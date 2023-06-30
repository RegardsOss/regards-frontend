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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { OrderClient } from '@regardsoss/client'
import DatasetFilesComponent from '../../../src/components/files/DatasetFilesComponent'
import { DatasetFilesContainer } from '../../../src/containers/files/DatasetFilesContainer'
import { ORDER_DISPLAY_MODES } from '../../../src/model/OrderDisplayModes'
import { SOME_ORDERS } from '../../dumps/Orders.dumb'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test DatasetFilesContainer
* @author Raphaël Mechali
*/
describe('[Order Common] Testing DatasetFilesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetFilesContainer)
  })
  it('should render correctly in USER mode', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.USER,
      order: SOME_ORDERS.content[0],
      dataset: SOME_ORDERS.content[0].content.datasetTasks[0],
      orderFilesActions: new OrderClient.OrderDatasetFilesActions('any'),
      orderFilesSelectors: OrderClient.getOrderDatasetFilesSelectors(['idk']),
      isFetching: false,
      totalFilesCount: 25,
    }
    const enzymeWrapper = shallow(<DatasetFilesContainer {...props} />, { context })
    const component = enzymeWrapper.find(DatasetFilesComponent)
    assert.lengthOf(component, 1, 'There should be the corresponding component')
    assert.deepEqual(component.props().pathParams, {
      order_id: props.order.content.id,
      dataset_id: props.dataset.id,
    }, 'Path parameters should be provided from context')
    assert.equal(component.props().orderFilesActions, props.orderFilesActions, 'Actions should be correctly reported')
    assert.equal(component.props().orderFilesSelectors, props.orderFilesSelectors, 'Selectors should be correctly reported')
    assert.equal(component.props().displayMode, props.displayMode, 'Display mode should be correctly reported')
  })
  it('should render correctly in ADMIN mode', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
      order: SOME_ORDERS.content[0],
      dataset: SOME_ORDERS.content[0].content.datasetTasks[0],
      orderFilesActions: new OrderClient.OrderDatasetFilesActions('any'),
      orderFilesSelectors: OrderClient.getOrderDatasetFilesSelectors(['idk']),
      isFetching: false,
      totalFilesCount: 25,
    }
    const enzymeWrapper = shallow(<DatasetFilesContainer {...props} />, { context })
    const component = enzymeWrapper.find(DatasetFilesComponent)
    assert.lengthOf(component, 1, 'There should be the corresponding component')
    assert.deepEqual(component.props().pathParams, {
      order_id: props.order.content.id,
      dataset_id: props.dataset.id,
    }, 'Path parameters should be provided from context')
    assert.equal(component.props().orderFilesActions, props.orderFilesActions, 'Actions should be correctly reported')
    assert.equal(component.props().orderFilesSelectors, props.orderFilesSelectors, 'Selectors should be correctly reported')
    assert.equal(component.props().displayMode, props.displayMode, 'Display mode should be correctly reported')
  })
})
