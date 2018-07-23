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
import LocalStorageUser from './LocalStorageUser'
import LocalStorageUserData from './LocalStorageUserData'
import { LOCALES_ENUM, LOCALES } from './Locales'
import { MENU_DISPLAY_MODES, MENU_DISPLAY_MODES_ENUM } from './MenuDisplayModes'
import { MODULE_PANE_DISPLAY_MODES_ENUM, MODULE_PANE_DISPLAY_MODES, isModulePaneExpanded, isModulePaneExpansible } from './ModulePaneDisplayModes'
import { PRESENTATION_STATE_ENUM, PRESENTATION_STATE } from './ModulePresentationState'
import { getAdminURL, getModuleURL, getModuleDefaultIconURL, getPathModuleId } from './URLHelper'

module.exports = {
  getAdminURL,
  getModuleDefaultIconURL,
  getModuleURL,
  getPathModuleId,
  isModulePaneExpanded,
  isModulePaneExpansible,
  LOCALES,
  LOCALES_ENUM,
  LocalStorageUser,
  LocalStorageUserData,
  MENU_DISPLAY_MODES,
  MENU_DISPLAY_MODES_ENUM,
  MODULE_PANE_DISPLAY_MODES_ENUM,
  MODULE_PANE_DISPLAY_MODES,
  PRESENTATION_STATE_ENUM,
  PRESENTATION_STATE,
}
