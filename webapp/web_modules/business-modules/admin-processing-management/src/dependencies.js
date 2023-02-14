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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { CommonClient } from '@regardsoss/client'
import { processingActions } from './clients/ProcessingClient'
import { processingMonitoringActions } from './clients/ProcessingMonitoringClient'

/**
 * Module hateoas depencies
 * @author Théo Lasserre
 */

const listProcessingDependencies = [
  processingActions.getDependency(RequestVerbEnum.GET_LIST),
]

const listMonitoringDependencies = [
  processingMonitoringActions.getDependency(RequestVerbEnum.POST),
]

const addProcessingDependencies = [
  new CommonClient.PluginMetaDataActions().getMsDependency(RequestVerbEnum.GET_LIST, STATIC_CONF.MSERVICES.PROCESSING),
  processingActions.getDependency(RequestVerbEnum.POST),
]

export default {
  listProcessingDependencies,
  listMonitoringDependencies,
  addProcessingDependencies,
}
