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
import { ShowableAtRender } from '@regardsoss/display-control'
import { modulesManager } from '@regardsoss/modules'
import CartSelectorComponent from '../../../src/components/user/CartSelectorComponent'
import { CartSelectorContainer } from '../../../src/containers/user/CartSelectorContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * An example of resolved properties
 */
const resolvedProps = {
  project: 'any',
  objectsCount: 10,
  isAuthenticated: true, // user must be logged
  dynamicContainerId: 'my-container',
  modules: { // set up many modules, only the module 3 should be resolved
    // another module (just to test we are truely searching in list) - should be ignored
    0: {
      content: {
        id: 0, type: modulesManager.AllDynamicModuleTypes.MENU, name: 'idk', active: true, container: 'my-container',
      },
    },
    // an order-cart module on a wrong container - should be ignored
    1: {
      content: {
        id: 1, type: modulesManager.AllDynamicModuleTypes.ORDER_CART, name: 'idk1', active: true, container: 'another-container', conf: {},
      },
    },
    // an order-cart module disabled - should be ignored
    2: {
      content: {
        id: 2, type: modulesManager.AllDynamicModuleTypes.ORDER_CART, name: 'idk2', active: false, container: 'my-container', conf: {},
      },
    },
    // the order-cart module that should be retrieved
    3: {
      content: {
        id: 3, type: modulesManager.AllDynamicModuleTypes.ORDER_CART, name: 'idk3', active: true, container: 'my-container', conf: {},
      },
    },
  },
  availableEndpoints: ['rs-order@/order/basket@GET'],
  dispatchGetBasket: () => { },
}

/**
* Test CartSelectorContainer
* @author Raphaël Mechali
*/
describe('[Menu] Testing CartSelectorContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CartSelectorContainer)
  })
  it('should render correctly, showing the sub component only when module ID is resolved (covers authentication / deps and modules state)', () => {
    const props = {
      project: 'any',
      objectsCount: 10,
      dispatchGetBasket: () => { },
    }
    const enzymeWrapper = shallow(<CartSelectorContainer {...props} />, { context })
    let showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showableWrapper, 1, 'The showable component should be used to switch visible component state')
    assert.isFalse(showableWrapper.props().show, 'The showable component should be hiding component')
    let componentWrapper = enzymeWrapper.find(CartSelectorComponent)
    assert.lengthOf(componentWrapper, 1, 'The component should be rendered')

    // resolve module id in state and check sub component is shown
    enzymeWrapper.setState({ cartModuleId: 10 })
    showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.isTrue(showableWrapper.props().show, 'The showable component should be displaying component')

    componentWrapper = enzymeWrapper.find(CartSelectorComponent)
    assert.equal(componentWrapper.props().objectsCount, props.objectsCount, 'The notifications should be reported')
    assert.equal(componentWrapper.props().onCartClicked, enzymeWrapper.instance().onCartClicked, 'Container should provide on cart clicked method')
  })

  const testCases = [{
    resolved: false,
    subTitle: 'when not authentified',
    props: {
      ...resolvedProps,
      isAuthenticated: false,
    },
  }, {
    resolved: false,
    subTitle: 'when no dynamic container is known',
    props: {
      ...resolvedProps,
      dynamicContainerId: null,
    },
  }, {
    resolved: false,
    subTitle: 'when no module is defined',
    props: {
      ...resolvedProps,
      modules: {},
    },
  }, {
    resolved: false,
    subTitle: 'when user has not dependencies to basket',
    props: {
      ...resolvedProps,
      availableEndpoints: [],
    },
  }, {
    resolved: true,
    subTitle: 'when module is found, user is authenticated and has dependencies to basket',
    props: resolvedProps,
  }]

  testCases.forEach(({ resolved, subTitle, props }) => {
    it(`${resolved ? 'should' : 'should not'} resolve cart module ID ${subTitle}`, () => {
      // note: the resolution, due to fetch methods required, is performed on componentDidMount. Therefore, we can only test here the instance tool itself
      const cartModuleId = CartSelectorContainer.getCartModuleId(props)
      if (resolved) {
        assert.equal(cartModuleId, resolvedProps.modules['3'].content.id, 'The module 3 should be resolved (see common test props)')
      } else {
        assert.isNotOk(cartModuleId, 'Cart module ID should not be resolved with current props')
      }
    })
  })
})
