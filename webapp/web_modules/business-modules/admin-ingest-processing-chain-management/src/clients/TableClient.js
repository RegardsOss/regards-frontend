/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TableActions, getTableSelectors, getTableReducer } from '@regardsoss/components'

/**
 * Infinite table actions client.
 * @author Sébastien Binda
 */
const NAMESPACE = 'admin-ingest-management/processing-chain-table'
const STORE_PATH = ['admin', 'acquisition', 'processingChain', 'processing-chain-table']

export const tableActions = new TableActions(NAMESPACE)
export const tableReducer = getTableReducer(NAMESPACE)
export const tableSelectors = getTableSelectors(STORE_PATH)
