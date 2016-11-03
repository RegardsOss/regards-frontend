import { ADD_DATASET } from './dataset.actions'

function addDataset(state, action) {
  const newState = Object.assign({}, state)
  newState.items[action.entity.id] = action.entity
  return newState
}
export default (state = {
  isFetching: false,
  items: {},
  lastUpdate: '',
}, action) => {
  switch (action.type) {
    case ADD_DATASET:
      return addDataset(state, action)
    default:
      return state
  }
}
