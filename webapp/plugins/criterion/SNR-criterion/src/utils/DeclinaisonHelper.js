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
 * Shares declaison checking method
 * @author Théo Lasserre
 */
export default class DeclinaisonHelper {
  /** Inclusive minimum search declinaison value */
  static MIN_DECLINAISON = -90

  /** Inclusive maximum search declinaison value */
  static MAX_DECLINAISON = 90

  /**
   * Computes if declinaison text is valid and is in [-90;90]
   * @param {string} declinaisonText declinaison text
   * @return {boolean} true if declinaison is valid
   */
  static isValidDeclinaison = (declinaisonText) => {
    const declinaison = parseFloat(declinaisonText)
    return isEmpty(declinaisonText) || (declinaison >= DeclinaisonHelper.MIN_DECLINAISON && declinaison <= DeclinaisonHelper.MAX_DECLINAISON)
  }

  /**
   * Compute if declinaison field is in error
   * Use other form field values to check validity of the field
   * Usefull when we need to display un error message and when we validate the form
   * @param {string} declinaisonText declinaison text
   * @param {string} rightAscensionText right ascension text
   * @param {string} angleText angle text
   * @return {boolean} true if declinaison field is in error
   */
  static isDeclinaisonInError = (declinaisonText, rightAscensionText, angleText) => (isEmpty(declinaisonText) && (!isEmpty(rightAscensionText) || !isEmpty(angleText)))
    || !DeclinaisonHelper.isValidDeclinaison(declinaisonText)
}
