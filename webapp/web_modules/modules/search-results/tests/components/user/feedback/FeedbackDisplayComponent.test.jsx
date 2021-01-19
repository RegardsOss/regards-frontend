/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FeedbackDisplayer } from '@regardsoss/components'
import FeedbackDisplayComponent from '../../../../src/components/user/feedback/FeedbackDisplayComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test FeedbackDisplayComponent
* @author Raphaël Mechali
*/
describe('[SEARCH RESULTS] Testing FeedbackDisplayComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FeedbackDisplayComponent)
  })

  it('should render correctly fetching', () => {
    const props = {
      isAddingToBasket: true,
      operationStatus: FeedbackDisplayComponent.OPERATION_STATUS.DONE_OK,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayComponent {...props} />, { context })
    const feedbackDisplayer = enzymeWrapper.find(FeedbackDisplayer)
    assert.lengthOf(feedbackDisplayer, 1, 'it should configure and display a feedback component')
    assert.isTrue(feedbackDisplayer.props().isFetching, 'The feedback displayer should be marked fetching')
  })
  it('should render correctly done or not fetching with default status', () => {
    const props = {
      isAddingToBasket: false,
      operationStatus: FeedbackDisplayComponent.OPERATION_STATUS.DONE_OK,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayComponent {...props} />, { context })
    const feedbackDisplayer = enzymeWrapper.find(FeedbackDisplayer)
    assert.lengthOf(feedbackDisplayer, 1, 'it should configure and display a feedback component')
    assert.isFalse(feedbackDisplayer.props().isFetching, 'The feedback displayer should be marked fetching')
    assert.isFalse(feedbackDisplayer.props().doneWithError, 'In DONE OK state, the feedback should not be marked in error')
    assert.isUndefined(feedbackDisplayer.props().doneIcon, 'DONE OK must use the default done icon')
  })
  it('should render correctly done or not fetching with empty status', () => {
    const props = {
      isAddingToBasket: false,
      operationStatus: FeedbackDisplayComponent.OPERATION_STATUS.DONE_EMPTY,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayComponent {...props} />, { context })
    const feedbackDisplayer = enzymeWrapper.find(FeedbackDisplayer)
    assert.lengthOf(feedbackDisplayer, 1, 'it should configure and display a feedback component')
    assert.isFalse(feedbackDisplayer.props().isFetching, 'The feedback displayer should be marked fetching')
    assert.isFalse(feedbackDisplayer.props().doneWithError, 'In DONE EMPTY state, the feedback should not be marked in error')
    assert.isDefined(feedbackDisplayer.props().doneIcon, 'DONE EMPTY must use a specific icon')
  })
  it('should render correctly done or not fetching with failed status', () => {
    const props = {
      isAddingToBasket: false,
      operationStatus: FeedbackDisplayComponent.OPERATION_STATUS.FAILED,
    }
    const enzymeWrapper = shallow(<FeedbackDisplayComponent {...props} />, { context })
    const feedbackDisplayer = enzymeWrapper.find(FeedbackDisplayer)
    assert.lengthOf(feedbackDisplayer, 1, 'it should configure and display a feedback component')
    assert.isFalse(feedbackDisplayer.props().isFetching, 'The feedback displayer should be marked fetching')
    assert.isTrue(feedbackDisplayer.props().doneWithError, 'In FAILED state, the feedback should be marked in error')
  })
})
