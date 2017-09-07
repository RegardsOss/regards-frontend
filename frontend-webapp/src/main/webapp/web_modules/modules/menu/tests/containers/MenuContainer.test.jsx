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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { modulesManager } from '@regardsoss/modules'
import { MenuContainer } from '../../src/containers/MenuContainer'
import CartSelectorContainer from '../../src/containers/CartSelectorContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing MenuContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MenuContainer)
  })
  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
      moduleConf: {
        title: 'any',
        displayAuthentication: true,
        displayLocaleSelector: true,
        displayThemeSelector: true,
        displayCartSelector: false,
      },
    }
    shallow(<MenuContainer {...props} />, { context })
  })

  it('should fire an error when cart selector is displayed but there is no cart order module', () => {
    const props = {
      project: 'any',
      appName: 'any',
      moduleConf: {
        title: 'any',
        displayAuthentication: true,
        displayLocaleSelector: true,
        displayThemeSelector: true,
        displayCartSelector: true,
      },
      // from mapStateToProps
      isAuthenticated: false,
      userLayout: null,
      modules: null,
      availableEndpoints: [],
    }

    try {
      shallow(<MenuContainer {...props} />, { context })
      // no error was thrown: fail
      assert.fail('Configuration is wrong, there should have been an exception')
    } catch (e) {
      // no problem
    }
  })

  it('should resolve display cart with authentication, user rights, modules and layouts', () => {
    const props = {
      project: 'any',
      appName: 'any',
      moduleConf: {
        title: 'any',
        displayAuthentication: true,
        displayLocaleSelector: true,
        displayThemeSelector: true,
        displayCartSelector: true,
      },
      // from mapStateToProps
      isAuthenticated: false,
      // layout and modules must be there as soon as displayCartSelector is true
      userLayout: {
        content: {
          id: 0,
          applicationId: 'any',
          layout: {
            id: '0',
            type: 'any',
            // we just add here one dynamic container, as we want to have a fake order-cart module in a dynamic container
            containers: [{ id: 'my-container', type: 'any', dynamicContent: true }],
          },
        },
      },
      modules: {
        // another module (just to test we are truely searching in list) - should be ignored
        0: { content: { id: 0, type: modulesManager.ModuleTypes.MENU, name: 'idk', active: true, container: 'my-container' } },
        // an order-cart module on a wrong container - should be ignored
        1: { content: { id: 1, type: modulesManager.ModuleTypes.ORDER_CART, name: 'idk1', active: true, container: 'another-container', conf: {} } },
        // an order-cart module disabled - should be ignored
        2: { content: { id: 2, type: modulesManager.ModuleTypes.ORDER_CART, name: 'idk2', active: false, container: 'my-container', conf: {} } },
        // the order-cart module that should be retrieved
        3: { content: { id: 3, type: modulesManager.ModuleTypes.ORDER_CART, name: 'idk3', active: true, container: 'my-container', conf: {} } },
      },
      availableEndpoints: [],
    }

    // 1 - As the user isn't logged and has no resources rights, the cart shouldn't be displayed
    const enzymeWrapper = shallow(<MenuContainer {...props} />, { context })
    let cartWrapper = enzymeWrapper.find(CartSelectorContainer)
    assert.lengthOf(cartWrapper, 0, 'The cart container should no  be displayed')

    // 2 - Let's log in the user, without resource and verify Cart is still hidden
    const props2 = { ...props, isAuthenticated: true }
    enzymeWrapper.setProps(props2)
    cartWrapper = enzymeWrapper.find(CartSelectorContainer)
    assert.lengthOf(cartWrapper, 0, 'The cart container should still be hidden')

    // 3 - Provide resources list containing the basket GET dependency and check that the cart is now visible
    const props3 = { ...props2, availableEndpoints: MenuContainer.BASKET_DEPENDENCIES }
    enzymeWrapper.setProps(props3)

    cartWrapper = enzymeWrapper.find(CartSelectorContainer)
    assert.lengthOf(cartWrapper, 1, 'The cart container should now be visible')
    // check its properties
    assert.equal(cartWrapper.props().project, props3.project, 'The project should be correctly reported')
    assert.equal(cartWrapper.props().cartModuleId, 3, 'The right module ID should be provided to container')
  })
})
