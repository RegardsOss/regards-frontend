declare module "@regardsoss/plugins" {

  export interface PluginType {
    name: string
    loadedComponent: React.ComponentClass<any>
    paths: Array<string>
  }

  export interface PluginsStore {
    isFetching: boolean
    items: Array<PluginType>
    lastUpdate: string
  }

  export const PluginComponent: any
  export const PluginComponentUnconnected: any
  export const PluginReducer: any
  export const PluginActions: any
}

