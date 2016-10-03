import { ADD_PROJECT } from "./ProjectActions"

const predefinedValues: any = {
  1: {
    id: 1,
    connectionId: 1,
    modelObjectId: 1,
    pluginDatasourceId: 1,
    name: "Datasource #1"
  }
}

export default (state: any = {
  isFetching: false,
  items: predefinedValues, // TODO -> should be empty here
  lastUpdate: ''
}, action: any) => {
  switch (action.type) {
    case ADD_PROJECT:
      let newState = Object.assign({}, state)
      newState.items[action.entity.id] = action.entity
      return newState
    default:
      return state
  }
}
