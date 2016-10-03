// Add a new model
export const ADD_PROJECT = 'ADD_DATASOURCE'

export const addDatasource = (connectionId: number, modelObjectId: number, pluginDatasourceId: number, name: string) => ({
  type: ADD_PROJECT,
  entity: {
    id: Math.floor(Math.random() * 60) + 10, // stub
    connectionId,
    modelObjectId,
    pluginDatasourceId,
    name
  }
})
