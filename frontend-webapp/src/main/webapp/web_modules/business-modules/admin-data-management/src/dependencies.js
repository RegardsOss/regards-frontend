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
 **/
import { fragmentDependencies } from '@regardsoss/admin-data-fragment-management'
import { modelDependencies } from '@regardsoss/admin-data-model-management'
import { attributeModelDependencies } from '@regardsoss/admin-data-attributemodel-management'
import { collectionDependencies } from '@regardsoss/admin-data-collection-management'
import { connectionDependencies } from '@regardsoss/admin-data-connection-management'
import { datasourceDependencies } from '@regardsoss/admin-data-datasource-management'
import { datasetDependencies } from '@regardsoss/admin-data-dataset-management'

/**
 * Mandatory Dependencies to display module in project menu
 * @type {Array}
 */
export default [
  ...modelDependencies.listDependencies,
  ...modelDependencies.addDependencies,
  ...fragmentDependencies.listDependencies,
  ...fragmentDependencies.addDependencies,
  ...attributeModelDependencies.listDependencies,
  ...attributeModelDependencies.addDependencies,
  ...collectionDependencies.listDependencies,
  ...collectionDependencies.addDependencies,
  ...connectionDependencies.listDependencies,
  ...connectionDependencies.addDependencies,
  ...datasourceDependencies.listDependencies,
  ...datasourceDependencies.addDependencies,
  ...datasetDependencies.listDependencies,
  ...datasetDependencies.addDependencies,
]
