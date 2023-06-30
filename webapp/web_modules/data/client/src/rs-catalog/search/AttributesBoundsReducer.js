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
import { BasicListReducers } from '@regardsoss/store-utils'
import { AttributeBoundsConfiguration } from '@regardsoss/api'
import AttributesBoundsActions from './AttributesBoundsActions'

/**
 * Reducer for attributes bounds actions
 * @author Raphaël Mechali
 */
class AttributesBoundsReducer extends BasicListReducers {
  /**
   * Constructor
   * @param {string} namespace actions namespace
   */
  constructor(namespace) {
    super(AttributeBoundsConfiguration, new AttributesBoundsActions(namespace))
  }
}

/**
 * Reduce function builder
 * @param {string} namespace actions namespace
 */
export default function getAttributesBoundsReducer(namespace) {
  const reducer = new AttributesBoundsReducer(namespace)
  return (state, action) => reducer.reduce(state, action)
}
