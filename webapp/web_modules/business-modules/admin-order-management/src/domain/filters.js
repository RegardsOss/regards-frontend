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
import { OrderDomain } from '@regardsoss/domain'
import { WAITING_FOR_USER_ENUM } from './waitingForUserFilterValues'

/**
 * Filters definitions
 * @author Théo Lasserre
 */

/**
 * Possible filters parameters
 * values are properties names sent to backend (ex: creationDate)
 */
export const FILTER_PARAMS = {
  OWNER: 'owner',
  CREATION_DATE: 'creationDate',
  STATUSES: 'statuses',
  WAITING_FOR_USER: 'waitingForUser',
}

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [FILTER_PARAMS.CREATION_DATE]: {
    labelKey: 'order.list.filters.creationDate.label',
  },
  [FILTER_PARAMS.OWNER]: {
    labelKey: 'order.list.filters.owner.label',
    hintTextKey: 'order.list.filters.owner.label',
  },
  [FILTER_PARAMS.STATUSES]: {
    labelKey: 'order.list.filters.statuses.label',
    hintTextKey: 'order.list.filters.statuses.label',
    chipValueKeys: reduce(OrderDomain.ORDER_STATUS, (acc, value) => ({
      ...acc,
      [value]: `order.list.filters.statuses.${value}`,
    }), {}),
  },
  [FILTER_PARAMS.WAITING_FOR_USER]: {
    labelKey: 'order.list.filters.waitingForUser.label',
    chipValueKeys: reduce(WAITING_FOR_USER_ENUM, (acc, value) => ({
      ...acc,
      [value]: `order.list.filters.waitingForUser.${value}`,
    }), {}),
  },
}
