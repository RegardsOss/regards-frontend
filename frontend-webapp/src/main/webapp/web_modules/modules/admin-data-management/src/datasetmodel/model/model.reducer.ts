import { ADD_DATASET_MODEL } from "./model.actions"

const predefinedValues: any = {
  1: {
    name: "CDPP_DATASET",
    id: 1,
    attributes: [{
      name: "MIN_LATITUDE",
      computed: false,
      type: "string"
    }, {
      name: "MIN_ALTITUDE",
      computed: false,
      type: "string"
    }, {
      name: "MAX_ALTITUDE",
      computed: false,
      type: "string"
    }, {
      name: "PROCESSING_LEVEL",
      computed: false,
      type: "string"
    }]
  }
}

export default (state: any = {
  isFetching: false,
  items: predefinedValues, // TODO -> should be empty here
  lastUpdate: ''
}, action: any) => {
  switch (action.type) {
    case ADD_DATASET_MODEL:
      let newState = Object.assign({}, state)
      newState.items[action.entity.id] = action.entity
      return newState
    default:
      return state
  }
}
