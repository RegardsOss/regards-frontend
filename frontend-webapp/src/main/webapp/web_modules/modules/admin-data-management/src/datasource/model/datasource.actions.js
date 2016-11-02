// Add a new model
export const ADD_DATASOURCE = 'ADD_DATASOURCE';

export const addDatasource = (connectionId, modelObjectId, pluginDatasourceId, name) => ({
  type: ADD_DATASOURCE,
  entity: {
    id: Math.floor(Math.random() * 60) + 10, // stub
    connectionId,
    modelObjectId,
    pluginDatasourceId,
    name,
  },
});
