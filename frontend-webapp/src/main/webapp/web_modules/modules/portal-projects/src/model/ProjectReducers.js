/**
 * LICENSE_PLACEHOLDER
 **/
import { ADD_PROJECT } from './ProjectActions'

const predefinedValues = {
  1: {
    id: 1,
    connectionId: 1,
    modelObjectId: 1,
    pluginDatasourceId: 1,
    name: 'Datasource #1',
  },
}

function addProject(state, action) {
  const newState = Object.assign({}, state)
  newState.items[action.entity.id] = action.entity
  return newState
}

export default (state = {
  isFetching: false,
  items: predefinedValues, // TODO -> should be empty here
  lastUpdate: '',
}, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return addProject(state, action)
    default:
      return state
  }
}
