/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { BasicArrayReducers } from '@regardsoss/store-utils'
import SIPImportActions from './SIPImportActions'
/**
 * Redux store reducer for
 */
/**
 * Redux Reducer for SIP entities
 * @author Maxime Bouveron
 */
class SIPImportReducer extends BasicArrayReducers {
  constructor(namespace) {
    super(new SIPImportActions(namespace))
  }

  reduce(state, action) {
    const newState = super.reduce(state, action)
    if (this.isCancelled(newState, action)) {
      return newState
    }
    if (!get(action, 'payload.response', null)) {
      return newState
    }
    switch (action.type) {
      case this.basicArrayActionInstance.CREATE_ENTITIES_FAILURE:
        return {
          ...newState,
          items: action.payload.response,
        }
      default:
        return newState
    }
  }
}

export default (namespace) => {
  const instance = new SIPImportReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
