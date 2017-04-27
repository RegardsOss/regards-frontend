/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import { BasicListSelectors } from '@regardsoss/store-utils'

/**
 * Redux store Selectors for Layout entities
 */
class LayoutsSelector extends BasicListSelectors {
  constructor() {
    super(['user', 'layout'])
  }

  getDynamicContainer(state, app) {
    const layout = this.getById(state, app)
    const mainContainer = layout.content.layout
    if (mainContainer) {
      return this.findDynamic(mainContainer)
    }
    return null
  }

  findDynamic(container) {
    if (!container.dynamicContent) {
      return find(container.containers, lcontainer => this.findDynamic(lcontainer))
    }
    return container
  }
}

const instance = new LayoutsSelector()
export default instance
