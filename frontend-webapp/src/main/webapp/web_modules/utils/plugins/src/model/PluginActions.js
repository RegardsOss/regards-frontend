let scriptjs
if (typeof document !== 'undefined') {
  scriptjs = require('scriptjs')
}

export const PLUGIN_INITIALIZED = 'PLUGIN_INITIALIZED'

export const PLUGIN_LOADED = 'PLUGIN_LOADED'

export const pluginLoaded = (name, plugin) => ({
  type: PLUGIN_LOADED,
  name,
  plugin,
})

export const loadPlugin = (plugin, dispatchAction) => {
  // Listen for pluin initialization done
  document.addEventListener('plugin', (event) => {
    console.log('event received', event)
    dispatchAction(pluginLoaded(event.detail.name, event.detail.plugin))
  })

  if (typeof document !== 'undefined') {
    scriptjs([`${window.location.origin}/plugins/${plugin.sourcesPath}`], plugin.name)
  }
}
