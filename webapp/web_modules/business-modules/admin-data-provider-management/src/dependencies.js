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
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { AcquisitionProcessingChainActions, AcquisitionProcessingChainEditActions } from './clients/AcquisitionProcessingChainClient'
import { ingestProcessingChainActions } from './clients/IngestProcessingChainClient'
import { storagesListActions } from './clients/StoragesListClient'
/**
 * Module hateoas dependencies
 * @author Sébastien Binda
 */

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const listDependencies = [
  AcquisitionProcessingChainActions.getDependency(RequestVerbEnum.GET_LIST),
]

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const addDependencies = [
  AcquisitionProcessingChainEditActions.getDependency(RequestVerbEnum.POST),
  ingestProcessingChainActions.getDependency(RequestVerbEnum.GET_LIST),
  storagesListActions.getMsDependency(RequestVerbEnum.GET_LIST, STATIC_CONF.MSERVICES.STORAGE),
]

export default {
  addDependencies,
  listDependencies,
}
