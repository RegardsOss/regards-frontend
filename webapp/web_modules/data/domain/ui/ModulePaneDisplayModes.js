/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'

/**
 * Holds possible display modes for a menu module (within configuration)
 */
export const MODULE_PANE_DISPLAY_MODES_ENUM = {
  EXPANDED_COLLAPSIBLE: 'EXPANDED_COLLAPSIBLE',
  COLLAPSED_EXPANDABLE: 'COLLAPSED_EXPANDABLE',
  ALWAYS_EXPANDED: 'ALWAYS_EXPANDED',
}

export const MODULE_PANE_DISPLAY_MODES = values(MODULE_PANE_DISPLAY_MODES_ENUM)

/**
 * @param {string}  displayMode display mode, one of MODULE_PANE_DISPLAY_MODES_ENUM
 * @return {boolean} true if module is expanded in mode as parameter, false otherwise
 */
export function isModulePaneExpanded(displayMode) {
  return displayMode !== MODULE_PANE_DISPLAY_MODES_ENUM.COLLAPSED_EXPANDABLE
}

/**
 * @param {string}  displayMode display mode, one of MODULE_PANE_DISPLAY_MODES_ENUM
 * @return {boolean} true if module is expansible in mode as parameter
 */
export function isModulePaneExpansible(displayMode) {
  return displayMode !== MODULE_PANE_DISPLAY_MODES_ENUM.ALWAYS_EXPANDED
}
