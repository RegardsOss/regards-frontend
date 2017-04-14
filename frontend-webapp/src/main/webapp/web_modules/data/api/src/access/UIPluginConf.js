/**
 * LICENSE_PLACEHOLDER
 **/
import { Schema, arrayOf } from 'normalizr'

const UIPluginConfConfiguration = {
  entityKey: 'id',
  normalizrKey: 'ui-plugin-configuration',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const UIPluginConfSchema = new Schema(UIPluginConfConfiguration.normalizrKey, {
  idAttribute: plugin =>
    plugin.content[UIPluginConfConfiguration.entityKey],
  assignEntity(output, key, value, input) {
    if (value && value.conf) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.conf = JSON.parse(value.conf)
      } catch (e) {
        console.error(`Failed to parse UIPluginConfiguration with id[${value.id}] for plugin id[${value.pluginId}]: ${e}`)
      }
    }
  },
})

// Schemas for API responses.
export default {
  UI_PLUGIN_CONFIGURATION: UIPluginConfSchema,
  UI_PLUGIN_CONFIGURATION_ARRAY: arrayOf(UIPluginConfSchema),
  UIPluginConfConfiguration,
}
