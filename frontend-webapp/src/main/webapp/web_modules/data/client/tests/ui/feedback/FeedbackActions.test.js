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

const testActions = new FeedbackActions('tests')


/**
 * Test FeedbackActions
 * @author Raphaël Mechali
 */
describe('[Client] Testing FeedbackActions', () => {
  it('should exists', () => {
    assert.isDefined(FeedbackActions)
  })
  it('should return toggle feedback redux actions', () => {
    assert.deepEqual(testActions.showFeedback('test-feedback'), {
      type: testActions.TOGGLE_FEEDBACK,
      feedbackType: 'test-feedback',
    }, 'Built action should match what the reducer expects')
  })
  it('should return hide feedback redux actions', () => {
    assert.deepEqual(testActions.hideFeedback(), {
      type: testActions.TOGGLE_FEEDBACK,
      feedbackType: null,
    }, 'Built action should match what the reducer expects')
  })
})
