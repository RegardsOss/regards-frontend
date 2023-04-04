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
import { TableSelectionModes } from '@regardsoss/components'
import { TableFilterDefaultStateEnum, REQUEST_PARAMETERS } from '../common'

/** Possible filter params */
export const REFERENCE_FILTER_PARAMS = {
  SOURCE: 'source',
  SESSION: 'session',
  PROVIDER_IDS: 'providerIds',
  LAST_UPDATE: 'lastUpdate',
  DISSEMINATION_PENDING: 'disseminationPending',
  IDS: 'featureIds',
}

/**
 * Class to construct Ingest products search body parameters
 */
export class ReferenceFilters {
  constructor() {
    this.filters = {}
  }

  static builder(source = null, session = null) {
    const filters = new ReferenceFilters()
    if (session) {
      filters.withSession(session)
    }
    if (source) {
      filters.withSource(source)
    }
    return filters
  }

  withSession(session) {
    this.filters[REFERENCE_FILTER_PARAMS.SESSION] = session
    return this
  }

  withSource(source) {
    this.filters[REFERENCE_FILTER_PARAMS.SOURCE] = source
    return this
  }

  withReferenceIds(referenceIds, mode = TableSelectionModes.INCLUDE) {
    this.filters[REFERENCE_FILTER_PARAMS.IDS] = {
      ...TableFilterDefaultStateEnum.VALUES,
      [REQUEST_PARAMETERS.VALUES]: referenceIds,
      [REQUEST_PARAMETERS.MODE]: mode,
    }
    return this
  }

  build() {
    return this.filters
  }

  static buildDefault() {
    return {
      [REFERENCE_FILTER_PARAMS.SOURCE]: '',
      [REFERENCE_FILTER_PARAMS.SESSION]: '',
      [REFERENCE_FILTER_PARAMS.PROVIDER_IDS]: TableFilterDefaultStateEnum.VALUES,
      [REFERENCE_FILTER_PARAMS.LAST_UPDATE]: TableFilterDefaultStateEnum.DATES,
      [REFERENCE_FILTER_PARAMS.DISSEMINATION_PENDING]: null,
    }
  }
}
