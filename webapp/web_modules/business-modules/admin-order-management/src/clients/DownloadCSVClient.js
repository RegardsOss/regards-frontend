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
import { OrderClient } from '@regardsoss/client'

/**
 * Download csv client.
 * @author Théo Lasserre
 */
const ENTITIES_STORE_PATH = ['admin', 'user-management', 'order-management', 'csv']
const REDUX_ACTION_NAMESPACE = 'admin-order-management/csv'

export const downloadOrderActions = new OrderClient.DownloadOrderSummaryCSVFileActions(REDUX_ACTION_NAMESPACE)
export const downloadOrderReducer = OrderClient.getDownloadOrderSummaryCSVFileReducer(REDUX_ACTION_NAMESPACE)
export const downloadOrderSelectors = OrderClient.getDownloadOrderSummaryCSVFileSelectors(ENTITIES_STORE_PATH)
