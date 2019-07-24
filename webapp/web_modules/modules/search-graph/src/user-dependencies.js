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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { dependencies as resultsDependencies } from '@regardsoss-modules/search-results'
import fetchGraphCollectionsActions from './model/graph/FetchGraphCollectionsActions'
import fetchGraphDatasetsActions from './model/graph/FetchGraphDatasetsActions'

/**
 * User module dependencies, not exported but used internally to let the module show dependencies / authentication messages
 * @author Raphaël Mechali
 */
export const dependencies = [
  fetchGraphCollectionsActions.getDependency(RequestVerbEnum.GET_LIST),
  fetchGraphDatasetsActions.getDependency(RequestVerbEnum.GET_LIST),
  ...resultsDependencies.user,
]
