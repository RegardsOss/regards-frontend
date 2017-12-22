/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isUndefined from 'lodash/isUndefined'
import { PluginParameterTypes, JavaPrimitiveTypes } from '@regardsoss/domain/common'
import { RuntimeTargetTypes } from '@regardsoss/domain/access'
import { OpenSearchQuery } from '@regardsoss/domain/catalog'
import { ValidationHelpers } from '@regardsoss/form-utils'
import { Parameter } from './parameters/Parameter'

/**
 * Tools to convert catalog plugin service configuration and metadata into common form parameters model
 * @author Raphaël Mechali
 */

/**
 * Select the default values in values as parameter by order of preference (admin set, then developper meta, then custom default if any)
 */
function selectDefaultValuesIn(adminValue, devValue) {
  return isUndefined(adminValue) ? devValue : adminValue
}

const validatorByJavaType = {
  [JavaPrimitiveTypes.BYTE]: ValidationHelpers.javaByteValidator,
  [JavaPrimitiveTypes.CHARACTER]: ValidationHelpers.characterValidator,
  [JavaPrimitiveTypes.DOUBLE]: ValidationHelpers.javaDoubleValidator,
  [JavaPrimitiveTypes.FLOAT]: ValidationHelpers.javaFloatValidator,
  [JavaPrimitiveTypes.INTEGER]: ValidationHelpers.javaIntegerValidator,
  [JavaPrimitiveTypes.LONG]: ValidationHelpers.javaLongValidator,
  [JavaPrimitiveTypes.SHORT]: ValidationHelpers.javaShortValidator,
  [JavaPrimitiveTypes.STRING]: null,
}

/**
 * Converts the parameter using metadata
 * @param pluginConf parameter corresponding plugin configuration parameter
 * @param metadataParameter corresponding metadata parameter
 * @return Parameter converted
 */
function convertParameter({ name, value: adminValue, dynamicsValues }, {
  type, paramType, defaultValue: devValue, optional,
}) {
  // 1 - check that the parameter type is not plugin (strictly forbidden in plugin service)
  if (paramType !== PluginParameterTypes.PRIMITIVE) {
    throw new Error(`Unsupported plugin parameter type at runtime ${paramType}`)
  }

  const specDefaultValue = selectDefaultValuesIn(adminValue, devValue)

  // A boolean parameter
  if (type === JavaPrimitiveTypes.BOOLEAN) {
    // default value: make sure it some boolean (false when not specified)
    return Parameter.buildBooleanEditor(name, !!specDefaultValue, !optional)
  }

  // a choice parameter (ie. restricted to a given choice list)
  if (dynamicsValues && dynamicsValues.length) {
    // default value: make sure it is one of the choices
    return Parameter.buildChoiceEditor(name, !dynamicsValues.includes(specDefaultValue) ? dynamicsValues[0] : specDefaultValue, dynamicsValues, !optional)
  }

  // a text parameter, free or not, depending on type
  const validator = validatorByJavaType[type]
  if (isUndefined(validator)) {
    throw new Error(`Parameter input  management impossible, unknown type ${type}`)
  }
  return Parameter.buildTextEditor(name, specDefaultValue, validator, !optional)
}

/**
 * Resolves catalog plugin parameters as common Parameter model using configuration and metadata
 * @param pluginConfiguration plugin configuration following PluginConfiguration shape
 * @param pluginMetadata plugin metadata following PluginMetaData shape
 * @return {Array<Parameter>} resolved array or empty array. Note: it removes non dynamic parameters
 */
function resolveParametersWithTypes(pluginConfiguration, metadata) {
  return (pluginConfiguration.content.parameters || [])
    .filter(({ dynamic }) => !!dynamic)
    .map((configParam) => {
      // retrieve metadata parameter
      const metadataParam = metadata.content.parameters.find(({ name }) => name === configParam.name)
      if (metadataParam === null) {
        throw new Error('Metadata and configuration do not match for parameter ', configParam.name)
      }
      return convertParameter(configParam, metadataParam)
    })
}


/**
 * Packs the service target
 * @param {ServiceTarget} target target as provided by plugin run model
 * @return usable target parameters
 */
function packTargetParameters(target) {
  switch (target.type) {
    case RuntimeTargetTypes.ONE:
      return { entityId: target.entity }
    case RuntimeTargetTypes.MANY:
      return { entitiesId: target.entities }
    case RuntimeTargetTypes.QUERY:
    {
      const q = new OpenSearchQuery(target.q, [OpenSearchQuery.buildIpIdParameter(target.excludedIpIds, true)]).toQueryString()
      return { q, entityType: target.entityType }
    }
    default:
      throw new Error('Invalid target') // development error only
  }
}


module.exports = {
  convertParameter, // exported at least for tests
  packTargetParameters,
  resolveParametersWithTypes,
}
