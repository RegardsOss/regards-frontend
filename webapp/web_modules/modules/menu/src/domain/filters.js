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
import reduce from 'lodash/reduce'
import { CommonDomain } from '@regardsoss/domain'
import { STATUS_ENUM } from './statusEnum'
import { LEVELS_ENUM } from './levelsEnum'

/**
 * Filters definitions
 * @author Théo Lasserre
 */

export const NOTIFICATION_FILTER_PARAMS = {
  LEVELS: 'levels',
  CREATION_DATE: 'dates',
  SENDERS: 'senders',
  STATUS: 'status',
  IDS: 'ids',
}

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const NOTIFICATION_FILTERS_I18N = {
  [NOTIFICATION_FILTER_PARAMS.LEVELS]: {
    hintTextKey: 'user.menu.notification.filters.levels.label',
    chipValueKeys: reduce(LEVELS_ENUM, (acc, value) => ({
      ...acc,
      [value]: `user.menu.notification.filters.levels.${value}`,
    }), {}),
  },
  [NOTIFICATION_FILTER_PARAMS.SENDERS]: {
    hintTextKey: 'user.menu.notification.filters.senders.label',
    // chipValueKeys is not needed since we display raw selected value
  },
  [NOTIFICATION_FILTER_PARAMS.STATUS]: {
    hintTextKey: 'user.menu.notification.filters.status.label',
    chipValueKeys: reduce(STATUS_ENUM, (acc, value) => ({
      ...acc,
      [value]: `user.menu.notification.filters.status.${value}`,
    }), {}),
  },
}

export class NotificationFilters {
  constructor() {
    this.filters = {}
  }

  withStatusIncluded(status) {
    this.filters[NOTIFICATION_FILTER_PARAMS.STATUS] = {
      ...CommonDomain.TableFilterDefaultStateEnum.VALUES,
      [CommonDomain.REQUEST_PARAMETERS.VALUES]: [status],
    }
    return this
  }

  withLevelsIncluded(levels) {
    this.filters[NOTIFICATION_FILTER_PARAMS.LEVELS] = {
      ...CommonDomain.TableFilterDefaultStateEnum.VALUES,
      [CommonDomain.REQUEST_PARAMETERS.VALUES]: levels,
    }
    return this
  }

  withNotificationIds(ids, mode) {
    this.filters[NOTIFICATION_FILTER_PARAMS.IDS] = {
      ...CommonDomain.TableFilterDefaultStateEnum.VALUES,
      [CommonDomain.REQUEST_PARAMETERS.VALUES]: ids || [],
      [CommonDomain.REQUEST_PARAMETERS.MODE]: mode,
    }
    return this
  }

  build() {
    return this.filters
  }
}
