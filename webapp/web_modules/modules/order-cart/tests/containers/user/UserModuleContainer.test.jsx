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
import OrderCartComponent from '../../../src/components/user/OrderCartComponent'
import { UserModuleContainer } from '../../../src/containers/user/UserModuleContainer'
import styles from '../../../src/styles/styles'

import { emptyBasket, mockBasket1 } from '../../BasketMocks'

const context = buildTestContext(styles)

/**
* Test UserModuleContainer
* @author Raphaël Mechali
* @author Théo Lasserre
*/
describe('[Order Cart] Testing UserModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UserModuleContainer)
  })
  it('should render correctly with different properties sets', () => {
    const propsSets = [{
      appName: 'x',
      project: 'y',
      type: 'any',
      moduleConf: {
        showDatasets: true,
      },
      isAuthenticated: false,
      basket: undefined,
      hasError: false,
      isFetching: false,
      availableDependencies: [],
      dispatchGetBasket: () => { },
      dispatchFlushBasket: () => { },
      dispatchStartOrder: () => { },
      dispatchClearCart: () => { },
      fetchProcessingConfigurationList: () => { },
      fetchProcessingMetadataList: () => { },
    }, {
      appName: 'x',
      project: 'y',
      type: 'any',
      moduleConf: {
        showDatasets: true,
      },
      isAuthenticated: true,
      basket: emptyBasket,
      hasError: true,
      isFetching: true,
      availableDependencies: [],
      dispatchGetBasket: () => { },
      dispatchFlushBasket: () => { },
      dispatchStartOrder: () => { },
      dispatchClearCart: () => { },
      fetchProcessingConfigurationList: () => { },
      fetchProcessingMetadataList: () => { },
    }, {
      appName: 'x',
      project: 'y',
      type: 'any',
      moduleConf: {
        showDatasets: false,
      },
      isAuthenticated: true,
      basket: mockBasket1,
      hasError: false,
      isFetching: false,
      availableDependencies: [],
      dispatchGetBasket: () => { },
      dispatchFlushBasket: () => { },
      dispatchStartOrder: () => { },
      dispatchClearCart: () => { },
      fetchProcessingConfigurationList: () => { },
      fetchProcessingMetadataList: () => { },
    }]

    propsSets.forEach((props, index) => {
      const enzymeWrapper = shallow(<UserModuleContainer {...props} />, { context })
      const componentWrapper = enzymeWrapper.find(OrderCartComponent)
      assert.lengthOf(componentWrapper, 1, `There should be the sub component - property set n°${index}`)
      testSuiteHelpers.assertWrapperProperties(componentWrapper, {
        basket: props.basket,
        hasError: props.hasError,
        isFetching: props.isFetching,
        isAuthenticated: props.isAuthenticated,
        onClearCart: props.dispatchClearCart,
        onOrder: enzymeWrapper.instance().onOrder,
      }, `Properties should be correctly reported to sub component - property set n°${index}`)
    })
  })
})
