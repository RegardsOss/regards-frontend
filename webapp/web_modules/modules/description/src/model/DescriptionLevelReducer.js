/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import last from 'lodash/last'
import isEqual from 'lodash/isEqual'
import DescriptionLevelActions from './DescriptionLevelActions'
import { DESCRIPTION_TABS_ENUM, getAvailableTabs } from './DescriptionTabsEnum'

/**
 * Description level reducer: provides the currentDescriptionPath to component.
 * Use: when showing description, this model state must be initialize to hold the first entity to show in path.
 * @author Raphaël Mechali
 */
export class DescriptionLevelReducer {
  static DEFAULT_STATE = {
    currentDescriptionPath: [],
    currentTab: null,
  }

  constructor() {
    this.actionsModel = new DescriptionLevelActions()
  }

  /**
   * Builds new path for entity as parameter: if entity is not in path, add it at end, blocks adding it otherwise
   */
  buildNewPath = (currentPath, entity) => currentPath.find(e => isEqual(e, entity))
    ? currentPath // block an entity already in path
    : [...currentPath, entity]

  /**
   * Selects initial tab for entity as parameter
   * @param {Entity} entity entity
   * @return {string} initially selected tab, from DESCRIPTION_TABS_ENUM values
   */
  selectInitialTab = entity => last(getAvailableTabs(entity))

  /**
   * Reducer for description levels (sort of breadcrumb controlling the component visibility)
   */
  reduce(state = DescriptionLevelReducer.DEFAULT_STATE, action) {
    switch (action.type) {
      case this.actionsModel.INITIALIZE_CONTEXT:
        return {
          currentDescriptionPath: [action.entity],
          currentTab: this.selectInitialTab(action.entity),
        }
      case this.actionsModel.CLOSE:
        return DescriptionLevelReducer.DEFAULT_STATE
      case this.actionsModel.SHOW_RELATED_ENTITY:
        if (!state.currentDescriptionPath.length) {
          throw new Error('No root path element')
        }
        return {
          currentDescriptionPath: this.buildNewPath(state.currentDescriptionPath, action.entity),
          currentTab: this.selectInitialTab(action.entity),
        }
      case this.actionsModel.JUMP_TO_LEVEL:
        if (action.levelIndex === state.currentDescriptionPath.length - 1) {
          // do not handle the 'jump to' the last level, already shown
          return state
        }
        if (!state.currentDescriptionPath.length) {
          throw new Error('Cannot jump to a new level when no path is set up!')
        }
        if (action.levelIndex < 0 || action.levelIndex >= state.currentDescriptionPath.length) {
          throw new Error('Jump to level forbidden: level index outside the current path range', action.levelIndex, state.currentDescriptionPath)
        }
        return {
          // remove the levels that are after selected one
          currentDescriptionPath: state.currentDescriptionPath.slice(0, action.levelIndex + 1),
          // previous tab: necessary property tab (as it was used to navigate to sub levels)
          currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES,
        }
      case this.actionsModel.CHANGE_TAB:
        return {
          currentDescriptionPath: state.currentDescriptionPath,
          currentTab: action.tab,
        }
      default:
        return state
    }
  }
}

/**
 * Returns reduce function instance
 */
export default function getDescriptionLevelReducer() {
  const reducer = new DescriptionLevelReducer()
  return function reduce(state, action) {
    return reducer.reduce(state, action)
  }
}
