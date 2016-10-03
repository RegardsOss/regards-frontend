import * as actions from "./EndpointActions"
import { pickBy } from "lodash"
import * as Immutable from "immutable"

export default (state: any = {
  isFetching: false,
  items: {},
  lastUpdate: ''
}, action: any) => {
  let newState = Immutable.fromJS(state).toJS()
  switch (action.type) {
    case actions.ENDPOINTS_REQUEST:
      newState.isFetching = true
      return newState
    case actions.ENDPOINTS_SUCCESS:
      newState.isFetching = false
      newState.items = action.payload
      return newState
    case actions.ENDPOINTS_FAILURE:
      newState.isFetching = false
      return newState
    case actions.ENDPOINTS_FAILURE:
      newState.isFetching = false
      return newState
    case actions.DELETE_ENDPOINT:
      newState.items = pickBy(newState.items, (value: string, key: string) => key !== action.id)
      return newState
    default:
      return state
  }
}
