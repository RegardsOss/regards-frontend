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
import FeedbackDisplayComponent from '../../../../src/components/user/feedback/FeedbackDisplayComponent'
import { FeedbackDisplayContainer } from '../../../../src/containers/user/feedback/FeedbackDisplayContainer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test FeedbackDisplayContainer
 * @author Raphaël Mechali
 */
describe('[Search Results] Testing FeedbackDisplayContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FeedbackDisplayContainer)
  })
  it('should render correctly with 200 status code', () => {
    const props = {
      isAddingToBasket: false,
      lastAddStatusCode: 200,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FeedbackDisplayComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      isAddingToBasket: false,
      operationStatus: FeedbackDisplayComponent.OPERATION_STATUS.DONE_OK,
    }, 'Component should define the expected properties')
  })
  it('should render correctly with 200+ status code', () => {
    const props = {
      isAddingToBasket: false,
      lastAddStatusCode: 204,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FeedbackDisplayComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      isAddingToBasket: false,
      operationStatus: FeedbackDisplayComponent.OPERATION_STATUS.DONE_EMPTY,
    }, 'Component should define the expected properties')
  })
  it('should render correctly with 400+ status code', () => {
    const props = {
      isAddingToBasket: false,
      lastAddStatusCode: 401,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FeedbackDisplayComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      isAddingToBasket: false,
      operationStatus: FeedbackDisplayComponent.OPERATION_STATUS.FAILED,
    }, 'Component should define the expected properties')
  })
  it('should render correctly when fetching', () => {
    const props = {
      isAddingToBasket: true,
      lastAddStatusCode: null,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FeedbackDisplayComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      isAddingToBasket: true,
      operationStatus: FeedbackDisplayComponent.OPERATION_STATUS.DONE_OK,
    }, 'Component should define the expected properties')
  })
})
