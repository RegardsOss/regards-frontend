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
import values from 'lodash/values'
import { TableSelectionModes } from '@regardsoss/components'
import { REQUEST_STATUS_ENUM, ERROR_STATUSES } from './RequestStatus'
import { REQUEST_PARAMETERS, TableFilterDefaultStateEnum } from '../common'
/**
  * Filters definitions
  * @author Théo Lasserre
  */

/**
  * Possible filters parameters
  * values are properties names sent to backend (ex: dispatchedWorkerType)
  */
export const FILTER_PARAMS_ENUM = {
  SOURCE: 'source',
  SESSION: 'session',
  WORKER_TYPE: 'dispatchedWorkerType',
  CONTENT_TYPES: 'contentTypes',
  STATUSES: 'statuses',
  CREATION_DATE: 'creationDate',
  IDS: 'ids',
}

/**
 * Class to construct WorkerManager request search body parameters
 */
export class RequestFilters {
  constructor() {
    this.filters = {}
  }

  static builder(source = null, session = null) {
    const filters = new RequestFilters()
    if (session) {
      filters.withSession(session)
    }
    if (source) {
      filters.withSource(source)
    }
    return filters
  }

  withSession(session) {
    this.filters[FILTER_PARAMS_ENUM.SESSION] = session
    return this
  }

  withSource(source) {
    this.filters[FILTER_PARAMS_ENUM.SESSION] = source
    return this
  }

  withStatusError() {
    return this.withStatusIncluded(REQUEST_STATUS_ENUM.ERROR)
  }

  withAllStautsError() {
    return this.withStatusesIncluded(ERROR_STATUSES)
  }

  withStatusIncluded(status) {
    this.filters[FILTER_PARAMS_ENUM.STATUSES] = {
      [REQUEST_PARAMETERS.VALUES]: [status],
      [REQUEST_PARAMETERS.MODE]: TableSelectionModes.INCLUDE,
    }
    return this
  }

  withStatusesIncluded(statuses) {
    this.filters[FILTER_PARAMS_ENUM.STATUSES] = {
      [REQUEST_PARAMETERS.VALUES]: statuses || [],
      [REQUEST_PARAMETERS.MODE]: TableSelectionModes.INCLUDE,
    }
    return this
  }

  build() {
    return this.filters
  }

  static buildDefault() {
    return {
      [FILTER_PARAMS_ENUM.SOURCE]: '',
      [FILTER_PARAMS_ENUM.SESSION]: '',
      [FILTER_PARAMS_ENUM.WORKER_TYPE]: '',
      [FILTER_PARAMS_ENUM.CONTENT_TYPES]: TableFilterDefaultStateEnum.VALUES,
      [FILTER_PARAMS_ENUM.STATUSES]: TableFilterDefaultStateEnum.VALUES,
      [FILTER_PARAMS_ENUM.CREATION_DATE]: TableFilterDefaultStateEnum.DATES,
    }
  }
}

export const FILTER_PARAMS = values(FILTER_PARAMS_ENUM)
