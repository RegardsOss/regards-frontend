/*
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
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { LayoutConfiguration } from '@regardsoss/api'
import LayoutActions from './LayoutActions'

/**
 * Redux Reducer for LayoutActions actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class LayoutReducer extends BasicPageableReducers {
  /**
   * Constructor
   * @param {string} namespace namespace, leave empty for default client reducer
   */
  constructor(namespace = 'user/layout') {
    super(LayoutConfiguration, new LayoutActions(namespace))
  }
}

/**
 * Builds reducer function instance
 * @param {string} namespace namespace, leave empty for default client reducer
 */
export default (namespace) => {
  const instance = new LayoutReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
