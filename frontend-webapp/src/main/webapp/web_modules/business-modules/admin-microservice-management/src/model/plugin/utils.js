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
    pluginParameter = find(pluginConfiguration.content.parameters, el => el.name === pluginParameterType.name)
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

export {
  parameterTypeToDefaultParameter,
  buildDefaultParameterList,
  buildParameterList,
  mapPluginParameterTypeToPluginParameter,
}
