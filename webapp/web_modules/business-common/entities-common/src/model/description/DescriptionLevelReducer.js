/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import DescriptionLevelActions from './DescriptionLevelActions'

/**
 * Description level reducer: provides the currentDescriptionPath to component.
 * Use: when empty, the component is not visible. Otherwise, the component is visible on the last path element.
 * Elements are stored by their ipId to be loaded on need
 */
export class DescriptionLevelReducer {
  static DEFAULT_STATE = {
    currentDescriptionPath: null,
    tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES,
  }

  constructor(namespace) {
    this.actionsModel = new DescriptionLevelActions(namespace)
  }

  /**
   * Builds new path for entity as parameter: if entity is not in path, add it at end, blocks adding it otherwise
   */
  buildNewPath = (currentPath, entity) =>
    currentPath.find(e => isEqual(e, entity)) ?
      currentPath : // block an entity already in path
      [...currentPath, entity]

  /**
   * Reducer for description levels (sort of breadcrumb controlling the component visibility)
   */
  reduce(state = DescriptionLevelReducer.DEFAULT_STATE, action) {
    switch (action.type) {
      case this.actionsModel.SHOW:
        // shows the root entity
        return {
          currentDescriptionPath: [action.entity],
          tab: action.tab,
        }
      case this.actionsModel.SHOW_RELATED_ENTITY:
        if (!state.currentDescriptionPath) {
          throw new Error('No root path element')
        }
        return {
          currentDescriptionPath: this.buildNewPath(state.currentDescriptionPath, action.entity),
          tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES,
        }
      case this.actionsModel.CHANGE_TAB:
        return {
          currentDescriptionPath: state.currentDescriptionPath,
          tab: action.tab,
        }
      case this.actionsModel.JUMP_TO_LEVEL:
        if (action.levelIndex === state.currentDescriptionPath.length - 1) {
          // do not handle the 'jump to' the last level, already shown
          return state
        }
        if (!state.currentDescriptionPath) {
          throw new Error('Cannot jump to a new level when no path is set up!')
        }
        if (action.levelIndex < 0 || action.levelIndex >= state.currentDescriptionPath.length) {
          throw new Error('Jump to level forbidden: level index outside the current path range', action.levelIndex, state.currentDescriptionPath)
        }
        return { // remove the levels that are after selected one
          currentDescriptionPath: state.currentDescriptionPath.slice(0, action.levelIndex + 1),
          tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES,
        }
      case this.actionsModel.HIDE:
        return DescriptionLevelReducer.DEFAULT_STATE
      default:
        return state
    }
  }
}

/**
 * Returns reduce function instance for a given namespace
 * @param {*} namespace namespace
 */
export default function getDescriptionLevelReducer(namespace) {
  const reducer = new DescriptionLevelReducer(namespace)
  return function reduce(state, action) {
    return reducer.reduce(state, action)
  }
}

