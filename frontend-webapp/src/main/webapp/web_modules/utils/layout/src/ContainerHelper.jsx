/**
 * LICENSE_PLACEHOLDER
 **/
import { merge, union, forEach, find, concat, cloneDeep } from 'lodash'
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

  /**
   * Remove a container from the given layout and return a new copy of the updated layout
   * @param containerName
   * @param layout
   * @returns {*}
   */
  static removeContainerFromLayout(containerName, layout) {
    const newLayout = cloneDeep(layout)
    newLayout.containers = this.removeContainerFromContainers(containerName, newLayout.containers)
    return newLayout
  }

  /**
   * Remove a container from the given containers list and return a new copy of the array
   * @param containerName
   * @param containers
   * @returns {*}
   */
  static removeContainerFromContainers(containerName, containers) {
    const newContainers = concat([], containers)
    let i = 0
    for (i = 0; i < containers.length; i += 1) {
      if (containers[i].id === containerName) {
        newContainers.splice(i, 1)
        break
      } else if (containers[i].containers) {
        newContainers[i].containers = this.removeContainerFromContainers(containerName, newContainers[i].containers)
      }
    }
    return newContainers
  }

  /**
   * Replace a container from the given layout and return a new copy of the updated layout
   * @param containerToReplace
   * @param layout
   * @returns {*}
   */
  static replaceContainerInLayout(containerToReplace, layout) {
    let newLayout = cloneDeep(layout)
    if (newLayout.id === containerToReplace.id) {
      newLayout = containerToReplace
    } else if (newLayout.containers) {
      newLayout.containers = this.replaceContainerInContainers(containerToReplace, newLayout.containers)
    }
    return newLayout
  }

  /**
   * Replace a container from the given containers list and return a new copy of the array
   * @param containerToReplace
   * @param containersList
   * @returns {*}
   */
  static replaceContainerInContainers(containerToReplace, containersList) {
    const newContainers = concat([], containersList)
    forEach(containersList, (container, idx) => {
      if (container.id === containerToReplace.id) {
        newContainers[idx] = containerToReplace
      } else if (container.containers) {
        newContainers[idx].containers = this.replaceContainerInContainers(containerToReplace, container.containers)
      }
    })
    return newContainers
  }

  /**
   * Add a container to the given layout and return a new copy of the updated layout
   * @param parentContainer
   * @param containerToAdd
   * @param layout
   * @returns {*}
   */
  static addContainerInLayout(parentContainer, containerToAdd, layout) {
    const newLayout = cloneDeep(layout)
    if (newLayout.id === parentContainer.id) {
      newLayout.containers.push(containerToAdd)
    } else if (newLayout.containers) {
      this.addContainerInContainers(parentContainer, containerToAdd, newLayout.containers)
    }
    return newLayout
  }

  /**
   * Add a container to the given containers list and return a new copy of the array
   * @param parentContainer
   * @param containerToAdd
   * @param containersList
   * @returns {*}
   */
  static addContainerInContainers(parentContainer, containerToAdd, containersList) {
    const newContainers = concat([], containersList)
    forEach(containersList, (container, idx) => {
      if (container.id === parentContainer.id) {
        if (container.containers) {
          container.containers.push(containerToAdd)
        } else {
          // eslint-disable-next-line no-param-reassign
          container.containers = [containerToAdd]
        }
      } else if (container.containers) {
        this.addContainerInContainers(parentContainer, containerToAdd, container.containers)
      }
    })
    return newContainers
  }


}

export default ContainerHelper
