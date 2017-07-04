/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Init the regards plugin in the application.
 * The plugin is added to the application store to be used by the application.
 *
 * @param pluginClass The main Plugin React Component
 * @param reducer The Redux-reducers or null if no one is defined
 * @param messages Object where key is the language and value is the list of messages used by the plugin
 * @param pluginInfo The plugin-info.json of the plugin. File containing plugin definition and configuration informations
 *
 * Usage :
 * From your main javascript file :
 * initPlugin(PluginComponent, pluginReducers, messages, pluginInfo)
 *
 * @author Sébastien Binda
 */
const initPlugin = (pluginClass, reducer, messages, pluginInfo) => {
  const event = new CustomEvent('plugin', {
    detail: {
      sourcePath: document.currentScript.src,
      plugin: pluginClass,
      messages,
      reducer,
      info: pluginInfo,
    },
  })
  document.dispatchEvent(event)
}

export { initPlugin }
