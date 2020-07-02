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
import { BasicFacetsPageableReducers } from '@regardsoss/store-utils'
import { EntityConfiguration } from '@regardsoss/api'
import SearchEntitiesActions from './SearchEntitiesActions'

/**
 * Redux store reducer for ALL entities actions (can be single instantiated for all or one for each actions)
 * @author Sébastien binda
 */
class CatalogEntityReducer extends BasicFacetsPageableReducers {
  constructor(namespace) {
    super(EntityConfiguration, new SearchEntitiesActions(namespace))
  }
}

export default (namespace) => {
  const instance = new CatalogEntityReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
