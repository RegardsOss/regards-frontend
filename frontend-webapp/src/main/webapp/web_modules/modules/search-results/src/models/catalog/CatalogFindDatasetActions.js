/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicActions } from '@regardsoss/store-utils'

const { CALL_API, getJSON } = require('redux-api-middleware')

/**
 * actions to find a dataset by IP ID
 */
class CatalogDatasetEntityActions extends BasicActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/datasets/{ipId}`,
      bypassErrorMiddleware: true,
    })
    this.REQUEST = 'request'
    this.SUCCESS = 'success'
    this.FAILURE = 'failure'
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

const instance = new CatalogDatasetEntityActions()
export default instance
