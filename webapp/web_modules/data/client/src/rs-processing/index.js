/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Index for all processing microservice clients.
 * @author Théo Lasserre
 */
export { default as ProcessingActions } from './processing/ProcessingActions'
export { default as getProcessingReducer } from './processing/ProcessingReducers'
export { default as getProcessingSelectors } from './processing/ProcessingSelectors'

export { default as LinkProcessingDatasetActions } from './link/LinkProcessingDatasetActions'
export { default as getLinkProcessingDatasetReducer } from './link/LinkProcessingDatasetReducer'
export { default as getLinkProcessingDatasetSelectors } from './link/LinkProcessingDatasetSelectors'

export { default as ProcessingMonitoringActions } from './monitoring/ProcessingMonitoringActions'
export { default as getProcessingMonitoringReducer } from './monitoring/ProcessingMonitoringReducers'
export { default as getProcessingMonitoringSelectors } from './monitoring/ProcessingMonitoringSelectors'
