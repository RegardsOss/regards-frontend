/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicActions } from '@regardsoss/store-utils'

const { CALL_API, getJSON } = require('redux-api-middleware')

/**
 * Actions to find a dataset by its IP ID
 */
export default class CatalogDatasetEntityActions extends BasicActions {

  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/datasets/{ipId}`,
      bypassErrorMiddleware: true,
    })
    this.REQUEST = `${namespace}/request`
    this.SUCCESS = `${namespace}/success`
    this.FAILURE = `${namespace}/failure`
  }

  findDataset(ipId) {
    const endpoint = this.handleRequestPathParameters(this.entityEndpoint, { ipId })
    return {
      [CALL_API]: {
        types: [
          this.REQUEST,
          {
            type: this.SUCCESS,
            payload: (action, state, res) => getJSON(res),
          },
          this.buildFailureAction(this.FAILURE),
        ],
        endpoint,
        headers: this.headers,
        method: 'GET',
      },
    }
  }

}
