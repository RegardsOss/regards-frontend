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
import { BasicListReducers } from '@regardsoss/store-utils'
import { AttributeModelConfiguration } from '@regardsoss/api'
import AttributeModelActions from './AttributeModelActions'

/**
 * Redux Reducer for  Attribute Model entities
 * @author Léo Mieulet
 */
class AttributeModelReducer extends BasicListReducers {
  /**
   * Constructor
   * @param {string} namespace actions namespace, leave empty for default client reducer
   */
  constructor(namespace) {
    super(AttributeModelConfiguration, new AttributeModelActions(namespace))
  }
}

/**
 * Builds reducer function instance
 * @param {string} namespace actions namespace, leave empty for default client reducer
 */
export default (namespace) => {
  const instance = new AttributeModelReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
