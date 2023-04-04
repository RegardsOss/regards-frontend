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

/**
 * Project users filters definitions
 * @author Théo Lasserre
 */

/**
 * Possible filters parameters
 * values are properties names sent to backend (ex: lastConnection)
 */
export const FILTER_PARAMS = {
  CREATION_DATE: 'creationDate',
  LAST_CONNECTION: 'lastConnection',
  EMAIL: 'email',
  FIRSTNAME: 'firstName',
  LASTNAME: 'lastName',
  STATUS: 'status',
  ORIGIN: 'origins',
  ROLE: 'roles',
  USE_QUOTA_LIMITATION: 'quotaWarningCount',
  GROUP: 'accessGroups',
}

/**
 * Class to construct Ingest products search body parameters
 */
export class ProjectUserFilters {
  constructor() {
    this.filters = {}
  }

  static builder(label = null) {
    const filters = new ProjectUserFilters()
    return filters
  }

  build() {
    return this.filters
  }

  withGroup(accessGroup) {
    this.filters[FILTER_PARAMS.GROUP] = {
      ...TableFilterDefaultStateEnum.VALUES,
      [REQUEST_PARAMETERS.VALUES]: [accessGroup],
    }
    return this
  }

  /**
   * Default account project user mode filters
   * @returns
   */
  static buildAccountDefault() {
    return {
      [FILTER_PARAMS.CREATION_DATE]: TableFilterDefaultStateEnum.DATES,
      [FILTER_PARAMS.LAST_CONNECTION]: TableFilterDefaultStateEnum.DATES,
      [FILTER_PARAMS.EMAIL]: '',
      [FILTER_PARAMS.LASTNAME]: '',
      [FILTER_PARAMS.FIRSTNAME]: '',
      [FILTER_PARAMS.STATUS]: TableFilterDefaultStateEnum.VALUES,
      [FILTER_PARAMS.ORIGIN]: TableFilterDefaultStateEnum.VALUES,
      [FILTER_PARAMS.ROLE]: TableFilterDefaultStateEnum.VALUES,
    }
  }

  /**
   * Default quota project user mode filters
   */
  static buildQuotaDefault() {
    return {
      [FILTER_PARAMS.EMAIL]: '',
      [FILTER_PARAMS.LASTNAME]: '',
      [FILTER_PARAMS.FIRSTNAME]: '',
      [FILTER_PARAMS.USE_QUOTA_LIMITATION]: false,
    }
  }

  /**
   * Default access right project user mode filters
   */
  static buildAccessRightDefault() {
    return {
      [FILTER_PARAMS.EMAIL]: '',
      [FILTER_PARAMS.LASTNAME]: '',
      [FILTER_PARAMS.FIRSTNAME]: '',
      [FILTER_PARAMS.GROUP]: TableFilterDefaultStateEnum.VALUES,
    }
  }
}
