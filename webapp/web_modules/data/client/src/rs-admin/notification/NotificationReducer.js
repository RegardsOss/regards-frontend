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
import { NotificationConfiguration } from '@regardsoss/api'
import NotificationActions from './NotificationActions'

/**
 * Redux Reducer for NotificationActions actions.
 *
 * To user thoses actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Maxime Bouveron
 */
class NotificationReducer extends BasicPageableReducers {
  constructor(namespace, instance) {
    super(NotificationConfiguration, new NotificationActions(namespace, instance))
  }
}

export default (namespace, instance = false) => {
  const reducerInstance = new NotificationReducer(namespace, instance)
  return (state, action) => reducerInstance.reduce(state, action)
}
