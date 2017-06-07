/**
 * LICENSE_PLACEHOLDER
 **/
import flow from 'lodash/flow'
import fpcompact from 'lodash/fp/compact'
import fpmap from 'lodash/fp/map'
import fpfilter from 'lodash/fp/filter'
import fpuniqBy from 'lodash/fp/uniqBy'
import find from 'lodash/find'
import map from 'lodash/map'

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
  }
  return pluginParameter
}

/**
 * Extract all plugin parameter types (java.lang.Bool, fr.cnes.regard.ISamplePlugin...) from the plugin configuration
 *
 * @param pluginConfiguration Of which we want to extract types
 * @param pluginMetaData The lookup table providing all available types
 */
const extractUniqueTypesFromConfiguration = (pluginConfiguration, pluginMetaData) =>
  flow( // For all parameters of the defined configuration
    fpmap(pluginParameter => mapPluginParameterToPluginParameterType(pluginParameter, pluginMetaData)), // get their parameter type
    fpcompact(), // Remove falsey values. The values false, null, 0, "", undefined, and NaN are falsey.
    fpfilter(pluginParameterType => pluginParameterType.paramType === 'PLUGIN'), // only keep the 'PLUGIN'
    fpmap(pluginParameterType => pluginParameterType.type), // get the java type ('fr.cnes.regards.IComplexInterface)
    fpuniqBy(pluginParameterType => pluginParameterType.name), // remove doubles
  )(pluginConfiguration && pluginConfiguration.content.parameters)

/**
 * Builds an parameter with default or empty value from the passed parameter type
 *
 * @param parameterType sefl expl.
 */
const parameterTypeToDefaultParameter = parameterType => ({
  name: parameterType.name,
  value: parameterType.defaultValue,
  dynamic: false,
})

/**
 * Initializes an array of parameters with default values from the passed types list.
 *
 * @param pluginParameterTypeList the array of plugn parameterType
 */
const buildDefaultParameterList = pluginParameterTypeList => map(pluginParameterTypeList, parameterTypeToDefaultParameter)

export {
  mapPluginParameterTypeToPluginParameter,
  extractUniqueTypesFromConfiguration,
  buildDefaultParameterList,
  parameterTypeToDefaultParameter,
}
