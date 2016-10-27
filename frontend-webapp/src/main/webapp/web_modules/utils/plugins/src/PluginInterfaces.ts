
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