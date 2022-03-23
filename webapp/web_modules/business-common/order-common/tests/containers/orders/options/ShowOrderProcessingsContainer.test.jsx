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
import { ProcessingClient, CommonClient } from '@regardsoss/client'
import ShowOrderProcessingsComponent from '../../../../src/components/orders/options/ShowOrderProcessingsComponent'
import { ShowOrderProcessingsContainer } from '../../../../src/containers/orders/options/ShowOrderProcessingsContainer'
import { SOME_ORDERS } from '../../../dumps/Orders.dumb'
import { SOME_PROCESSING } from '../../../dumps/Processing.dump'
import { SOME_ORDER_PROCESSINGS } from '../../../dumps/OrderProcessings.dump'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test ShowOrderProcessingsContainer
 * @author Théo Lasserre
 */
describe('[Order Common] Testing ShowOrderProcessingsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ShowOrderProcessingsContainer)
  })
  it('should render correctly', () => {
    const props = {
      entity: SOME_ORDERS.content[0],
      onShowProcessings: () => { },
      processingSelectors: ProcessingClient.getProcessingSelectors(['idk']),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(['idk']),
      // from mapStateToProps
      processingList: SOME_PROCESSING,
    }
    const enzymeWrapper = shallow(<ShowOrderProcessingsContainer {...props} />, { context })
    const component = enzymeWrapper.find(ShowOrderProcessingsComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    assert.deepEqual(enzymeWrapper.instance().state.orderProcessings, SOME_ORDER_PROCESSINGS, 'orderProcessings should be correctly build')
    assert.equal(component.props().orderProcessings, enzymeWrapper.instance().state.orderProcessings, 'orderProcessings should be correctly set')
    assert.equal(component.props().onShowProcessings, props.onShowProcessings, 'orderProcessings should be correctly set')
  })
})
