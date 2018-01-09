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
import { FeedbackActions } from './FeedbackActions'

/**
 * Feedback actions reducer, to be installed by using modules
 * @author Raphaël Mechali
 */
export class FeedbackReducer {
  /** Reducer default state */
  static DEFAULT_STATE = {
    // current feedback type, or null / undefined
    feedbackType: null,
  }

  /**
   * Constructor
   * @param {*} namespace actions namespace
   */
  constructor(namespace) {
    this.actions = new FeedbackActions(namespace)
  }

  /**
   * Reduces action or returns default state
   */
  reduce = (state = FeedbackReducer.DEFAULT_STATE, action) => {
    switch (action.type) {
      case this.actions.TOGGLE_FEEDBACK:
        return { feedbackType: action.feedbackType }
      default:
        return state
    }
  }
}

/**
 * Returns a feedback reducer instance on actions namespace
 * @param {string} namespace actions namespace
 * @return {FeedbackReducer} reducer instance
 */
export function getFeedbackReducer(namespace) {
  const reducerInstance = new FeedbackReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
