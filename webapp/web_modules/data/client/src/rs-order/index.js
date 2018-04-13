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
 */
import OrderBasketActions from './basket/OrderBasketActions'
import getOrderBasketReducer from './basket/OrderBasketReducer'
import getOrderBasketSelectors from './basket/OrderBasketSelectors'
import CreateOrderActions from './order/CreateOrderActions'
import getCreateOrderReducer from './order/CreateOrderReducer'
import getCreateOrderSelectors from './order/CreateOrderSelectors'
import DownloadAllOrderFilesAction from './order/DownloadAllOrderFilesAction'
import DownloadOrderFileActions from './order/DownloadOrderFileActions'
import DownloadOrderMetalinkFileActions from './order/DownloadOrderMetalinkFileActions'
import DownloadOrderSummaryCSVFileActions from './order/DownloadOrderSummaryCSVFileActions'
import OrderDatasetFilesActions from './order/OrderDatasetFilesActions'
import getOrderDatasetFilesReducer from './order/OrderDatasetFilesReducer'
import getOrderDatasetFilesSelectors from './order/OrderDatasetFilesSelectors'
import OrderListActions from './order/OrderListActions'
import getOrderListReducer from './order/OrderListReducer'
import getOrderListSelectors from './order/OrderListSelectors'
import OrderStateActions from './order/OrderStateActions'
import getOrderStateReducer from './order/OrderStateReducer'
import getOrderStateSelectors from './order/OrderStateSelectors'

/**
 * Index for all order microservice clients.
 * @author Raphaël Mechali
 */
module.exports = {
  // current basket content actions
  OrderBasketActions,
  getOrderBasketReducer,
  getOrderBasketSelectors,
  // transform basket into a new order actions
  CreateOrderActions,
  getCreateOrderReducer,
  getCreateOrderSelectors,
  // download file 'pseudo' actions (used to get the dependencies and the path to order files downloads)
  DownloadAllOrderFilesAction,
  DownloadOrderFileActions,
  DownloadOrderMetalinkFileActions,
  DownloadOrderSummaryCSVFileActions,
  // get a dataset order detail (order)
  OrderDatasetFilesActions,
  getOrderDatasetFilesReducer,
  getOrderDatasetFilesSelectors,
  // get orders list (order) for current or all users
  OrderListActions,
  getOrderListReducer,
  getOrderListSelectors,
  // change order state (pause, resume, delete, delete completely)
  OrderStateActions,
  getOrderStateReducer,
  getOrderStateSelectors,

}
