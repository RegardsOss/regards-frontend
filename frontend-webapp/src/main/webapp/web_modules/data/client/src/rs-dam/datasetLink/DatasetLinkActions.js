import { BasicSignalActions } from '@regardsoss/store-utils'

export default class DatasetLinkActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/datasets/{dataset_id}/{operation}`,
    })
  }
}
