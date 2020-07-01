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
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { StorageClient } from '@regardsoss/client'
import { pluginMetaDataActions } from './clients/PluginMetadataClient'
import { pluginConfigurationActions } from './clients/PluginConfigurationClient'

/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const listDependencies = [
  new StorageClient.StorageLocationActions().getDependency(RequestVerbEnum.GET_LIST),
]

const addDependencies = [
  new StorageClient.StorageLocationActions().getDependency(RequestVerbEnum.GET_POST),
  pluginMetaDataActions.getMsDependency(RequestVerbEnum.GET_LIST, STATIC_CONF.MSERVICES.STORAGE),
  pluginConfigurationActions.getMsDependency(RequestVerbEnum.GET_LIST, STATIC_CONF.MSERVICES.STORAGE),
]

const stopDependencies = [
  new StorageClient.StorageRequestStopActions().getDependency(RequestVerbEnum.GET),
]

export default {
  stopDependencies,
  listDependencies,
  addDependencies,
}
