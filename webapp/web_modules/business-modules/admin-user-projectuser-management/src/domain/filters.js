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
import reduce from 'lodash/reduce'
import { AdminDomain } from '@regardsoss/domain'

/**
 * @author Théo Lasserre
 */

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [AdminDomain.FILTER_PARAMS.CREATION_DATE]: {
    labelKey: 'projectUser.list.table.created',
  },
  [AdminDomain.FILTER_PARAMS.LAST_CONNECTION]: {
    labelKey: 'projectUser.list.table.lastConnection',
  },
  [AdminDomain.FILTER_PARAMS.EMAIL]: {
    labelKey: 'projectUser.list.table.email.label',
    hintTextKey: 'projectUser.list.table.email.label',
  },
  [AdminDomain.FILTER_PARAMS.LASTNAME]: {
    labelKey: 'projectUser.list.table.lastName.label',
    hintTextKey: 'projectUser.list.table.lastName.label',
  },
  [AdminDomain.FILTER_PARAMS.FIRSTNAME]: {
    labelKey: 'projectUser.list.table.firstName.label',
    hintTextKey: 'projectUser.list.table.firstName.label',
  },
  [AdminDomain.FILTER_PARAMS.STATUS]: {
    labelKey: 'projectUser.list.table.status.label',
    hintTextKey: 'projectUser.list.table.status.label',
    chipValueKeys: reduce(AdminDomain.PROJECT_USER_STATUS, (acc, value) => ({
      ...acc,
      [value]: `projectUser.list.table.status.${value}`,
    }), {}),
  },
  [AdminDomain.FILTER_PARAMS.ORIGIN]: {
    labelKey: 'projectUser.list.table.origin.label',
    hintTextKey: 'projectUser.list.table.origin.label',
    // chipValueKeys is not needed since we display raw selected value
  },
  [AdminDomain.FILTER_PARAMS.ROLE]: {
    labelKey: 'projectUser.list.table.role.label',
    hintTextKey: 'projectUser.list.table.role.label',
    // chipValueKeys are built in ProjectUserListComponent
  },
  [AdminDomain.FILTER_PARAMS.USE_QUOTA_LIMITATION]: {
    labelKey: 'projectUser.list.only.low.quota',
  },
  [AdminDomain.FILTER_PARAMS.GROUP]: {
    labelKey: 'projectUser.list.table.accessGroup.label',
    hintTextKey: 'projectUser.list.table.accessGroup.label',
    // chipValueKeys is not needed since we display raw selected value
  },
}
