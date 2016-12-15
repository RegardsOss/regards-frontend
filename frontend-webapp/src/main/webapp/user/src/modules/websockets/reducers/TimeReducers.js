import { START_TIME_SUCCESS } from '../actions/TimeActions'
import { SET_TIME } from '../actions/WSTimeActions'

export default (state = {
  started: false,
  time: '',
}, action) => {
  switch (action.type) {
    case START_TIME_SUCCESS:
      return Object.assign({}, state, {
        started: true,
      })
    case SET_TIME:
      return Object.assign({}, state, {
        time: action.time,
      })
    default:
      return state
  }
}
