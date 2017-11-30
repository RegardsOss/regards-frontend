/**
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
import OrderBasketActions from './basket/OrderBasketActions'
import getOrderBasketReducer from './basket/OrderBasketReducer'
import getOrderBasketSelectors from './basket/OrderBasketSelectors'
import OrderDatasetFilesActions from './history/OrderDatasetFilesActions'
import getOrderDatasetFilesReducer from './history/OrderDatasetFilesReducer'
import getOrderDatasetFilesSelectors from './history/OrderDatasetFilesSelectors'
import DownloadAllOrderFilesAction from './history/DownloadAllOrderFilesAction'
import DownloadOrderFileActions from './history/DownloadOrderFileActions'
import DownloadOrderMetalinkFileActions from './history/DownloadOrderMetalinkFileActions'
import OrderListActions from './history/OrderListActions'
import getOrderListReducer from './history/OrderListReducer'
import getOrderListSelectors from './history/OrderListSelectors'
import CreateOrderActions from './order/CreateOrderActions'
import getCreateOrderReducer from './order/CreateOrderReducer'
import getCreateOrderSelectors from './order/CreateOrderSelectors'

/**
 * Index for all order microservice clients.
 * @author Raphaël Mechali
 */
module.exports = {
  // current basket content actions
  OrderBasketActions,
  getOrderBasketReducer,
  getOrderBasketSelectors,
  // get a dataset order detail (history)
  OrderDatasetFilesActions,
  getOrderDatasetFilesReducer,
  getOrderDatasetFilesSelectors,
  // download file 'pseudo' actions (used to get the dependencies and the path to order files downloads)
  DownloadAllOrderFilesAction,
  DownloadOrderFileActions,
  DownloadOrderMetalinkFileActions,
  // get orders list (history) for current or all users
  OrderListActions,
  getOrderListReducer,
  getOrderListSelectors,
  // transform basket into a new order actions
  CreateOrderActions,
  getCreateOrderReducer,
  getCreateOrderSelectors,
}
