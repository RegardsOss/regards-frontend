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
import { DescriptionStateActions } from '../model/DescriptionStateActions'
import { buildDescriptionStateReducer } from '../model/DescriptionStateReducer'
import { DescriptionStateSelectors } from '../model/DescriptionStateSelectors'

/**
 * Client for description state management
 * @author Raphaël Mechali
 */
const REDUX_ACTION_NAMESPACE = 'ENTITIES-DESCRIPTION-STATE'
const ENTITIES_STORE_PATH = ['modules.description', 'descriptionState']

export const descriptionStateActions = new DescriptionStateActions(REDUX_ACTION_NAMESPACE)
export const descriptionStateReducer = buildDescriptionStateReducer(REDUX_ACTION_NAMESPACE)
export const descriptionStateSelectors = new DescriptionStateSelectors(ENTITIES_STORE_PATH)
