/**
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

/**
 * Index for all data provider microservice clients.
 * @author Sébastien Binda
 */
export { default as AcquisitionProcessingChainActions } from './AcquisitionProcessingChain/AcquisitionProcessingChainActions'
export { default as getAcquisitionProcessingChainReducer } from './AcquisitionProcessingChain/AcquisitionProcessingChainReducer'
export { default as getAcquisitionProcessingChainSelectors } from './AcquisitionProcessingChain/AcquisitionProcessingChainSelectors'

export { default as RunAcquisitionProcessingChainActions } from './AcquisitionProcessingChain/RunAcquisitionProcessingChainActions'
export { default as StopAcquisitionProcessingChainActions } from './AcquisitionProcessingChain/StopAcquisitionProcessingChainActions'
export { default as ToggleAcquisitionProcessingChainActions } from './AcquisitionProcessingChain/ToggleAcquisitionProcessingChainActions'
export { default as MultiToggleAcquisitionProcessingChainActions } from './AcquisitionProcessingChain/MultiToggleAcquisitionProcessingChainActions'

export { default as AcquisitionProcessingChainMonitorActions } from './AcquisitionProcessingChainMonitor/AcquisitionProcessingChainMonitorActions'
export { default as getAcquisitionProcessingChainMonitorReducer } from './AcquisitionProcessingChainMonitor/AcquisitionProcessingChainMonitorReducer'
export { default as getAcquisitionProcessingChainMonitorSelectors } from './AcquisitionProcessingChainMonitor/AcquisitionProcessingChainMonitorSelectors'

export { default as ProductActions } from './Product/ProductActions'
export { default as getProductReducer } from './Product/ProductReducer'
export { default as getProductSelectors } from './Product/ProductSelectors'

export { default as AcquisitionFileActions } from './AcquisitionFile/AcquisitionFileActions'
export { default as getAcquisitionFileReducer } from './AcquisitionFile/AcquisitionFileReducer'
export { default as getAcquisitionFileSelectors } from './AcquisitionFile/AcquisitionFileSelectors'
