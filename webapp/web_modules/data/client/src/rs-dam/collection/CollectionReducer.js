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
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { CollectionConfiguration } from '@regardsoss/api'
import CollectionActions from './CollectionActions'

/**
 * Redux store reducer for Plugin MetaData entities
 * @author Léo Mieulet
 */
class PluginMetaDataReducer extends BasicPageableReducers {
  constructor(namespace) {
    super(CollectionConfiguration, new CollectionActions(namespace))
  }
}

export default (namespace) => {
  const instance = new PluginMetaDataReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
