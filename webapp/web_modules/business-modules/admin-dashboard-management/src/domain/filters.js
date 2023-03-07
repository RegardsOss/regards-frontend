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
import { STATUS_TYPES } from './statusTypes'

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [AdminDomain.SOURCE_FILTER_PARAMS.NAME]: {
    labelKey: 'dashboard.filter.sourceName.label',
    hintTextKey: 'dashboard.filter.name',
  },
  [AdminDomain.SOURCE_FILTER_PARAMS.STATUS]: {
    labelKey: 'dashboard.filter.sourceState.label',
    chipValueKeys: reduce(STATUS_TYPES, (acc, status) => ({
      ...acc,
      [status]: `dashboard.filter.sourceState.${status}`,
    }), {}),
  },
  [AdminDomain.SESSION_FILTER_PARAMS.NAME]: {
    labelKey: 'dashboard.filter.sessionName.label',
    hintTextKey: 'dashboard.filter.name',
  },
  [AdminDomain.SESSION_FILTER_PARAMS.STATUS]: {
    labelKey: 'dashboard.filter.sessionState.label',
    chipValueKeys: reduce(STATUS_TYPES, (acc, status) => ({
      ...acc,
      [status]: `dashboard.filter.sessionState.${status}`,
    }), {}),
  },
}
