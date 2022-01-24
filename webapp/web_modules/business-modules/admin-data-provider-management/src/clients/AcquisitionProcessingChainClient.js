/*
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
 */
import { DataProviderClient } from '@regardsoss/client'

/**
 * Dataprovider generation chain entities client.
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'monitoredChains']
const ENTITIES_EDIT_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'chains']
const REDUX_ACTION_NAMESPACE = 'admin-data-provider-management/chains'
const REDUX_ACTION_EDIT_NAMESPACE = 'admin-data-provider-management/chains/edit'
const REDUX_START_ACTION_NAMESPACE = 'admin-data-provider-management/chain-run'
const REDUX_STOP_ACTION_NAMESPACE = 'admin-data-provider-management/chain-stop'
const REDUX_TOGGLE_ACTION_NAMESPACE = 'admin-data-provider-management/chain-toggle-mode'

export const AcquisitionProcessingChainActions = new DataProviderClient.AcquisitionProcessingChainMonitorActions(REDUX_ACTION_NAMESPACE)
export const AcquisitionProcessingChainReducer = DataProviderClient.getAcquisitionProcessingChainMonitorReducer(REDUX_ACTION_NAMESPACE)
export const AcquisitionProcessingChainSelectors = DataProviderClient.getAcquisitionProcessingChainMonitorSelectors(ENTITIES_STORE_PATH)

export const AcquisitionProcessingChainEditActions = new DataProviderClient.AcquisitionProcessingChainActions(REDUX_ACTION_EDIT_NAMESPACE)
export const AcquisitionProcessingChainEditReducer = DataProviderClient.getAcquisitionProcessingChainReducer(REDUX_ACTION_EDIT_NAMESPACE)
export const AcquisitionProcessingChainEditSelectors = DataProviderClient.getAcquisitionProcessingChainSelectors(ENTITIES_EDIT_STORE_PATH)

export const RunAcquisitionProcessingChainActions = new DataProviderClient.RunAcquisitionProcessingChainActions(REDUX_START_ACTION_NAMESPACE)
export const StopAcquisitionProcessingChainActions = new DataProviderClient.StopAcquisitionProcessingChainActions(REDUX_STOP_ACTION_NAMESPACE)
export const ToggleAcquisitionProcessingChainActions = new DataProviderClient.ToggleAcquisitionProcessingChainActions(REDUX_TOGGLE_ACTION_NAMESPACE)
export const MultiToggleAcquisitionProcessingChainActions = new DataProviderClient.MultiToggleAcquisitionProcessingChainActions(REDUX_TOGGLE_ACTION_NAMESPACE)
