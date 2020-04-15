/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import root from 'window-or-global'

/**
 * Helper to serialize / deserialize criteria state from / to results context
 */
export class SearchStateSerializationHelper {
  /**
   * Serializes object as parameter
   * @param {*} object to serialize
   * @return {string} serialized object
   */
  static serializeObject(object) {
    // stringify that light
    return JSON.stringify(object)
  }

  /**
   * Deserializes object
   * @param {string} serializeObject to deserialize
   * @return {*} deserialized object
   */
  static deserializeObject(serializedState) {
    return JSON.parse(serializedState)
  }

  /**
   * Serializes search criteria as parameter
   * @return {[*]} searchCriteria as array of UIShapes.ApplyingSearchCriterion, to serialize
   * @return {string} serialized state or null if nothing to serialize
   */
  static serialize(searchCriteria) {
    return searchCriteria.length
      ? SearchStateSerializationHelper.serializeObject(
        // serialize with short field names
        searchCriteria.map(({ pluginInstanceId, state, requestParameters }) => ({
          i: pluginInstanceId,
          s: state,
          r: requestParameters,
        })))
      : null
  }

  /**
   * Deserializes value in groups models as parameter
   * @param {string} serializedValue -
   * @return {[*]} deserialized criteria, as array of UIShapes.ApplyingSearchCriterion
   */
  static deserialize(serializedValue) {
    // Nota: some old configurations may still be in list but it is not a problem here:
    // query will still be correctly computed and, pluginInstanceID being different, the
    // state will not be used
    return serializedValue
      ? SearchStateSerializationHelper.deserializeObject(serializedValue).map(({ i, s, r }) => ({
        pluginInstanceId: i,
        state: s,
        requestParameters: r,
      })) : null
  }
}
