/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { defaultTheme } from '@regardsoss/model'

class ThemeSelectors extends BasicPageableSelectors {
  constructor() {
    super(['common', 'theme', 'list'])
  }

  getById(state, id) {
    try {
      return this.uncombineStore(state).items[id]
    } catch(e) {
      return defaultTheme
    }
  }
}

const instance = new ThemeSelectors()
export default instance
