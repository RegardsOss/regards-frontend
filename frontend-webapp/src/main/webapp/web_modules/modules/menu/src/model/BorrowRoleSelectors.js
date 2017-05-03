/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalSelectors } from '@regardsoss/store-utils'
import { PATH } from './BorrowRoleReducer'

class BorrowRoleSelectors extends BasicSignalSelectors {
  constructor() {
    super(['modules.menu', PATH])
  }
}

export default new BorrowRoleSelectors()
