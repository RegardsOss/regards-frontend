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
 **/

/**
 * Possible filters parameters
 * values are properties names sent to backend (ex: sessionName)
 */
export const SESSION_FILTER_PARAMS = {
  NAME: 'sessionName',
  STATUS: 'sessionState',
  SELECTED_SESSION: 'session',
}

/**
 * Possible filters parameters
 * values are properties names sent to backend (ex: sourceName)
 */
export const SOURCE_FILTER_PARAMS = {
  NAME: 'sourceName',
  STATUS: 'sourceState',
  SELECTED_SOURCE: 'source',
}

/**
 * Class to construct Dashboard search body parameters
 */
export class DashboardFilters {
  constructor() {
    this.filters = {}
  }

  static builder(source = null, session = null) {
    const filters = new DashboardFilters()
    if (session) {
      filters.withSession(session)
    }
    if (source) {
      filters.withSource(source)
    }
    return filters
  }

  withSession(session) {
    this.filters[SESSION_FILTER_PARAMS.NAME] = session
    return this
  }

  withSource(source) {
    this.filters[SOURCE_FILTER_PARAMS.NAME] = source
    return this
  }

  withSourceStatusIncluded(status) {
    this.filters[SOURCE_FILTER_PARAMS.STATUS] = status
    return this
  }

  withSessionStatusIncluded(status) {
    this.filters[SESSION_FILTER_PARAMS.STATUS] = status
    return this
  }

  withSelectedSource(selectedSource = null) {
    this.filters[SOURCE_FILTER_PARAMS.SELECTED_SOURCE] = selectedSource
    return this
  }

  withSelectedSession(selectedSession = null) {
    this.filters[SESSION_FILTER_PARAMS.SELECTED_SESSION] = selectedSession
    return this
  }

  build() {
    return this.filters
  }

  static buildDefault() {
    return {
      [SOURCE_FILTER_PARAMS.NAME]: '',
      [SOURCE_FILTER_PARAMS.STATUS]: null,
      [SESSION_FILTER_PARAMS.NAME]: '',
      [SESSION_FILTER_PARAMS.STATUS]: null,
    }
  }
}
