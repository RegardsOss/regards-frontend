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
 */
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import FiltersActions from './FiltersActions'

export class FiltersReducer {
  static DEFAULT_STATE = {}

  constructor(filterActions) {
    this.filterActions = filterActions
    this.defaultState = FiltersReducer.DEFAULT_STATE
  }

  reduce(state = this.defaultState, action) {
    const filters = get(action, 'filters', {})
    switch (action.type) {
      case FiltersActions.SIGNALS.UPDATE_FILTERS:
        return {
          filters: omitBy(filters, (v) => isNil(v) || v === '' || v === false),
        }
      case FiltersActions.SIGNALS.CLEAR_FILTERS:
        return {
          filters: {},
        }
      default:
        return state
    }
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new FiltersReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
