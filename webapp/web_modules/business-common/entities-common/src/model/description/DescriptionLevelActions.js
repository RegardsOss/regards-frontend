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
export default class DescriptionLevelActions {
  constructor(namespace) {
    this.SHOW = `${namespace}/DESCRIPTION_LEVEL/SHOW`
    this.SHOW_RELATED_ENTITY = `${namespace}/DESCRIPTION_LEVEL/SHOW_RELATED_ENTITY`
    this.JUMP_TO_LEVEL = `${namespace}/DESCRIPTION_LEVEL/JUMP_TO_LEVEL`
    this.HIDE = `${namespace}/DESCRIPTION_LEVEL/HIDE`
    this.CHANGE_TAB = `${namespace}/DESCRIPTION_LEVEL/CHANGE_TAB`
  }

  /** Possible initial tabs */
  static TABS_ENUM = {
    PROPERTIES: 'PROPERTIES',
    QUICKLOOK: 'QUICKLOOK',
    FILES: 'FILES',
    DESCRIPTION: 'DESCRIPTIONS',
  }

  /**
   * Returns action to dispatch to show description of a new entity
   * @param {CatalogEntity} entity entity to show (will be root of the new context description breadcrumb)
   * @return action
   */
  show(entity, tab) {
    return {
      type: this.SHOW,
      entity,
      tab,
    }
  }

  /**
   * Returns action to dispatch in order to switch to another tab
   * @param {String} TABS_ENUM value
   */
  changeTab(tab) {
    return {
      type: this.CHANGE_TAB,
      tab,
    }
  }

  /**
   * Returns action to dispatch to show the description of an entity related to the currently shown one
   * @param {CatalogEntity} entity entity to show (will be the new last path element of context description breadcrumb)
   * @return action
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
   * @return action
   */
  jumpToLevel(levelIndex) {
    return {
      type: this.JUMP_TO_LEVEL,
      levelIndex,
    }
  }

  /**
     * Returns action to dispatch to hide description
     * @return action
     */
  hide() {
    return {
      type: this.HIDE,
    }
  }
}
