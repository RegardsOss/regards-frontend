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
  flow( // For all parameters of the defined configuration
    fpmap(pluginParameter => mapPluginParameterToPluginParameterType(pluginParameter, pluginMetaData)), // get their parameter type
    fpcompact(),
    fpfilter(pluginParameterType => pluginParameterType.paramType === 'PLUGIN'), // only keep the 'PLUGIN'
    fpmap(pluginParameterType => pluginParameterType.type), // get the java type ('fr.cnes.regards.IComplexInterface)
    fpuniqBy(pluginParameterType => pluginParameterType.name), // remove doubles
  )(pluginConfiguration && pluginConfiguration.content.parameters)

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
