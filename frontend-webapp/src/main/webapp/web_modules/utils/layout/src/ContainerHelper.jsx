/**
 * LICENSE_PLACEHOLDER
 **/
import { merge, union } from 'lodash'
import containerTypes from './default/containerTypes'

class ContainerHelper {
  /*
   * Retrieve class names for the given container
   * @param pContainer container to retrieve classes names
   * @return [*] String with all classes name separated with ' '
   */
  static getContainerClassNames(pContainer) {
    if (containerTypes[pContainer.type]) {
      return union([], containerTypes[pContainer.type].classes, pContainer.classes)
    }

    if (pContainer.classes) {
      return pContainer.classes
    }
    return []
  }

  /*
   * Retrieve inline styles for the given container
   * @param pContainer container to retrieve styles names
   * @return [*] list of styles names
   */
  static getContainerStyles(pContainer) {
    if (containerTypes[pContainer.type]) {
      return merge({}, containerTypes[pContainer.type].styles, pContainer.styles)
    }

    if (pContainer.styles) {
      return pContainer.styles
    }
    return {}
  }


}

export default ContainerHelper
