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
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Description levels selector
 * @author Raphaël Mechali
 */
export class DescriptionLevelSelectors extends BasicSelector {
  constructor() {
    super(['modules.description', 'levels'])
  }

  /**
   * Returns current description pah
   * @param {*} state redux state
   * @return [{Entity}] current description path
   */
  getCurrentDescriptionPath(state) {
    return this.uncombineStore(state).currentDescriptionPath
  }

  /**
   * Returns currently shown entity (if any)
   * @param {*} state redux state
   * @return {Entity} currently shown entity or null
   */
  getShownEntity(state) {
    const path = this.getCurrentDescriptionPath(state)
    return path && path.length ? last(path) : null
  }

  /**
   * Returns current tab
   * @param {*} state redux state
   * @return {string} current tab from DescriptionTabsEnum
   */
  getCurrentTab(state) {
    return this.uncombineStore(state).currentTab
  }
}

export default function getDescriptionLevelSelectors() {
  return new DescriptionLevelSelectors()
}
