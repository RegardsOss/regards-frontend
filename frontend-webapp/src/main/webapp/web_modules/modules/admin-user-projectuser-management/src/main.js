import projectUserManagementRouter from './router'
import projectUserManagementReducer from './reducer'
import WaitingAccessProjectUserActions from './model/WaitingAccessProjectUserActions'
import WaitingAccessProjectUserSelectors from './model/WaitingAccessProjectUserSelectors'

export default {
  projectUserManagementReducer,
  projectUserManagementRouter,
  // expose module elements used externally
  WaitingAccessProjectUserActions,
  WaitingAccessProjectUserSelectors,

}
