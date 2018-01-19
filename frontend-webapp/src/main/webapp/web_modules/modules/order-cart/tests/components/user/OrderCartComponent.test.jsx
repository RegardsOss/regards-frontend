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
import CartIcon from 'material-ui/svg-icons/action/shopping-cart'
import NotLoggedIcon from 'material-ui/svg-icons/action/lock'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NoContentMessageInfo } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import OrderCartComponent from '../../../src/components/user/OrderCartComponent'
import OrderCartTableComponent from '../../../src/components/user/OrderCartTableComponent'
import styles from '../../../src/styles/styles'

import { mockBasket1 } from '../../BasketMocks'

const context = buildTestContext(styles)

/**
* Test OrderCartComponent
* @author Raphaël Mechali
*/
describe('[OrderCart] Testing OrderCartComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderCartComponent)
  })
  it('should render correctly when user is not authenticated', () => {
    const props = {
      showDatasets: false,
      isAuthenticated: false,
      basket: undefined,
      isFetching: false,
      expanded: true,
      onExpandChange: () => { },
      onClearCart: () => { },
      onOrder: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartComponent {...props} />, { context })
    // Check no data state
    const noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be a no data component')
    assert.isTrue(noContentWrapper.props().noContent, 'No data component should be marked as no content')
    // Check specific messages for authentication
    assert.equal(noContentWrapper.props().title, 'order-cart.module.not.logged.title', 'When not authenticated, title key should be correctly set up')
    assert.equal(noContentWrapper.props().message, 'order-cart.module.not.logged.messsage', 'When not authenticated, message key should be correctly set up')
    assert.equal(noContentWrapper.props().Icon, NotLoggedIcon, 'When not authenticated, icon should be a NotLoggedIcon')
    // Check table
    const orderCartTableWrapper = enzymeWrapper.find(OrderCartTableComponent)
    assert.lengthOf(orderCartTableWrapper, 1, 'There should be a table component')
    assert.equal(orderCartTableWrapper.props().basket, props.basket, 'Table should have the right basket value')
    // Check loading
    const loadableWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableWrapper, 1, 'There should be a loadable dispayer')
    assert.isFalse(loadableWrapper.props().isLoading, 'Loadable displayer should not be marked loading')
  })
  it('should render correctly when user is authenticated and basket empty', () => {
    const props = {
      showDatasets: false,
      isAuthenticated: true,
      basket: undefined,
      isFetching: false,
      expanded: true,
      onExpandChange: () => { },
      onClearCart: () => { },
      onOrder: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartComponent {...props} />, { context })
    // Check no data state
    const noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be a no data component')
    assert.isTrue(noContentWrapper.props().noContent, 'No data component should be marked as no content')
    // Check specific messages for empty basket
    assert.equal(noContentWrapper.props().title, 'order-cart.module.empty.basket.title', 'When basket is empty, title key should be correctly set up')
    assert.equal(noContentWrapper.props().message, 'order-cart.module.empty.basket.messsage', 'When basket is empty, message key should be correctly set up')
    assert.equal(noContentWrapper.props().Icon, CartIcon, 'When basket is empty, icon should be a NotLoggedIcon')
    // Check table
    const orderCartTableWrapper = enzymeWrapper.find(OrderCartTableComponent)
    assert.lengthOf(orderCartTableWrapper, 1, 'There should be a table component')
    assert.equal(orderCartTableWrapper.props().basket, props.basket, 'Table should have the right basket value')
    // Check loading
    const loadableWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableWrapper, 1, 'There should be a loadable dispayer')
    assert.isFalse(loadableWrapper.props().isLoading, 'Loadable displayer should not be marked loading')
  })
  it('should render correctly when fetching (fetch state SHOULD NEVER show no data)', () => {
    const props = {
      showDatasets: true,
      isAuthenticated: true,
      basket: undefined,
      isFetching: true,
      expanded: true,
      onExpandChange: () => { },
      onClearCart: () => { },
      onOrder: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartComponent {...props} />, { context })
    // Check no data state is hidden
    const noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be a no data component')
    assert.isFalse(noContentWrapper.props().noContent, 'No data component should be hidden')
    // Check loading
    const loadableWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableWrapper, 1, 'There should be a loadable dispayer')
    assert.isTrue(loadableWrapper.props().isLoading, 'Loadable dispayer should  be marked loading')
  })
  it('should render correctly with a basket', () => {
    const props = {
      showDatasets: false,
      isAuthenticated: true,
      basket: mockBasket1,
      isFetching: false,
      expanded: true,
      onExpandChange: () => { },
      onClearCart: () => { },
      onOrder: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartComponent {...props} />, { context })
    // Check no data state is hidden
    const noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be a no data component')
    assert.isFalse(noContentWrapper.props().noContent, 'No data component should be marked as no content')
    // Check table
    const orderCartTableWrapper = enzymeWrapper.find(OrderCartTableComponent)
    assert.lengthOf(orderCartTableWrapper, 1, 'There should be a table component')
    assert.equal(orderCartTableWrapper.props().basket, props.basket, 'Table should have the right basket value')
    // Check loading
    const loadableWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableWrapper, 1, 'There should be a loadable dispayer')
    assert.isFalse(loadableWrapper.props().isLoading, 'Loadable displayer should not be marked loading')
  })
})
