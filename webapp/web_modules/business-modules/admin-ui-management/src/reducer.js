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
import { combineReducers } from 'redux'
import { moduleUIReducer } from '@regardsoss/admin-ui-module-management'
import { layoutUIReducer } from '@regardsoss/admin-ui-layout-management'
import { pluginUIReducer } from '@regardsoss/admin-ui-plugin-management'
import { serviceUIReducer } from '@regardsoss/admin-ui-service-management'
import { uiSettingsReducer } from '@regardsoss/admin-ui-settings-management'

/**
 * UI-management module reducers
 * @type {Function}
 * @author Sébastien binda
 */
const uiManagementReducer = combineReducers({
  layout: layoutUIReducer,
  plugin: pluginUIReducer,
  module: moduleUIReducer,
  service: serviceUIReducer,
  settings: uiSettingsReducer,
})

export default uiManagementReducer
