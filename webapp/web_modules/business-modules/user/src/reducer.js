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
 * Combine all reducers for this aa to a single root reducer.
 */
import { combineReducers } from 'redux'
import { OrderClient, UIClient } from '@regardsoss/client'
import { attributeModelReducer } from './clients/AttributeModelClient'
import { authenticationDialogReducer } from './clients/AuthenticationDialogUIClient'
import { layoutReducer } from './clients/LayoutClient'
import { moduleReducer } from './clients/ModuleClient'
import { moduleExpandedStateReducer } from './clients/ModuleExpandedStateClient'
import { resultsContextReducer } from './clients/ResultsContextClient'

/**
 * Reducers for user module
 * @author Sébastien binda
 */
export default combineReducers({
  attributes: attributeModelReducer,
  layout: layoutReducer,
  'layout.modules': moduleReducer,
  'order-basket': OrderClient.getOrderBasketReducer(), // install default order basket reducer reducer
  authenticationDialog: authenticationDialogReducer,
  modulesPanesStates: moduleExpandedStateReducer,
  resultsContext: resultsContextReducer,
  dialogRequests: UIClient.getDialogRequestsReducer(), // Install default dialog requests reducer
  appState: UIClient.getSelectedDynamicModuleReducer(), // install user app state reducer (contains selected module so far...)
})
