/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListSelectors } from '@regardsoss/store-utils'
import { PATH } from './BorrowableRolesReducers'


class BorrowableListSelectors extends BasicListSelectors {
  constructor() {
    super(['modules.menu', PATH])
  }
}


export default new BorrowableListSelectors()
