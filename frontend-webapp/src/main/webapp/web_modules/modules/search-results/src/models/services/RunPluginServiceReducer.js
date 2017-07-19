/**
* LICENSE_PLACEHOLDER
**/
import runPluginServiceActions from './RunPluginServiceActions'

/**
 * Default state
 */
export const DEFAULT_STATE = {
  runningService: null, // currently running service
  target: null, // currently running service target
}

const reduce = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case runPluginServiceActions.RUN_SERVICE:
      return {
        ...state,
        runningService: action.service,
        target: action.target,
      }
    case runPluginServiceActions.CLOSE_SERVICE:
      return {
        ...state,
        runningService: null,
        target: null,
      }
    default:
      return state
  }
}

export default reduce
