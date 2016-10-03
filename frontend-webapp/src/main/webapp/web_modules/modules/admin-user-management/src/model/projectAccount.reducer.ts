import { PROJECT_ACCOUNT_REQUEST, PROJECT_ACCOUNT_SUCCESS, PROJECT_ACCOUNT_FAILURE } from "./actions"
import { ApiStateResult, NormalizedAction,  ProjectAccount } from "@regardsoss/models"

export default (state: ApiStateResult<ProjectAccount> = {
  isFetching: false,
  items: [],
  ids: [],
  lastUpdate: ''
}, action: NormalizedAction) => {
  switch (action.type) {
    case PROJECT_ACCOUNT_REQUEST:
      return Object.assign({}, state, { isFetching: true })
    case PROJECT_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.entities.projectAccounts,
        ids: []
      })
    case PROJECT_ACCOUNT_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    default:
      return state
  }
}

