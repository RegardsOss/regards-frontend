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
import runPluginServiceActions from './RunPluginServiceActions'

/**
 * Default state
 */
export const DEFAULT_STATE = {
  serviceRunModel: null, // currently running service model
}

const reduce = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case runPluginServiceActions.RUN_SERVICE:
      return {
        ...state,
        serviceRunModel: action.serviceRunModel,
      }
    case runPluginServiceActions.CLOSE_SERVICE:
      return {
        ...state,
        serviceRunModel: null,
      }
    default:
      return state
  }
}

export default reduce
