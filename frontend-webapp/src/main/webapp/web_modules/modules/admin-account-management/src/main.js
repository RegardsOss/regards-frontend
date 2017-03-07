import accountManagementRouter from './router'
import accountManagementReducer from './reducer'
import WaitingAccountEntitiesActions from './model/WaitingAccountEntitiesActions'
import WaitingAccountEntitiesSelectors from './model/WaitingAccountEntitiesSelectors'

export default {
  accountManagementReducer,
  accountManagementRouter,
  // expose module elements used externally
  WaitingAccountEntitiesActions,
  WaitingAccountEntitiesSelectors,
}
