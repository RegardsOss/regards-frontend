/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { TargetHelper } from '@regardsoss/entities-common/src/definitions/TargetHelper'
import { DamDomain } from '@regardsoss/domain'


/**
 * Provides some tools for UI plugins services test
 * @author Raphaël Mechali
 */

/**
 * Builds a plugin configuration
 * @param staticProperties {*} static properties
 * @param dynamicProperties {*} dynamic properties
 * @return configuration for UI plugin service tests
 */
function buildConfiguration(staticProperties = {}, dynamicProperties = {}) {
  return {
    static: staticProperties,
    dynamic: dynamicProperties,
  }
}
//TODO-LEO improve? (déjà édité pour matcher CatalogShapes.Entity)
function getFakeEntity(ipID, type = DamDomain.ENTITY_TYPES_ENUM.DATA, label = 'any') {
  return {
    content: {
      id: ipID,
      model: 'm1',
      label,
      providerId: label,
      entityType: type,
      tags: [],
    },
  }
}
function getFakeEntitities(ipIDs, type) {
  return map(ipIDs, ipID => getFakeEntity(ipID, type))
}
function buildOneElementTarget(ipID = 'a.test.IPID', type = ENTITY_TYPES_ENUM.DATA) {
  return TargetHelper.buildOneElementTarget(getFakeEntity(ipID, type))
}

function buildManyElementsTarget(ipIDs = ['test.IPID.1', 'test.IPID.2'], type = ENTITY_TYPES_ENUM.DATA) {
  return TargetHelper.buildManyElementsTarget(getFakeEntitities(ipIDs, type))
}

function buildQueryTarget(query = 'test=true', count = 5, type = ENTITY_TYPES_ENUM.DATA, excludedIpIDs = []) {
  return TargetHelper.buildQueryTarget({ q: query }, type, count, excludedIpIDs)
}

export default {
  buildConfiguration,
  buildOneElementTarget,
  buildManyElementsTarget,
  buildQueryTarget,
}
