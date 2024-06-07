/**
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

/**
 * Index for all order microservice clients.
 * @author Raphaël Mechali
 */
// current basket content actions
export { default as OrderBasketActions } from './basket/OrderBasketActions'
export { default as getOrderBasketReducer } from './basket/OrderBasketReducer'
export { default as getOrderBasketSelectors } from './basket/OrderBasketSelectors'

// transform basket into a new order actions
export { default as CreateOrderActions } from './order/CreateOrderActions'
export { default as getCreateOrderReducer } from './order/CreateOrderReducer'
export { default as getCreateOrderSelectors } from './order/CreateOrderSelectors'

// download file 'pseudo' actions (used to get the dependencies and the path to order files downloads)
export { default as DownloadAllOrderFilesAction } from './order/DownloadAllOrderFilesAction'
export { default as DownloadOrderFileActions } from './order/DownloadOrderFileActions'
export { default as DownloadOrderMetalinkFileActions } from './order/DownloadOrderMetalinkFileActions'
export { default as DownloadOrderSummaryCSVFileActions } from './order/DownloadOrderSummaryCSVFileActions'
export { default as getDownloadOrderSummaryCSVFileReducer } from './order/DownloadOrderSummaryCSVFileReducer'
export { default as getDownloadOrderSummaryCSVFileSelectors } from './order/DownloadOrderSummaryCSVFileSelectors'

// get a dataset order detail (order)
export { default as OrderDatasetFilesActions } from './order/OrderDatasetFilesActions'
export { default as getOrderDatasetFilesReducer } from './order/OrderDatasetFilesReducer'
export { default as getOrderDatasetFilesSelectors } from './order/OrderDatasetFilesSelectors'

export { default as OrderFileFiltersActions } from './order/OrderFileFiltersActions'
export { default as getOrderFileFiltersReducer } from './order/OrderFileFiltersReducer'
export { default as getOrderFileFiltersSelectors } from './order/OrderFileFiltersSelectors'

// get orders list (order) for current or all users
export { default as OrderListActions } from './order/OrderListActions'
export { default as getOrderListReducer } from './order/OrderListReducer'
export { default as getOrderListSelectors } from './order/OrderListSelectors'

// change order state (pause, resume, delete, delete completely)
export { default as OrderStateActions } from './order/OrderStateActions'
export { default as getOrderStateReducer } from './order/OrderStateReducer'
export { default as getOrderStateSelectors } from './order/OrderStateSelectors'

// order settings
export { default as SettingsActions } from './settings/SettingsActions'
export { default as getSettingsReducer } from './settings/SettingsReducer'
export { default as getSettingsSelectors } from './settings/SettingsSelectors'
