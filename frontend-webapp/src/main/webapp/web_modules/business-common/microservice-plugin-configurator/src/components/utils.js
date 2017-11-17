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
import find from 'lodash/find'
import map from 'lodash/map'
import isUndefined from 'lodash/isUndefined'

/**
 * Builds an parameter with default or empty value from the passed parameter type
 *
 * @param parameterType sefl expl.
 */
const parameterTypeToDefaultParameter = parameterType => ({
  name: parameterType.name,
  value: parameterType.defaultValue,
  dynamic: false,
  dynamicsValues: [],
})

/**
 * Initializes an array of parameters with default values from the passed types list.
 *
 * @param pluginParameterTypeList the array of plugn parameterType
 */
const buildDefaultParameterList = pluginParameterTypeList => map(pluginParameterTypeList, parameterTypeToDefaultParameter)

/**
 * Merge the passed plugin parameters list with the default values
 *
 * @param pluginParameterList The list of effective parameters
 * @param pluginParameterTypeList From which we extract default values
 */
const buildParameterList = (pluginParameterList, pluginParameterTypeList) => {
  const result = []
  const defaults = buildDefaultParameterList(pluginParameterTypeList)
  // Merge pluginParameterList into default AND CONSERVE THE ORDER OF DEFAULT (this is why we do not use lodash)
  defaults.forEach((item) => {
    const yep = find(pluginParameterList, element => element.name === item.name) || item
    result.push(yep)
  })
  return result
}

/**
 * Find the pluginParameterType of the {@code pluginParameter}
 *
 * @param pluginParameterType Of which we want the type
 * @param pluginConfiguration The lookup table providing all available parameters
 * @returns {String || undefined}
 */
const mapPluginParameterTypeToPluginParameter = (pluginParameterType, pluginConfiguration) => {
  let pluginParameter
  if (pluginConfiguration) {
    pluginParameter = find(pluginConfiguration.parameters, el => el.name === pluginParameterType.name)
    if (isUndefined(pluginParameter) && !pluginParameterType.optional) {
      throw new Error("The plugin configuration the server returned is in an invalid state: the plugin conf doesn't contain the parameter expected")
    } else if (isUndefined(pluginParameter)) {
      pluginParameter = parameterTypeToDefaultParameter(pluginParameterType)
    }
  } else {
    pluginParameter = parameterTypeToDefaultParameter(pluginParameterType)
  }
  return pluginParameter
}

export default {
  parameterTypeToDefaultParameter,
  buildDefaultParameterList,
  buildParameterList,
  mapPluginParameterTypeToPluginParameter,
}
