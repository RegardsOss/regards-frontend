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

import { RuntimeTargetTypes } from '@regardsoss/domain/access'

/**
 * Service target definitions for using modules. Note: that definition matches the RuntimeTarget shape for UI plugin services
 * (less conversion efforts later on ;-) but isn't exactly the same
 * @author Raphaël Mechali
 */

/**
 * Builds a "one element" target
 * @param {*} id entity ID (URN)
 * @return One element target
 */
export function buildOneElementTarget(id) {
  return {
    type: RuntimeTargetTypes.ONE,
    entity: id,
    entitiesCount: 1,
  }
}

/**
 * Builds a "many elements" target
 * @param {*} ids entities ID (URN) array
 * @return many elements target
 */
export function buildManyElementsTarget(ids) {
  return {
    type: RuntimeTargetTypes.MANY,
    entities: ids,
    entitiesCount: ids.length,
  }
}

/**
 * Builds "query" target
 * @param {*} requestParameters OpenSearch request parameters
 * @param entityType type of entities to retrieve with query
 * @param entitiesCount query entities count (total, ignore the unselected elements count here)
 * @param excludedIDs exlcuded entities ID (URN) array
 * @return query target
 */
export function buildQueryTarget(requestParameters, entityType, entitiesCount, excludedIDs) {
  return {
    type: RuntimeTargetTypes.QUERY,
    requestParameters,
    entityType,
    entitiesCount: entitiesCount - excludedIDs.length,
    excludedIDs,
  }
}

export default {
  buildOneElementTarget,
  buildManyElementsTarget,
  buildQueryTarget,
}
