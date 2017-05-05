/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Profile edition dialog selectors
 */
class ProfileDialogSelectors extends BasicSelector {
  constructor() {
    super(['modules.menu', 'profileDialog'])
  }

  isProfileEditionVisible = state => this.uncombineStore(state).profileEditionVisible

}


export default new ProfileDialogSelectors()
