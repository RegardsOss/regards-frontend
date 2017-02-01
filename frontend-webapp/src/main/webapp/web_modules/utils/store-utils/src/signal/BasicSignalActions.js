/**
 * @author Léo Mieulet
 */
import { map, replace } from 'lodash'

const { CALL_API, getJSON } = require('redux-api-middleware')
/**
 *  Provide actions for calling any url of the backend
 *  @Return dispatcheable redux actions
 */
class BasicSignalActions {

  constructor(options) {
    this.entityEndpoint = options.entityEndpoint
    this.verb = options.verb
    this.SIGNAL_REQUEST = `${options.namespace}/REQUEST`
    this.SIGNAL_SUCCESS = `${options.namespace}/SUCCESS`
    this.SIGNAL_FAILURE = `${options.namespace}/FAILURE`
  }

  /**
   * Replace parameterized value in the current configured endpoint
   * @param entityEndpoint endpoint entity
   * @param params parameters to replace in the endpoint entity
   * @returns {*}
   */
  handleRequestParameters = (entityEndpoint, params) => {
    let endpoint = entityEndpoint
    if (params) {
      map(params, (param, key) => {
        endpoint = replace(endpoint, `{${key}}`, param)
      })
    }
    return endpoint
  }

  /**
   * Fetch entities
   *
   * @param bodyParam
   * @returns {{}}
   */
  sendSignal(bodyParam, params) {
    const endpoint = this.handleRequestParameters(this.entityEndpoint, params)
    return {
      [CALL_API]: {
        types: [
          this.SIGNAL_REQUEST,
          {
            type: this.SIGNAL_SUCCESS,
            payload: (action, state, res) => getJSON(res),
          },
          this.SIGNAL_FAILURE,
        ],
        endpoint,
        method: this.verb,
        body: bodyParam ? JSON.stringify(bodyParam) : undefined,
      },
    }
  }
}


export default BasicSignalActions
