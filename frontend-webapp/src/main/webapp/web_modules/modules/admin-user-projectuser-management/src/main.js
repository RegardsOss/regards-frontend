import projectUserManagementRouter from './router'
import projectUserManagementReducer from './reducer'
import WaitingAccessUsersFetchActions from './model/WaitingAccessUsersFetchActions'
import WaitingAccessUsersFetchSelectors from './model/WaitingAccessUsersFetchSelectors'

export default {
  projectUserManagementReducer,
  projectUserManagementRouter,
  // expose module elements used externally
  WaitingAccessUsersFetchActions,
  WaitingAccessUsersFetchSelectors,

}
