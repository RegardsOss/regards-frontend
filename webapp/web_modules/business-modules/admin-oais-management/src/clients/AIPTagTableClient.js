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
import { TableActions, getTableSelectors, getTableReducer } from '@regardsoss/components'

/**
 * AIP Tags table client.
 *
 * @author Simon MILHAU
 */
const NAMESPACE = 'admin-oais-management/aip-tag-table'
const STORE_PATH = ['admin', 'acquisition', 'oais', 'aip-tag-table']

export const aipTagTableActions = new TableActions(NAMESPACE)
export const aipTagTableReducer = getTableReducer(NAMESPACE)
export const aipTagTableSelectors = getTableSelectors(STORE_PATH)
