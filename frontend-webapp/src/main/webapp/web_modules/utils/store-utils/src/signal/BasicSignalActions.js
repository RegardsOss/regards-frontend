/**
 * LICENSE_PLACEHOLDER
 */
/**
 * @author Léo Mieulet
 */
import { isEmpty } from 'lodash'
import BasicActions from '../BasicActions'

const { CALL_API, getJSON } = require('redux-api-middleware')
/**
 *  Provide actions for calling any url of the backend
 *  @Return dispatcheable redux actions
 */
class BasicSignalActions extends BasicActions {

  constructor(options) {
    super(options)
    this.SIGNAL_REQUEST = `${options.namespace}/REQUEST`
    this.SIGNAL_SUCCESS = `${options.namespace}/SUCCESS`
    this.SIGNAL_FAILURE = `${options.namespace}/FAILURE`
  }

  /**
   * Fetch the corresponding route using your verb, body, path and query parameters
   * @param verb
   * @param bodyParam
   * @param pathParams
   * @param callApi method,
   * @returns {{}}
   */
  sendSignal(verb, bodyParam, pathParams, queryParams, callApi = (endpoint, verb2, body) => this.doCallApi(endpoint, verb2, body)) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)
    let body
    if (!isEmpty(bodyParam)) {
      if (verb === 'GET') {
        throw new Error('There should be no body parameter on GET method')
      }
      body = JSON.stringify(bodyParam)
    }
    return {
      [CALL_API]: {
        types: [
          this.SIGNAL_REQUEST,
          {
            type: this.SIGNAL_SUCCESS,
            payload: (action, state, res) => getJSON(res),
          },
          this.buildFailureAction(this.SIGNAL_FAILURE),
        ],
        endpoint,
        method: verb,
        body,
      },
    }
  }

}


export default BasicSignalActions
