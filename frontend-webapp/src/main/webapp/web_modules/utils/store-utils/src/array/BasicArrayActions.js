/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * @author Léo Mieulet
 */
import ErrorHandler from '../ErrorHandler'

const { CALL_API, getJSON } = require('redux-api-middleware')
/**
 *  Provide actions to retrieve an array of value
 *  @Return dispatcheable redux actions
 */
class BasicArrayActions {

  constructor(options) {
    this.entityEndpoint = options.entityEndpoint
    this.ENTITY_LIST_REQUEST = `${options.namespace}/LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/LIST_FAILURE`
    this.errorHandler = new ErrorHandler()
  }

  fetchEntityList(dispatch) {
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          {
            type: this.ENTITY_LIST_SUCCESS,
            payload: (action, state, res) => getJSON(res),
          },
          {
            type: this.ENTITY_LIST_FAILURE,
            meta: (action, state, res) => this.errorHandler.onRequestFailure(dispatch, action, state, res),
          },
        ],
        endpoint: this.entityEndpoint,
        method: 'GET',
      },
    }
  }
}


export default BasicArrayActions
