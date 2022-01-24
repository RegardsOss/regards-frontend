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
import BigIcon from 'mdi-material-ui/HumanPregnant'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import OrdersNavigationComponent from '../../src/components/navigation/OrdersNavigationComponent'
import { OrdersNavigationActions } from '../../src/model/OrdersNavigationActions'
import { OrdersNavigationSelectors } from '../../src/model/OrdersNavigationSelectors'
import { OrdersNavigationContainer } from '../../src/containers/OrdersNavigationContainer'
import { SOME_ORDERS } from '../dumps/Orders.dumb'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrdersNavigationContainer
* @author Raphaël Mechali
*/
describe('[Order Common] Testing OrdersNavigationContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrdersNavigationContainer)
  })
  it('should render correctly with current navigation path', () => {
    const props = {
      title: 'hello hello, I don\'t know why you say hello',
      rootIcon: <BigIcon />,
      navigationActions: new OrdersNavigationActions(''), // used in mapDispatchToProps
      navigationSelectors: new OrdersNavigationSelectors(['idk']),
      navigationPath: [],
      authentication: {
        isFetching: false,
        authenticateDate: 68545,
        authenticateExpirationDate: 68725,
        sessionLocked: false,
        result: {
          project: 'any',
          scope: 'any',
          sub: 'user1',
          role: 'myRole',
          access_token: 'xxx',
          token_type: 'yyy',
          expires_in: 56879,
          jti: 'JTIYOURSELF',
        },
      },
      dispatchResetToLevel: () => { },
    }
    const enzymeWrapper = shallow(<OrdersNavigationContainer {...props} />, { context })
    let component = enzymeWrapper.find(OrdersNavigationComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    let compProps = component.props()
    assert.equal(compProps.title, props.title, 'title should be reported')
    assert.equal(compProps.rootIcon, props.rootIcon, 'icon constructor should be reported')
    assert.equal(compProps.onResetTolevel, props.dispatchResetToLevel, 'on reset to level callback should be correctly set up')
    assert.lengthOf(compProps.navigationPath, 1, 'The container should add root element in path')
    assert.equal(compProps.navigationPath[0], OrdersNavigationComponent.ROOT_MARKER, 'Root element should be inserted from corresponding static field in component')

    // check path updates
    const exampleOrder = SOME_ORDERS.content[0]
    enzymeWrapper.setProps({
      ...props,
      navigationPath: [exampleOrder],
    })
    component = enzymeWrapper.find(OrdersNavigationComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    compProps = component.props()
    assert.lengthOf(compProps.navigationPath, 2, 'WITH ORDER - There should be root and order in path')
    assert.equal(compProps.navigationPath[0], OrdersNavigationComponent.ROOT_MARKER, 'WITH ORDER - Root element should be inserted from corresponding static field in component')
    assert.equal(compProps.navigationPath[1], exampleOrder, 'WITH ORDER - Order element should still be present in path')
    const exampleDSTask = exampleOrder.content.datasetTasks[0]
    enzymeWrapper.setProps({
      ...props,
      navigationPath: [exampleOrder, exampleDSTask],
    })
    component = enzymeWrapper.find(OrdersNavigationComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    compProps = component.props()
    assert.lengthOf(compProps.navigationPath, 3, 'WITH ORDER AND DS - There should be root, order and dataset task in path')
    assert.equal(compProps.navigationPath[0], OrdersNavigationComponent.ROOT_MARKER, 'WITH ORDER AND DS - Root element should be inserted from corresponding static field in component')
    assert.equal(compProps.navigationPath[1], exampleOrder, 'WITH ORDER AND DS - Order element should still be present in path')
    assert.equal(compProps.navigationPath[2], exampleDSTask, 'WITH ORDER AND DS - Dataset task element should still be present in path')
  })
  it('should reset navigation when authentified user changes', () => {
    const spyReset = { count: 0 }
    const props = {
      title: 'hello hello, I don\'t know why you say hello',
      rootIcon: <BigIcon />,
      navigationActions: new OrdersNavigationActions(''), // used in mapDispatchToProps
      navigationSelectors: new OrdersNavigationSelectors(['idk']),
      navigationPath: [],
      authentication: {
        isFetching: false,
        authenticateDate: 68545,
        authenticateExpirationDate: 68725,
        sessionLocked: false,
        result: {
          project: 'any',
          scope: 'any',
          sub: 'user1',
          role: 'myRole',
          access_token: 'xxx',
          token_type: 'yyy',
          expires_in: 56879,
          jti: 'JTIYOURSELF',
        },
      },
      dispatchResetToLevel: () => { spyReset.count += 1 },
    }
    const enzymeWrapper = shallow(<OrdersNavigationContainer {...props} />, { context })
    assert.equal(spyReset.count, 1, 'Reset should have been called at initialization')
    enzymeWrapper.setProps({
      ...props,
      authentication: {
        isFetching: false,
        authenticateDate: null,
        authenticateExpirationDate: null,
        sessionLocked: false,
        result: null,
      },
    })
    assert.equal(spyReset.count, 2, 'Reset should have been called after log out')
    enzymeWrapper.setProps({
      ...props,
      authentication: {
        isFetching: false,
        authenticateDate: 68545,
        authenticateExpirationDate: 68725,
        sessionLocked: false,
        result: {
          project: 'any',
          scope: 'any',
          sub: 'user2',
          role: 'myRole',
          access_token: 'xxx',
          token_type: 'yyy',
          expires_in: 56879,
          jti: 'JTIYOURSELF',
        },
      },
    })
    assert.equal(spyReset.count, 3, 'Reset should have been called after log out')
  })
})
