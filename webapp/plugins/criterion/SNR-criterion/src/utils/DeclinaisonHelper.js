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
 * Shares declaison checking method
 * @author Théo Lasserre
 */
export default class DeclinaisonHelper {
  /** Inclusive minimum search declinaison value */
  static MIN_DECLINAISON = -90

  /** Inclusive maximum search declinaison value */
  static MAX_DECLINAISON = 90

  /** Inclusive minimum search radian declinaison value */
  static MIN_RADIAN_DECLINAISON = -1.5708

  /** Inclusive maximum search radian declinaison value */
  static MAX_RADIAN_DECLINAISON = 1.5708

  /** Inclusive minimum search arc sec declinaison value */
  static MIN_ARC_SEC_DECLINAISON = -324000

  /** Inclusive maximum search arc sec declinaison value */
  static MAX_ARC_SEC_DECLINAISON = 324000

  /**
   * Computes if declinaison text is valid and is in [-90;90]
   * @param {string} declinaisonText declinaison text
   * @param {string} unitSelected unit selected
   * @return {boolean} true if declinaison is valid
   */
  static isValidDeclinaison = (declinaisonText, unitSelected) => {
    const declinaison = parseFloat(declinaisonText)
    let minAngle = DeclinaisonHelper.MIN_DECLINAISON
    let maxAngle = DeclinaisonHelper.MAX_DECLINAISON
    if (unitSelected === converter.UNITS_ENUM.RAD) {
      minAngle = DeclinaisonHelper.MIN_RADIAN_DECLINAISON
      maxAngle = DeclinaisonHelper.MAX_RADIAN_DECLINAISON
    } else if (unitSelected === converter.UNITS_ENUM.ARCSEC) {
      minAngle = DeclinaisonHelper.MIN_ARC_SEC_DECLINAISON
      maxAngle = DeclinaisonHelper.MAX_ARC_SEC_DECLINAISON
    }
    return isEmpty(declinaisonText) || (declinaison >= minAngle && declinaison <= maxAngle)
  }

  /**
   * Compute if declinaison field is in error
   * Use other form field values to check validity of the field
   * Usefull when we need to display un error message and when we validate the form
   * @param {string} declinaisonText declinaison text
   * @param {string} rightAscensionText right ascension text
   * @param {string} angleText angle text
   * @param {string} unitSelected unit selected
   * @return {boolean} true if declinaison field is in error
   */
  static isDeclinaisonInError = (declinaisonText, rightAscensionText, angleText, unitSelected) => (isEmpty(declinaisonText) && (!isEmpty(rightAscensionText) || !isEmpty(angleText)))
    || !DeclinaisonHelper.isValidDeclinaison(declinaisonText, unitSelected)
}
