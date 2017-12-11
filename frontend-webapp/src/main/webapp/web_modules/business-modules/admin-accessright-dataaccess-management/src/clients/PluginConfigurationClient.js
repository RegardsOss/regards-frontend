/*
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
 */
import { CommonClient } from '@regardsoss/client'

/**
 * Plugin configuration entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'access-right-management', 'access-rights-management', 'plugin-configuration']
const REDUX_ACTION_NAMESPACE = 'admin-accessright-management/pluginConfiguration'

const pluginConfigurationReducer = CommonClient.PluginConfigurationReducer(REDUX_ACTION_NAMESPACE)
const pluginConfigurationActions = new CommonClient.PluginConfigurationActions(REDUX_ACTION_NAMESPACE)
const pluginConfigurationSelectors = CommonClient.PluginConfigurationSelectors(ENTITIES_STORE_PATH)


export default {
  pluginConfigurationReducer,
  pluginConfigurationActions,
  pluginConfigurationSelectors,
}
