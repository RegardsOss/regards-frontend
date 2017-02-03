/**
 * LICENSE_PLACEHOLDER
 **/
import { merge, union, forEach, find } from 'lodash'
import containerTypes from './default/containerTypes'

/**
 * Helper to navigate into applications layouts containers
 * @author Sébastien Binda
 */
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

  /**
   * Retrieve all available containers from the given container
   * @param container
   * @returns {Array}
   */
  static getAvailableContainersInLayout(container) {
    let containers = []
    if (container && container.id) {
      containers.push(container.id)
      if (container.containers && container.containers.length > 0) {
        forEach(container.containers, (c) => {
          containers = union(ContainerHelper.getAvailableContainersInLayout(c), containers)
        })
      }
    }

    return containers
  }

  /**
   * Define if the given containerName is a dynamic container from the given list of containers
   * @param containerName
   * @param containers
   * @returns {boolean}
   */
  static isDynamicContent(containerName, containers) {
    const dynamicContainer = find(containers, (container, idx) => {
      if (container.id === containerName) {
        return container.dynamicContent
      } else if (container.containers) {
        return this.isDynamicContent(containerName, container.containers)
      }
      return false
    })
    if (dynamicContainer) {
      return true
    }
    return false
  }


}

export default ContainerHelper
