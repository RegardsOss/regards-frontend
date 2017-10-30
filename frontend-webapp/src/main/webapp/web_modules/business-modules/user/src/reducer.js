/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Combine all reducers for this aa to a single root reducer.
 */
import { combineReducers } from 'redux'
import { AccessProjectClient, OrderClient } from '@regardsoss/client'

/**
 * Reducers for user module
 * @author Sébastien binda
 */
export default combineReducers({
  layout: AccessProjectClient.LayoutReducers(), // install default layout client reducer
  'layout.modules': AccessProjectClient.ModuleReducers(), // install default layout modules client reducer
  'order-basket': OrderClient.getOrderBasketReducer(), // install default order basket reducer reducer
})
