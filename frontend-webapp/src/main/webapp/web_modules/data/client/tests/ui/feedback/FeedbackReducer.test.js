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
import { assert } from 'chai'
import { FeedbackActions } from '../../../src/ui/feedback/FeedbackActions'
import { FeedbackReducer, getFeedbackReducer } from '../../../src/ui/feedback/FeedbackReducer'

const testActions = new FeedbackActions('tests')
const testReduce = getFeedbackReducer('tests')


/**
 * Test FeedbackReducer
 * @author Raphaël Mechali
 */
describe('[Client] Testing FeedbackReducer', () => {
  it('should exists', () => {
    assert.isDefined(getFeedbackReducer)
  })
  it('should initialize correctly', () => {
    const initState = testReduce(undefined, {})
    assert.deepEqual(initState, FeedbackReducer.DEFAULT_STATE)
  })
  it('should ignore non related actions', () => {
    const nonRelatedAction = { type: 'IAmNotRelated' }
    const nextState = testReduce(undefined, nonRelatedAction)
    assert.deepEqual(nextState, FeedbackReducer.DEFAULT_STATE)
  })
  it('should reduce correctly show feedback action', () => {
    let showAction = testActions.showFeedback('test1')
    let nextState = testReduce(undefined, showAction)
    assert.deepEqual(nextState, {
      feedbackType: 'test1',
    }, 'First action should have been reduced correctly')
    showAction = testActions.showFeedback('test2')
    nextState = testReduce(nextState, showAction)
    assert.deepEqual(nextState, {
      feedbackType: 'test2',
    }, 'Second action should have been reduced correctly')
  })
  it('should reduce correctly hide feedback action', () => {
    let nextState = testReduce(FeedbackReducer.DEFAULT_STATE, testActions.showFeedback('aFeedback'))
    assert.isOk(nextState.feedbackType, 'There should be a shown feedback type')
    nextState = testReduce(nextState, testActions.hideFeedback())
    assert.isNotOk(nextState.feedbackType, 'Feedback should now be hidden')
  })
})
