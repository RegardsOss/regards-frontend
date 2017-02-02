/**
 * LICENSE_PLACEHOLDER
 **/
import { chain, find } from 'lodash'

/**
 * TODO
 *
 * @param pluginParameter
 * @param pluginMetaData
 * @returns {*}
 */
const mapPluginParameterToPluginParameterType = (pluginParameter, pluginMetaData) => {
  let pluginParameterType
  if (pluginMetaData) {
    pluginParameterType = find(pluginMetaData.content.parameters, el => el.name === pluginParameter.name)
  }
  return pluginParameterType
}

/**
 * TODO
 *
 * @param pluginConfiguration
 * @param pluginMetaData
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
 * TODO
 *
 * @param parameterType
 */
const parameterTypeToEmptyParameter = parameterType => ({
  id: null,
  name: parameterType.name,
  value: null,
  dynamic: false,
  dynamicsValues: null,
})

export {
  mapPluginParameterToPluginParameterType,
  extractUniqueTypesFromConfiguration,
  parameterTypeToEmptyParameter
}
