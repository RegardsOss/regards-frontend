import * as React from "react"
import { Action } from "redux"
const {CALL_API} = require('redux-api-middleware')
let scriptjs: any
if (typeof document !== 'undefined')
  scriptjs = require('scriptjs')

export const PLUGINS_API = 'http://localhost:8080/api/access/plugins'
export const REQUEST_PLUGINS = 'REQUEST_PLUGINS'
export const RECEIVE_PLUGINS = 'RECEIVE_PLUGINS'
export const FAILED_PLUGINS = 'FAILED_PLUGINS'

// Fetches plugins
export const fetchPlugins = () => ({
  [CALL_API]: {
    types: [
      REQUEST_PLUGINS,
      {
        type: RECEIVE_PLUGINS,
        meta: {receivedAt: Date.now()}
      },
      FAILED_PLUGINS
    ],
    endpoint: PLUGINS_API,
    method: 'GET'
  }
})

export const PLUGIN_INITIALIZED = 'PLUGIN_INITIALIZED'
export interface PluginInitializedAction extends Action {
  name: string
  loadedComponent: React.ComponentClass<any>,
  error: string
}
export const pluginInitialized = (name: string, plugin: React.ComponentClass<any>) => ({
  type: PLUGIN_INITIALIZED,
  name: name,
  loadedComponent: plugin,
  error: ''
})

export const intializePlugin = (paths: Array<string>, name: string, dispatchAction: (action: any) => void) => {
  // Listen for pluin initialization done
  document.addEventListener("plugin", (event: any) => {
    dispatchAction(pluginInitialized(event.detail.name, event.detail.app))
  })
  const pathsToLoad = paths.map(path => {
    return window.location.origin + "/plugins/" + path
  })

  if (typeof document !== 'undefined')
    scriptjs(pathsToLoad, name)
}
