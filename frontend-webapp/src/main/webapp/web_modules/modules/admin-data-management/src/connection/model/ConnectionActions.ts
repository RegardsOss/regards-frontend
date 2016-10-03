// Add a new model
export const ADD_CONNECTION = 'ADD_CONNECTION'

export const addConnection = (name: string, pluginName: string, requiredAttributes: {[index: string]: string}) => ({
  type: ADD_CONNECTION,
  entity: {
    id: Math.floor(Math.random() * 60) + 10, // stub
    name,
    pluginName,
    requiredAttributes
  }
})
