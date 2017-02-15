/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class ThemeSelectors extends BasicPageableSelectors {
  constructor() {
    super(['common', 'theme', 'list'])
  }
}

const instance = new ThemeSelectors()
export default instance
