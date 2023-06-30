/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import merge from 'lodash/merge'
import union from 'lodash/union'
import unionBy from 'lodash/unionBy'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import concat from 'lodash/concat'
import cloneDeep from 'lodash/cloneDeep'
import flattenDeep from 'lodash/flattenDeep'
import { ALL_CONTAINERS } from './default/ContainerTypes'

/**
 * Recursion function for "getAllContainersInLayout" method defined next
 */
const visit = (container) => {
  const result = [container]
  if (Array.isArray(container.containers)) {
    result.push(container.containers.map(visit))
  }
  return result
}

/**
 * Retrieves recursively all containers in given layout as a flattened array
 */
const getAllContainersInLayout = (layout) => flattenDeep(layout.containers.map(visit))

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
    if (ALL_CONTAINERS[pContainer.type]) {
      return union([], ALL_CONTAINERS[pContainer.type].classes, pContainer.classes)
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
    if (ALL_CONTAINERS[pContainer.type]) {
      return merge({}, ALL_CONTAINERS[pContainer.type].styles, pContainer.styles)
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
  static getAvailableContainersInLayout(container, hideMainContainer) {
    let containers = []
    if (container) {
      if (!hideMainContainer || container.type !== 'MainContainer') {
        containers.push(container)
      }
      if (container.containers && container.containers.length > 0) {
        forEach(container.containers, (c) => {
          containers = unionBy(ContainerHelper.getAvailableContainersInLayout(c), containers, 'id')
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
      }
      if (container.containers) {
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
    for (let i = 0; i < containers.length; i += 1) {
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

  /**
   * In a layout, only one container is allowed to be dynamic
   * If the given container is dynamic, make all other containers static
   *
   * @param {Container} container (out param) The current container
   * @param {Layout} layout (out param) The layout containing all containers
   */
  static selectDynamicContainerInLayout(container, layout) {
    if (container.dynamicContent) {
      // eslint-disable-next-line no-param-reassign
      getAllContainersInLayout(layout).forEach((cont) => { cont.dynamicContent = false })
      // eslint-disable-next-line no-param-reassign
      container.dynamicContent = true
    }
  }
}

export default ContainerHelper
