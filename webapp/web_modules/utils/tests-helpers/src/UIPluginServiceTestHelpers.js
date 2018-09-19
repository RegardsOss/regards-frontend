/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ServiceTarget from '@regardsoss/entities-common/src/definitions/ServiceTarget'
import { packRuntimeTarget } from '@regardsoss/entities-common/src/definitions/UIPluginServiceHelper'


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

function buildOneElementTarget(ipID = 'a.test.IPID', type = RuntimeTargetTypes.DATA) {
  return packRuntimeTarget(ServiceTarget.buildOneElementTarget(ipID, type))
}

function buildManyElementsTarget(ipIDs = ['test.IPID.1', 'test.IPID.2'], type = RuntimeTargetTypes.DATA) {
  return packRuntimeTarget(ServiceTarget.buildManyElementsTarget(ipIDs, type))
}

function buildQueryTarget(query = 'test=true', count = 5, type = RuntimeTargetTypes.DATA, excludedIpIDs = []) {
  return packRuntimeTarget(ServiceTarget.buildQueryTarget(query, type, count, excludedIpIDs))
}

export default {
  buildConfiguration,
  buildOneElementTarget,
  buildManyElementsTarget,
  buildQueryTarget,
}
