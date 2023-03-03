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

/**
 * @author Sébastien Binda
 */
import { REQUEST_PARAMETERS, TableFilterDefaultStateEnum } from '../common'

/**
 * Possible filters parameters
 * values are properties names sent to backend
 */
export const AIP_FILTER_PARAMS = {
  AIP_STATE: 'aipStates',
  AIP_IP_TYPE: 'aipIpTypes',
  LAST_UPDATE: 'lastUpdate',
  PROVIDER_IDS: 'providerIds',
  SOURCE: 'sessionOwner',
  SESSION: 'session',
  STORAGES: 'storages',
  CATEGORIES: 'categories',
  TAGS: 'tags',
  LAST: 'last',
  AIP_IDS: 'aipIds',
}

/**
 * Class to construct Ingest products search body parameters
 */
export class AipFilters {
  constructor() {
    this.filters = {}
  }

  static builder(source, session) {
    return new AipFilters().withSession(session).withSource(source)
  }

  withSession(session) {
    this.filters[AIP_FILTER_PARAMS.SESSION] = session
    return this
  }

  withSource(source) {
    this.filters[AIP_FILTER_PARAMS.SOURCE] = source
    return this
  }

  withAipIds(aipIds, mode) {
    this.filters[AIP_FILTER_PARAMS.AIP_IDS] = {
      [REQUEST_PARAMETERS.VALUES]: aipIds || [],
      [REQUEST_PARAMETERS.MODE]: mode,
    }
    return this
  }

  build() {
    return this.filters
  }

  static buildDefault() {
    return {
      [AIP_FILTER_PARAMS.SOURCE]: '',
      [AIP_FILTER_PARAMS.SESSION]: '',
      [AIP_FILTER_PARAMS.PROVIDER_IDS]: TableFilterDefaultStateEnum.VALUES,
      [AIP_FILTER_PARAMS.LAST_UPDATE]: TableFilterDefaultStateEnum.DATES,
      [AIP_FILTER_PARAMS.AIP_IP_TYPE]: TableFilterDefaultStateEnum.VALUES,
      [AIP_FILTER_PARAMS.AIP_STATE]: TableFilterDefaultStateEnum.VALUES,
      [AIP_FILTER_PARAMS.STORAGES]: TableFilterDefaultStateEnum.VALUES,
      [AIP_FILTER_PARAMS.LAST]: null,
    }
  }
}
