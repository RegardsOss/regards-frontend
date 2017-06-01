import { BasicSignalActions } from '@regardsoss/store-utils'

export default class DatasetLinkActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/datasets/{dataset_id}/{operation}`,
    })
  }
}
