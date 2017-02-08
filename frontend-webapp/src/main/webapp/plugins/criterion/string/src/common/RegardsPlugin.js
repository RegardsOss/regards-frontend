/**
 * LICENSE_PLACEHOLDER
 **/

// Init the regards plugin in the application.
// The plugin is added to the application store to be used by the application.
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
