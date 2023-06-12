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
 * Shares cone angle checking method
 * @author Théo Lasserre
 */
export default class ConeAngleHelper {
  /** Exlusive minimum search cone angle value */
  static MIN_CONE_ANGLE = 0

  /** Exlusive maximum search cone angle value */
  static MAX_CONE_ANGLE = 180

  /**
   * Computes if angle text is valid and is in ]0;180[
   * @param {string} angleText angle text
   * @return {boolean} true if angle is valid
   */
  static isValidAngle = (angleText) => {
    const angle = parseFloat(angleText)
    return isEmpty(angleText) || (angle > ConeAngleHelper.MIN_CONE_ANGLE && angle < ConeAngleHelper.MAX_CONE_ANGLE)
  }

  /**
   * Compute if angle field is in error using SNR option
   * Use other form field values to check validity of the field
   * Usefull when we need to display un error message and when we validate the form
   * @param {string} spatialNameText spatial name text
   * @param {string} angleText angle text
   * @return {boolean} true if angle field is in error using SNR option
   */
  static isAngleSNRInError = (spatialNameText, angleText) => (isEmpty(angleText) && !isEmpty(spatialNameText)) || !ConeAngleHelper.isValidAngle(angleText)

  /**
   * Compute if angle field is in error using DIRECT_VALUES option
   * Use other form field values to check validity of the field
   * Usefull when we need to display un error message and when we validate the form
   * @param {string} declinaisonText declinaison text
   * @param {string} rightAscensionText right ascension text
   * @param {string} angleText angle text
   * @return {boolean} true if angle field is in error using DIRECT_VALUES option
   */
  static isAngleDirectValuesInError = (declinaisonText, rightAscensionText, angleText) => (isEmpty(angleText) && (!isEmpty(rightAscensionText) || !isEmpty(declinaisonText)))
  || !ConeAngleHelper.isValidAngle(angleText)
}
