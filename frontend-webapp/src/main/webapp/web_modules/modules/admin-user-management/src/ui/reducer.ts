import { SELECT_PROJECT_USER } from "./actions"

export default (state: Object = {}, action: any) => {
  switch (action.type) {
    case SELECT_PROJECT_USER:
      return Object.assign({}, state)
    default:
      return state
  }
}
