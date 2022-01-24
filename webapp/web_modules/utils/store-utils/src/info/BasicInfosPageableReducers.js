/**
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
 **/
import BasicPageableReducers from '../pageable/BasicPageableReducers'

/**
 * Actions that are pageable and expose 'info' field (same level than page metadata)
 */
class BasicInfosPageableReducers extends BasicPageableReducers {
  reduce(state, action) {
    if (this.isCancelled(state, action)) {
      return state
    }
    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicListActionInstance.ENTITY_LIST_SUCCESS:
        return {
          ...newState,
          info: action.payload.info,
        }
      default:
        return newState
    }
  }
}

export default BasicInfosPageableReducers
