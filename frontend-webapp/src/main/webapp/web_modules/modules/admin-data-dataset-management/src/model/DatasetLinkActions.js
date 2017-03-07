import { BasicSignalActions } from '@regardsoss/store-utils'

class DatasetLinkActions extends BasicSignalActions {
  constructor() {
    super({
      namespace: 'admin-data-dataset-management/dataset-link',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/datasets/{dataset_id}/{operation}`,
    })
  }
}

const instance = new DatasetLinkActions()
export default instance
