/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'

/**
 * Shares spatial name checking method
 * @author Théo Lasserre
 */
export default class SpatialNameHelper {
  /**
   * Compute if spatial name field is in error
   * Use other form field values to check validity of the field
   * Usefull when we need to display un error message and when we validate the form
   * @param {string} spatialNameText spatial name text
   * @param {string} angleText angle text
   * @param {boolean} invalidSNR boolean sent by third party software
   * @return {boolean} true if spatial name field is in error
   */
  static isSpatialNameInError = (spatialNameText, angleText, invalidSNR) => ((isEmpty(spatialNameText) && !isEmpty(angleText)) || invalidSNR)
}
