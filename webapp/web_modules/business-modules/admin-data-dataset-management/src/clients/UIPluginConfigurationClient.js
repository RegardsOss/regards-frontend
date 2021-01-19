/*
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * UI Plugin Configuration entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'collections', 'dataset', 'ui-plugin-configuration']
const REDUX_ACTION_NAMESPACE = 'admin-ui-service-management/ui-plugin-configuration'
const isRequestingByUIPlugin = false

export const uiPluginConfigurationReducer = AccessProjectClient.UIPluginConfigurationReducers(REDUX_ACTION_NAMESPACE)
export const uiPluginConfigurationActions = new AccessProjectClient.UIPluginConfigurationActions(REDUX_ACTION_NAMESPACE, isRequestingByUIPlugin)
export const uiPluginConfigurationSelectors = AccessProjectClient.UIPluginConfigurationSelectors(ENTITIES_STORE_PATH)
