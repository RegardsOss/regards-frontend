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
 * Description state module user dialog management actions
 * @author Raphaël Mechali
 */
export class DescriptionStateActions {
  /**
   * Constructor
   * @param {*} namespace actions namespace
   */
  constructor(namespace) {
    this.SELECT_TREE_ENTRY = `${namespace}/select-tree-entry`
  }

  /**
   * @param {[number]} selectedPath selected entry path in tree, where successive index are ranging from 0 to N-1
   * @return {{type: string}} redux action to dispatch to select entry by its path
   */
  selectEntryPath(selectedPath = []) {
    return {
      type: this.SELECT_TREE_ENTRY,
      selectedPath,
    }
  }
}
