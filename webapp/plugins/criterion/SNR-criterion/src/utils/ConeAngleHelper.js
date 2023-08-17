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
import { converter } from '@regardsoss/units'

/**
 * Shares cone angle checking method
 * @author Théo Lasserre
 */
export default class ConeAngleHelper {
  /** Exlusive minimum search cone degree angle value */
  static MIN_CONE_ANGLE = 0

  /** Exlusive maximum search cone degree angle value */
  static MAX_CONE_ANGLE = 180

  /** Exlusive minimum search cone radian angle value */
  static MIN_RADIAN_CONE_ANGLE = 0

  /** Exlusive maximum search cone radian angle value */
  static MAX_RADIAN_CONE_ANGLE = 3.14159

  /** Exlusive minimum search cone arc sec angle value */
  static MIN_ARC_SEC_CONE_ANGLE = 0

  /** Exlusive maximum search cone arc sec angle value */
  static MAX_ARC_SEC_CONE_ANGLE = 648000

  /**
   * Computes if angle text is valid and is in ]0;180[
   * @param {string} angleText angle text
   * @param {string} unitSelected unit selected
   * @return {boolean} true if angle is valid
   */
  static isValidAngle = (angleText, unitSelected) => {
    let minAngle = ConeAngleHelper.MIN_CONE_ANGLE
    let maxAngle = ConeAngleHelper.MAX_CONE_ANGLE
    if (unitSelected === converter.UNITS_ENUM.RAD) {
      minAngle = ConeAngleHelper.MIN_RADIAN_CONE_ANGLE
      maxAngle = ConeAngleHelper.MAX_RADIAN_CONE_ANGLE
    } else if (unitSelected === converter.UNITS_ENUM.ARCSEC) {
      minAngle = ConeAngleHelper.MIN_ARC_SEC_CONE_ANGLE
      maxAngle = ConeAngleHelper.MAX_ARC_SEC_CONE_ANGLE
    }
    const angle = parseFloat(angleText)
    return isEmpty(angleText) || (angle > minAngle && angle < maxAngle)
  }

  /**
   * Compute if angle field is in error using SNR option
   * Use other form field values to check validity of the field
   * Usefull when we need to display un error message and when we validate the form
   * @param {string} spatialNameText spatial name text
   * @param {string} angleText angle text
   * @param {string} unitSelected unit selected
   * @return {boolean} true if angle field is in error using SNR option
   */
  static isAngleSNRInError = (spatialNameText, angleText, unitSelected) => (isEmpty(angleText) && !isEmpty(spatialNameText)) || !ConeAngleHelper.isValidAngle(angleText, unitSelected)

  /**
   * Compute if angle field is in error using DIRECT_VALUES option
   * Use other form field values to check validity of the field
   * Usefull when we need to display un error message and when we validate the form
   * @param {string} declinaisonText declinaison text
   * @param {string} rightAscensionText right ascension text
   * @param {string} angleText angle text
   * @param {string} unitSelected unit selected
   * @return {boolean} true if angle field is in error using DIRECT_VALUES option
   */
  static isAngleDirectValuesInError = (declinaisonText, rightAscensionText, angleText, unitSelected) => (isEmpty(angleText) && (!isEmpty(rightAscensionText) || !isEmpty(declinaisonText)))
  || !ConeAngleHelper.isValidAngle(angleText, unitSelected)
}
