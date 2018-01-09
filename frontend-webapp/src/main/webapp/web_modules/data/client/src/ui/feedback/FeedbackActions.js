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

/**
 * Feedback actions for modules: lets using module show some specific feedback for a given operation (using modules must
 * define what type of feedback they expect to show)
 * @author Raphaël Mechali
 */
export class FeedbackActions {
  /**
   * Constructor
   * @param {string} namespace actions namespace
   */
  constructor(namespace) {
    this.TOGGLE_FEEDBACK = `${namespace}/toggle-feedback`
  }

  /**
   * Shows feedback for type as parameter
   * @param {string} feedbackType feedback type
   * @return action to dispatch
   */
  showFeedback = feedbackType => ({
    type: this.TOGGLE_FEEDBACK,
    feedbackType,
  })

  /**
   * Hides feedback
   * @return action to dispatch
   */
  hideFeedback = () => this.showFeedback(null)
}
