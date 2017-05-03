/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSelector } from '@regardsoss/store-utils'
import { PATH } from './ProfileDialogReducer'

/**
 * Profile edition dialog selectors
 */
class ProfileDialogSelectors extends BasicSelector {
  constructor() {
    super(['modules.menu', PATH])
  }

  isProfileEditionVisible = state => this.uncombineStore(state).profileEditionVisible

}


export default new ProfileDialogSelectors()
