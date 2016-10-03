import { REQUEST_ACCESSRIGHTS, RECEIVE_ACCESSRIGHTS, FAILED_ACCESSRIGHTS } from "./AccessRightsActions"
import * as Immutable from "immutable"

export default (state: any = {
  isFetching: false,
  items: []
}, action: any) => {
  let newState = Immutable.fromJS(state).toJS()
  switch (action.type) {
    case REQUEST_ACCESSRIGHTS:
      newState.isFetching = true
      return newState
    case RECEIVE_ACCESSRIGHTS:
      newState.isFetching = false
      newState.items = newState.items.concat(action.payload)
      return newState
    case FAILED_ACCESSRIGHTS:
      newState.isFetching = false
      return newState
    default:
      return state
  }
}
