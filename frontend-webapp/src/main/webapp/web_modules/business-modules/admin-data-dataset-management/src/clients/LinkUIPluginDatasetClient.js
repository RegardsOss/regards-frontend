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
import { AccessProjectClient } from '@regardsoss/client'

/**
 * Datasource entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'collections', 'dataset', 'link-ui-plugin-definition']
const REDUX_ACTION_NAMESPACE = 'admin-data-dataset-management/link-ui-plugin-dataset'

const linkUIPluginDatasetReducer = AccessProjectClient.getLinkUIPluginDatasetReducer(REDUX_ACTION_NAMESPACE)
const linkUIPluginDatasetActions = new AccessProjectClient.LinkUIPluginDatasetActions(REDUX_ACTION_NAMESPACE)
const linkUIPluginDatasetSelectors = AccessProjectClient.getLinkUIPluginDatasetSelectors(ENTITIES_STORE_PATH)

module.exports = {
  linkUIPluginDatasetReducer,
  linkUIPluginDatasetActions,
  linkUIPluginDatasetSelectors,
}
