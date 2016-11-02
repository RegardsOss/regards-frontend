import { ADD_DATASET } from "./dataset.actions"

export default (state: any = {
  isFetching: false,
  items: {},
  lastUpdate: ''
}, action: any) => {
  switch (action.type) {
    case ADD_DATASET:
      let newState = Object.assign({}, state)
      newState.items[action.entity.id] = action.entity
      return newState
    default:
      return state
  }
}
