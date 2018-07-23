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

/**
 * Description levels management actions
 * @author Raphaël Mechali
 */
export default class DescriptionLevelActions {
  constructor() {
    this.INITIALIZE_CONTEXT = 'DESCRIPTION/LEVEL/INITIALIZE_CONTEXT'
    this.CLOSE = 'DESCRIPTION/LEVEL/CLOSE'
    this.SHOW_RELATED_ENTITY = 'DESCRIPTION/LEVEL/SHOW_RELATED_ENTITY'
    this.JUMP_TO_LEVEL = 'DESCRIPTION/LEVEL/JUMP_TO_LEVEL'
    this.CHANGE_TAB = 'DESCRIPTION/LEVEL/CHANGE_TAB'
  }

  /**
   * Returns actions to initialize a new description navigation context
   * @param {CatalogEntity} entity entity to show (will be root of the new description context), null to hide
   * @return action to dispatch
   */
  initializeContext(entity) {
    return {
      type: this.INITIALIZE_CONTEXT,
      entity,
    }
  }

  /**
   * @return action to dispatch to close description window (disposes context)
   */
  closeDescription() {
    return {
      type: this.CLOSE,
    }
  }

  /**
   * Returns action to dispatch to show the description of an entity related to the currently shown one
   * @param {CatalogEntity} entity entity to show (will be the new last path element of context description breadcrumb)
   * @return action to dispatch
   */
  showRelatedEntity(entity) {
    return {
      type: this.SHOW_RELATED_ENTITY,
      entity,
    }
  }

  /**
   * Returns action to dispatch to jump to level as parameter
   * @param {number} levelIndex level index
   * @return action to dispatch
   */
  jumpToLevel(levelIndex) {
    return {
      type: this.JUMP_TO_LEVEL,
      levelIndex,
    }
  }

  /**
   * Returns action to dispatch to change description tab
   * @param {string} tab tab, from DescriptionTabsEnum
   * @return action to dispatch
   */
  changeTab(tab) {
    return {
      type: this.CHANGE_TAB,
      tab,
    }
  }
}
