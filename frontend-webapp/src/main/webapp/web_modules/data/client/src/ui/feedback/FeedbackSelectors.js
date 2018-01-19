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

import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Feedback state selectors
 * @author Raphaël Mechali
 */
export class FeedbackSelectors extends BasicSelector {
  /**
   * Returns current feedback type (null or undefined if no feedback is currently shown)
   * @return {string} current feedback type or null / undefined
   */
  getFeedbackType(state) {
    return this.uncombineStore(state).feedbackType
  }
}

/**
 * Returns an intsance of feedback selectors on given store path
 * @param  {[string]} store path: reducer store path
 * @return {FeedbackSelectors} feedback selectors instance
 */
export function getFeedbackSelectors(storePath) {
  return new FeedbackSelectors(storePath)
}
