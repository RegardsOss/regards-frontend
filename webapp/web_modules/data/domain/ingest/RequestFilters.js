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
import { REQUEST_PARAMETERS, TableFilterDefaultStateEnum } from '../common'
import { AIP_REQUEST_STATUS_ENUM } from './AIPRequestStatusEnum'

/**
 * @author Sébastien Binda
 */

/** Possible filter params */
export const REQUEST_FILTER_PARAMS = {
  REQUEST_IDS: 'requestIds',
  PROVIDER_IDS: 'providerIds',
  SOURCE: 'sessionOwner',
  SESSION: 'session',
  CREATION_DATE: 'creationDate',
  REQUEST_STATE: 'requestStates',
  REQUEST_TYPE: 'requestTypes',
}

/**
 * Class to construct Ingest request search body parameters
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
    this.filters[REQUEST_FILTER_PARAMS.SESSION] = session
    return this
  }

  withSource(source) {
    this.filters[REQUEST_FILTER_PARAMS.SOURCE] = source
    return this
  }

  withStatusError() {
    return this.withStatusIncluded(AIP_REQUEST_STATUS_ENUM.ERROR)
  }

  withStatusIncluded(status) {
    this.filters[REQUEST_FILTER_PARAMS.REQUEST_STATE] = {
      ...TableFilterDefaultStateEnum.VALUES,
      [REQUEST_PARAMETERS.VALUES]: [status],
    }
    return this
  }

  withStatusesIncluded(statuses) {
    this.filters[REQUEST_FILTER_PARAMS.AIP_STATE] = {
      ...TableFilterDefaultStateEnum.VALUES,
      [REQUEST_PARAMETERS.VALUES]: statuses || [],
    }
    return this
  }

  build() {
    return this.filters
  }

  static buildDefault() {
    const defaultFilters = {}
    defaultFilters[REQUEST_FILTER_PARAMS.SOURCE] = ''
    defaultFilters[REQUEST_FILTER_PARAMS.SESSION] = ''
    defaultFilters[REQUEST_FILTER_PARAMS.PROVIDER_IDS] = TableFilterDefaultStateEnum.VALUES
    defaultFilters[REQUEST_FILTER_PARAMS.CREATION_DATE] = TableFilterDefaultStateEnum.DATES
    defaultFilters[REQUEST_FILTER_PARAMS.REQUEST_TYPE] = TableFilterDefaultStateEnum.VALUES
    defaultFilters[REQUEST_FILTER_PARAMS.REQUEST_STATE] = TableFilterDefaultStateEnum.VALUES
    return defaultFilters
  }
}
