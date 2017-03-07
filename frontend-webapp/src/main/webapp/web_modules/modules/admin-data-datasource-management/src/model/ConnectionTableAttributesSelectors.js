/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalSelectors } from '@regardsoss/store-utils'

class ConnectionTableAttributesSelectors extends BasicSignalSelectors {
  constructor() {
    super(['admin', 'data-management', 'datasource', 'connection-table-attributes'])
  }
}

const instance = new ConnectionTableAttributesSelectors()
export default instance
