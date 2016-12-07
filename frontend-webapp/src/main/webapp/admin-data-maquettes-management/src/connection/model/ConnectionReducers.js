import { ADD_CONNECTION } from './ConnectionActions'

const predefinedValues = {
  1: {
    id: 1,
    name: 'Roger - PostgreSQL',
    pluginName: 'postgresql',
    requiredAttributes: {
      address: 'http://roger.cnes.fr',
      password: 'password',
      port: '12345',
      username: 'root',
    },
  },
}

export default (state = {
  isFetching: false,
  items: predefinedValues, // TODO -> should be empty here
  lastUpdate: '',
}, action) => {
  switch (action.type) {
    case ADD_CONNECTION:
      const newState = Object.assign({}, state)
      newState.items[action.entity.id] = action.entity
      return newState
    default:
      return state
  }
}
