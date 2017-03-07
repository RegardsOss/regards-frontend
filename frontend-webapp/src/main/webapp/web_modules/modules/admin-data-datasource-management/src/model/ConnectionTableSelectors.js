/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalSelectors } from '@regardsoss/store-utils'

class ConnectionTableSelectors extends BasicSignalSelectors {
  constructor() {
    super(['admin', 'data-management', 'datasource', 'connection-table'])
  }
}

const instance = new ConnectionTableSelectors()
export default instance
