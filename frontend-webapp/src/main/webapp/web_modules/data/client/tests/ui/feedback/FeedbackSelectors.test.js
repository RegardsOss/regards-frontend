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
import { getFeedbackReducer, FeedbackReducer } from '../../../src/ui/feedback/FeedbackReducer'
import { FeedbackSelectors, getFeedbackSelectors } from '../../../src/ui/feedback/FeedbackSelectors'

const testActions = new FeedbackActions('tests')
const testReduce = getFeedbackReducer('tests')
const testSelectors = getFeedbackSelectors(['test', 'feedback'])


const buildMockStore = (initState = FeedbackReducer.DEFAULT_STATE) => ({
  test: {
    feedback: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(testReduce(store.test.feedback, action))

/**
 * Test FeedbackSelectors
 * @author Raphaël Mechali
 */
describe('[Client] Testing FeedbackSelectors', () => {
  it('should exists', () => {
    assert.isDefined(FeedbackSelectors)
    assert.isDefined(getFeedbackSelectors)
  })
  it('should select correctly feedback types as it changes', () => {
    let fakeStore = buildMockStore()
    assert.isNotOk(testSelectors.getFeedbackType(fakeStore), 'No feedback should be shown at initialization')

    fakeStore = mockReduce(fakeStore, testActions.showFeedback('someFeedback'))
    assert.deepEqual(testSelectors.getFeedbackType(fakeStore), 'someFeedback', '"someFeedback" should be shown')

    fakeStore = mockReduce(fakeStore, testActions.hideFeedback())
    assert.isNotOk(testSelectors.getFeedbackType(fakeStore), 'Feedback should now be hidden')
  })
})
