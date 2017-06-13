/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'


export default class DatasetValidSubsettingTestActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/datasets/isValidSubsetting`,
      bypassErrorMiddleware: true,
    })
  }
}
