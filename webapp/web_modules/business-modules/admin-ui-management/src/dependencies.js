/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Module dependencies descriptions
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
import { themeUIDependencies } from '@regardsoss/admin-ui-theme-management'
import { pluginUIDependencies } from '@regardsoss/admin-ui-plugin-management'
import { moduleUIDependencies } from '@regardsoss/admin-ui-module-management'
import { layoutUIDependencies } from '@regardsoss/admin-ui-layout-management'
import { serviceUIDependencies } from '@regardsoss/admin-ui-service-management'
import { uiSettingsDependencies } from '@regardsoss/admin-ui-settings-management'

/**
 * The list of dependencies that this modules used across its childs
 * If you don't have any access, it's useless to let you see this module
 * @type {Array}
 */
export default [
  [...themeUIDependencies.boardAddRequiredDependencies, ...themeUIDependencies.boardListRequiredDependencies],
  [...pluginUIDependencies.boardAddRequiredDependencies, ...pluginUIDependencies.boardListRequiredDependencies],
  [...moduleUIDependencies.boardAddRequiredDependencies, ...moduleUIDependencies.boardListRequiredDependencies],
  [...layoutUIDependencies.boardAddRequiredDependencies, ...layoutUIDependencies.boardSeeRequiredDependencies],
  [...serviceUIDependencies.boardListRequiredDependencies, ...serviceUIDependencies.boardAddRequiredDependencies],
  uiSettingsDependencies.editSettingsDependencies,
]
