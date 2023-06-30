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
import { AdminInstanceDomain } from '@regardsoss/domain'

/**
 * Filters definitions
 * @author Théo Lasserre
 */

/**
 * Possible filters parameters
 * values are properties names sent to backend (ex: firstName)
 */
export const FILTER_PARAMS = {
  EMAIL: 'email',
  FIRSTNAME: 'firstName',
  LASTNAME: 'lastName',
  STATUS: 'status',
  ORIGIN: 'origin',
  PROJECT: 'project',
}

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [FILTER_PARAMS.EMAIL]: {
    labelKey: 'account.list.table.filters.email.label',
    hintTextKey: 'account.list.table.filters.email.label',
  },
  [FILTER_PARAMS.FIRSTNAME]: {
    labelKey: 'account.list.table.filters.firstName.label',
    hintTextKey: 'account.list.table.filters.firstName.label',
  },
  [FILTER_PARAMS.LASTNAME]: {
    labelKey: 'account.list.table.filters.lastName.label',
    hintTextKey: 'account.list.table.filters.lastName.label',
  },
  [FILTER_PARAMS.STATUS]: {
    labelKey: 'account.list.table.filters.status.label',
    chipValueKeys: reduce(AdminInstanceDomain.ACCOUNT_STATUS_ENUM, (acc, status) => ({
      ...acc,
      [status]: `account.list.table.filters.status.${status}`,
    }), {}),
  },
  [FILTER_PARAMS.ORIGIN]: {
    labelKey: 'account.list.table.filters.origin.label',
    // chipValueKeys is not needed since we display raw selected value
  },
  [FILTER_PARAMS.PROJECT]: {
    labelKey: 'account.list.table.filters.project.label',
    // chipValueKeys is not needed since we display raw selected value
  },
}
