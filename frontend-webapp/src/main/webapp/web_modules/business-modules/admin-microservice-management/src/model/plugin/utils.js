/**
 * LICENSE_PLACEHOLDER
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
  dynamicValues: [],
})

/**
 * Initializes an array of parameters with default values from the passed types list.
 *
 * @param pluginParameterTypeList the array of plugn parameterType
 */
const buildDefaultParameterList = pluginParameterTypeList => map(pluginParameterTypeList, parameterTypeToDefaultParameter)

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
    pluginParameter = find(pluginConfiguration.content.parameters, el => el.name === pluginParameterType.name)
    if (isUndefined(pluginParameter)) {
      throw new Error("The plugin configuration the server returned is in an invalid state: the plugin conf doesn't contain the parameter expected")
    }
  } else {
    pluginParameter = parameterTypeToDefaultParameter(pluginParameterType)
  }
  return pluginParameter
}

export {
  parameterTypeToDefaultParameter,
  buildDefaultParameterList,
  mapPluginParameterTypeToPluginParameter,
}
