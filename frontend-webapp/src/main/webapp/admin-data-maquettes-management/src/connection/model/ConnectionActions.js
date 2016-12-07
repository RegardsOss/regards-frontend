// Add a new model
export const ADD_CONNECTION = 'ADD_CONNECTION'

export const addConnection = (name, pluginName, requiredAttributes) => ({
  type: ADD_CONNECTION,
  entity: {
    id: Math.floor(Math.random() * 60) + 10, // stub
    name,
    pluginName,
    requiredAttributes,
  },
})
