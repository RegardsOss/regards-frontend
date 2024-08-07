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
import { moduleReducers } from './clients/ModuleClient'
import { moduleInstanceReducers } from './clients/ModuleInstanceClient'
import { layoutReducers } from './clients/LayoutClient'
import { layoutInstanceReducers } from './clients/LayoutInstanceClient'

/**
 * UI-Configuration module reducers
 * @type {Function}
 * @author Sébastien binda
 */
const uiConfigurationtReducer = combineReducers({
  modules: moduleReducers,
  'modules-instance': moduleInstanceReducers,
  layouts: layoutReducers,
  'layouts-instance': layoutInstanceReducers,
})

export default uiConfigurationtReducer
