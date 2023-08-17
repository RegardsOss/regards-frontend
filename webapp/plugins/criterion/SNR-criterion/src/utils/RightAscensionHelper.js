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
 * Shares right ascension checking method
 * @author Théo Lasserre
 */
export default class RightAscensionHelper {
  /** Inclusive minimum search right ascension value */
  static MIN_RIGHT_ASCENSION = 0

  /** Inclusive maximum search right ascension value */
  static MAX_RIGHT_ASCENSION = 360

  /** Inclusive minimum search radian right ascension value */
  static MIN_RADIAN_RIGHT_ASCENSION = 0

  /** Inclusive maximum search radian right ascension value */
  static MAX_RADIAN_RIGHT_ASCENSION = 6.28319

  /** Inclusive minimum search arc sec right ascension value */
  static MIN_ARC_SEC_RIGHT_ASCENSION = 0

  /** Inclusive maximum search arc sec right ascension value */
  static MAX_ARC_SEC_RIGHT_ASCENSION = 1296000

  /**
   * Computes if right ascension text is valid and is in [0;360]
   * @param {string} rightAscensionText right ascension text
   * @param {string} unitSelected unit selected
   * @return {boolean} true if right ascension is valid
   */
  static isValidRightAscension = (rightAscensionText, unitSelected) => {
    let minAngle = RightAscensionHelper.MIN_RIGHT_ASCENSION
    let maxAngle = RightAscensionHelper.MAX_RIGHT_ASCENSION
    if (unitSelected === converter.UNITS_ENUM.RAD) {
      minAngle = RightAscensionHelper.MIN_RADIAN_RIGHT_ASCENSION
      maxAngle = RightAscensionHelper.MAX_RADIAN_RIGHT_ASCENSION
    } else if (unitSelected === converter.UNITS_ENUM.ARCSEC) {
      minAngle = RightAscensionHelper.MIN_ARC_SEC_RIGHT_ASCENSION
      maxAngle = RightAscensionHelper.MAX_ARC_SEC_RIGHT_ASCENSION
    }
    const rightAscension = parseFloat(rightAscensionText)
    return isEmpty(rightAscensionText) || (rightAscension >= minAngle && rightAscension <= maxAngle)
  }

  /**
   * Compute if right ascension field is in error
   * Use other form field values to check validity of the field
   * Usefull when we need to display un error message and when we validate the form
   * @param {string} declinaisonText declinaison text
   * @param {string} rightAscensionText right ascension text
   * @param {string} angleText angle text
   * @param {string} unitSelected unit selected
   * @return {boolean} true if right ascension field is in error
   */
  static isRightAscensionInError = (declinaisonText, rightAscensionText, angleText, unitSelected) => (isEmpty(rightAscensionText) && (!isEmpty(declinaisonText) || !isEmpty(angleText)))
    || !RightAscensionHelper.isValidRightAscension(rightAscensionText, unitSelected)
}
