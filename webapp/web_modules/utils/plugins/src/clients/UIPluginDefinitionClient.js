/*
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
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * UI Plugin Definition entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['common', 'plugins', 'definitionsLoading']
const REDUX_ACTION_NAMESPACE = 'common/plugins/definitionsLoading'

export const uiPluginDefinitionActions = new AccessProjectClient.UIPluginDefinitionActions(REDUX_ACTION_NAMESPACE)
export const uiPluginDefinitionReducers = AccessProjectClient.UIPluginDefinitionReducers(REDUX_ACTION_NAMESPACE)
export const uiPluginDefinitionSelectors = AccessProjectClient.UIPluginDefinitionSelectors(ENTITIES_STORE_PATH)
