/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Actions to find a dataset by its IP ID
 */
export default class FindDatasetActions extends BasicSignalActions {

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
    return this.sendSignal('GET', null, { ipId })
  }

}
