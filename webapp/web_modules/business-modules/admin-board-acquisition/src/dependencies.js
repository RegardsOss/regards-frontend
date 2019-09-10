/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connectionDependencies } from '@regardsoss/admin-data-connection-management'
import { datasourceDependencies } from '@regardsoss/admin-data-datasource-management'
import { dataProviderDependencies } from '@regardsoss/admin-data-provider-management'
import { processingChainDependencies } from '@regardsoss/admin-ingest-processing-chain-management'
import { storageManagementDependencies } from '@regardsoss/admin-storage-management'

/**
 * Mandatory Dependencies to display module in project menu
 * @author Sébastien Binda
 * @type {Array}
 */
export default [
  ...connectionDependencies.addDependencies,
  ...datasourceDependencies.addDependencies,
  ...dataProviderDependencies.addDependencies,
  ...processingChainDependencies.addDependencies,
  ...storageManagementDependencies.addPluginDependencies,
  ...storageManagementDependencies.monitoringDependencies,
]
