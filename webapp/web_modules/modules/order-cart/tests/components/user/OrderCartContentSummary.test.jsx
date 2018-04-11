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
import OrderCartContentSummaryComponent from '../../../src/components/user/OrderCartContentSummaryComponent'
import DuplicatedObjectsMessageComponents from '../../../src/components/user/options/DuplicatedObjectsMessageComponents'
import styles from '../../../src/styles'
import { emptyBasket, mockBasket1, mockBasket2 } from '../../BasketMocks'

const context = buildTestContext(styles)

/**
 * Test OrderCartContentSummaryComponent
 * @author Raphaël Mechali
 */
describe('[Order Cart] Testing OrderCartContentSummaryComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderCartContentSummaryComponent)
  })
  it('should render correctly without basket', () => {
    const props = {
      basket: null,
      onShowDuplicatedMessage: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartContentSummaryComponent {...props} />, { context })
    const wrapperAsText = enzymeWrapper.debug()
    // check text
    assert.notInclude(wrapperAsText, 'order-cart.module.objects.count.header.message', 'There is no object, objects message should be hidden')
    assert.notInclude(wrapperAsText, 'order-cart.module.objects.count.size.message', 'There is no object, size message should be hidden')
    const componentState = enzymeWrapper.state()
    // check resolved data in state
    assert.equal(componentState.totalObjectsCount, 0, 'totalObjectsCount shoud worth 0')
    assert.equal(componentState.effectiveObjectsCount, 0, 'effectiveObjectsCount shoud worth 0')
    // check message button and its properties
    const messageButtonWrapper = enzymeWrapper.find(DuplicatedObjectsMessageComponents)
    assert.lengthOf(messageButtonWrapper, 0, 'The component should not mount any child when basket objects count is 0')
  })
  it('should render correctly with empty basket', () => {
    const props = {
      basket: emptyBasket,
      onShowDuplicatedMessage: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartContentSummaryComponent {...props} />, { context })
    const wrapperAsText = enzymeWrapper.debug()
    // check text
    assert.notInclude(wrapperAsText, 'order-cart.module.objects.count.header.message', 'There is no object, objects message should be hidden')
    assert.notInclude(wrapperAsText, 'order-cart.module.objects.count.size.message', 'There is no object, size message should be hidden')
    const componentState = enzymeWrapper.state()
    // check resolved data in state
    assert.equal(componentState.totalObjectsCount, 0, 'totalObjectsCount shoud worth 0')
    assert.equal(componentState.effectiveObjectsCount, 0, 'effectiveObjectsCount shoud worth 0')
    // check message button and its properties
    const messageButtonWrapper = enzymeWrapper.find(DuplicatedObjectsMessageComponents)
    assert.lengthOf(messageButtonWrapper, 0, 'The component should not mount any child when basket objects count is 0')
  })
  it('should render correctly with a basket containing no double', () => {
    const props = {
      basket: mockBasket2,
      onShowDuplicatedMessage: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartContentSummaryComponent {...props} />, { context })
    const wrapperAsText = enzymeWrapper.debug()
    // check text
    assert.include(wrapperAsText, 'order-cart.module.objects.count.header.message', 'There are objects, objects message should be visible')
    assert.include(wrapperAsText, 'order-cart.module.objects.count.size.message', 'There are object, size message should be visible')
    const componentState = enzymeWrapper.state()
    // check resolved data in state
    assert.equal(componentState.totalObjectsCount, 23, 'totalObjectsCount shoud worth 23')
    assert.equal(componentState.effectiveObjectsCount, 23, 'effectiveObjectsCount shoud worth 23')
    // check message button and its properties
    const messageButtonWrapper = enzymeWrapper.find(DuplicatedObjectsMessageComponents)
    assert.lengthOf(messageButtonWrapper, 1, 'There should be the message button wrapper')
    testSuiteHelpers.assertWrapperProperties(messageButtonWrapper, {
      totalObjectsCount: componentState.totalObjectsCount,
      effectiveObjectsCount: componentState.effectiveObjectsCount,
      onShowDuplicatedMessage: props.onShowDuplicatedMessage,
    }, 'The right properties should be provided to message button')
  })
  it('should render correctly with a basket containing doubles', () => {
    const props = {
      basket: mockBasket1,
      onShowDuplicatedMessage: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartContentSummaryComponent {...props} />, { context })
    const wrapperAsText = enzymeWrapper.debug()
    // check text
    assert.include(wrapperAsText, 'order-cart.module.objects.count.header.message', 'There are objects, objects message should be visible')
    assert.include(wrapperAsText, 'order-cart.module.objects.count.size.message', 'There are object, size message should be visible')
    const componentState = enzymeWrapper.state()
    // check resolved data in state
    assert.equal(componentState.totalObjectsCount, 28, 'totalObjectsCount shoud worth 28')
    assert.equal(componentState.effectiveObjectsCount, 27, 'effectiveObjectsCount shoud worth 27')
    // check message button and its properties
    const messageButtonWrapper = enzymeWrapper.find(DuplicatedObjectsMessageComponents)
    assert.lengthOf(messageButtonWrapper, 1, 'There should be the message button wrapper')
    testSuiteHelpers.assertWrapperProperties(messageButtonWrapper, {
      totalObjectsCount: componentState.totalObjectsCount,
      effectiveObjectsCount: componentState.effectiveObjectsCount,
      onShowDuplicatedMessage: props.onShowDuplicatedMessage,
    }, 'The right properties should be provided to message button')
  })
  it('should detect basket change and update self state', () => {
    const props = {
      basket: emptyBasket,
      onShowDuplicatedMessage: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartContentSummaryComponent {...props} />, { context })
    let componentState = enzymeWrapper.state()
    assert.equal(componentState.totalObjectsCount, 0, 'totalObjectsCount shoud worth 0 at initialization')
    assert.equal(componentState.effectiveObjectsCount, 0, 'effectiveObjectsCount shoud worth 0 at initialization')

    // update basket in properties
    enzymeWrapper.setProps({
      ...props,
      basket: mockBasket1,
    })
    componentState = enzymeWrapper.state()
    assert.equal(componentState.totalObjectsCount, 28, 'totalObjectsCount shoud worth 28 after update')
    assert.equal(componentState.effectiveObjectsCount, 27, 'effectiveObjectsCount shoud worth 27 after update')
  })
})
