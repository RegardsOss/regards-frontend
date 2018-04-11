/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import AcquisitionProcessingChainActions from './AcquisitionProcessingChain/AcquisitionProcessingChainActions'
import getAcquisitionProcessingChainReducer from './AcquisitionProcessingChain/AcquisitionProcessingChainReducer'
import getAcquisitionProcessingChainSelectors from './AcquisitionProcessingChain/AcquisitionProcessingChainSelectors'

import RunAcquisitionProcessingChainActions from './AcquisitionProcessingChain/RunAcquisitionProcessingChainActions'
import StopAcquisitionProcessingChainActions from './AcquisitionProcessingChain/StopAcquisitionProcessingChainActions'

import AcquisitionProcessingChainMonitorActions from './AcquisitionProcessingChainMonitor/AcquisitionProcessingChainMonitorActions'
import getAcquisitionProcessingChainMonitorReducer from './AcquisitionProcessingChainMonitor/AcquisitionProcessingChainMonitorReducer'
import getAcquisitionProcessingChainMonitorSelectors from './AcquisitionProcessingChainMonitor/AcquisitionProcessingChainMonitorSelectors'

import ProductActions from './Product/ProductActions'
import getProductReducer from './Product/ProductReducer'
import getProductSelectors from './Product/ProductSelectors'

import AcquisitionFileActions from './AcquisitionFile/AcquisitionFileActions'
import getAcquisitionFileReducer from './AcquisitionFile/AcquisitionFileReducer'
import getAcquisitionFileSelectors from './AcquisitionFile/AcquisitionFileSelectors'

/**
 * Index for all data provider microservice clients.
 * @author Sébastien Binda
 */
module.exports = {
  AcquisitionProcessingChainActions,
  getAcquisitionProcessingChainReducer,
  getAcquisitionProcessingChainSelectors,

  RunAcquisitionProcessingChainActions,
  StopAcquisitionProcessingChainActions,

  AcquisitionProcessingChainMonitorActions,
  getAcquisitionProcessingChainMonitorReducer,
  getAcquisitionProcessingChainMonitorSelectors,

  ProductActions,
  getProductReducer,
  getProductSelectors,

  AcquisitionFileActions,
  getAcquisitionFileReducer,
  getAcquisitionFileSelectors,

}
