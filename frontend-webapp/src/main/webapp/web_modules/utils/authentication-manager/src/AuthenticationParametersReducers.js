/**
* LICENSE_PLACEHOLDER
**/
import AuthenticationParametersActions from './AuthenticationParametersActions'

export const PATH = 'project'

export default (state = '', action) => {
  switch (action.type) {
    case AuthenticationParametersActions.APPLICATION_STARTED:
      return action.project
    default:
      return state
  }
}
