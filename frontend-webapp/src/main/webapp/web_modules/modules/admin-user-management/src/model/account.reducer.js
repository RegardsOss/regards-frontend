import { PROJECT_ACCOUNT_REQUEST, PROJECT_ACCOUNT_SUCCESS, PROJECT_ACCOUNT_FAILURE } from './projectAccount.actions'

export default (state = {
  isFetching: false,
  items: [],
  ids: [],
  lastUpdate: '',
}, action) => {
  switch (action.type) {
    case PROJECT_ACCOUNT_REQUEST:
      return Object.assign({}, state, { isFetching: true })
    case PROJECT_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.entities.accounts,
        ids: [],
      })
    case PROJECT_ACCOUNT_FAILURE:
      return Object.assign({}, state, { isFetching: false })
    default:
      return state
  }
}
