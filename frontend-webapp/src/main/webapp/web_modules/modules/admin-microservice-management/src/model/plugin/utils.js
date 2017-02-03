/**
 * LICENSE_PLACEHOLDER
 **/
import { chain, find, map } from 'lodash'

/**
 * Find the pluginParameterType of the {@code pluginParameter}
 *
 * @param pluginParameter Of which we want the type
 * @param pluginMetaData The lookup table providing all available types
 * @returns {String || undefined}
 */
const mapPluginParameterToPluginParameterType = (pluginParameter, pluginMetaData) => {
  let pluginParameterType
  if (pluginMetaData) {
    pluginParameterType = find(pluginMetaData.content.parameters, el => el.name === pluginParameter.name)
  }
  return pluginParameterType
}

/**
 * Exrtact all plugin parameter types (java.lang.Bool, fr.cnes.regard.ISamplePlugin...) from the plugin configuration
 *
 * @param pluginConfiguration Of which we want to extract types
 * @param pluginMetaData The lookup table providing all available types
 */
const extractUniqueTypesFromConfiguration = (pluginConfiguration, pluginMetaData) =>
  chain(pluginConfiguration && pluginConfiguration.content.parameters) // For all parameters of the defined configuration
    .map(pluginParameter => mapPluginParameterToPluginParameterType(pluginParameter, pluginMetaData)) // get their parameter type
    .compact()
    .filter(pluginParameterType => pluginParameterType.paramType === 'PLUGIN') // only keep the 'PLUGIN'
    .map(pluginParameterType => pluginParameterType.type) // get the java type ('fr.cnes.regards.IComplexInterface)
    .uniqBy(pluginParameterType => pluginParameterType.name) // remove doubles
    .value()

/**
 * Builds an empty parameter from the passed parameter type
 *
 * @param parameterType sefl expl.
 */
const parameterTypeToEmptyParameter = parameterType => ({
  name: parameterType.name,
  value: null,
  dynamic: false,
})

/**
 * Initializes an array of empty parameters from the passed types list.
 *
 * @param pluginParameterTypeList the array of plugn parameterType
 */
const buildEmptyParameterList = pluginParameterTypeList => map(pluginParameterTypeList, parameterTypeToEmptyParameter)

export {
  mapPluginParameterToPluginParameterType,
  extractUniqueTypesFromConfiguration,
  buildEmptyParameterList,
}
