/**
 * @author Léo Mieulet
 */
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
   * Fetch the corresponding route using your verb, body param and url parameters
   * @param verb
   * @param bodyParam
   * @param params
   * @returns {{}}
   */
  sendSignal(verb, bodyParam, params) {
    const endpoint = this.handleRequestParameters(this.entityEndpoint, params)
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
        body: bodyParam ? JSON.stringify(bodyParam) : undefined,
      },
    }
  }
}


export default BasicSignalActions
