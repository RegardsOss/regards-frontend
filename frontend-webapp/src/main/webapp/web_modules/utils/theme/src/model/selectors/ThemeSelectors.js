/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListSelectors } from '@regardsoss/store-utils'

class ThemeSelectors extends BasicListSelectors {
  constructor() {
    super(['common', 'theme', 'list'])
  }
}

const instance = new ThemeSelectors()
export default instance
