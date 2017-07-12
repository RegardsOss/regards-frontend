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
 * Plugin MetaData entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'dataset', 'plugin-meta-data']
const REDUX_ACTION_NAMESPACE = 'admin-data-dataset-management/pluginMetaData'

const pluginMetaDataReducer = CommonClient.PluginMetaDataReducer(REDUX_ACTION_NAMESPACE)
const pluginMetaDataActions = new CommonClient.PluginMetaDataActions(REDUX_ACTION_NAMESPACE)
const pluginMetaDataSelectors = CommonClient.PluginMetaDataSelectors(ENTITIES_STORE_PATH)


export default {
  pluginMetaDataReducer,
  pluginMetaDataActions,
  pluginMetaDataSelectors,
}
