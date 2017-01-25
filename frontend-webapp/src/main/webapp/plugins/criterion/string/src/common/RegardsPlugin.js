/**
 * LICENSE_PLACEHOLDER
 **/

// Init the regards plugin in the application.
// The plugin is added to the application store to be used by the application.
const initPlugin = (pluginName, pluginClass, reducer, messages, pluginInfo) => {
  const event = new CustomEvent('plugin', {
    detail: {
      name: pluginName,
      plugin: pluginClass,
      messages,
      reducer,
      info: pluginInfo,
    },
  })
  console.log("Plugin event dispatched",event)
  document.dispatchEvent(event)
}

export { initPlugin }
