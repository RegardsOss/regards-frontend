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
import { LTADomain } from '@regardsoss/domain'

/**
 * Filters definitions
 * @author Théo Lasserre
 */

/**
 * Possible filters parameters
 * values are properties names sent to backend (ex: firstName)
 */
export const FILTER_PARAMS = {
  SESSION: 'session',
  OWNER: 'owner',
  DATATYPE: 'datatype',
  CREATION_DATE: 'creationDate',
  STATUS_DATE: 'statusDate',
  STATUSES: 'statusesRestriction',
  IDS: 'idsRestriction',
}

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [FILTER_PARAMS.SESSION]: {
    labelKey: 'lta.filters.session.label',
    hintTextKey: 'lta.filters.session.label',
  },
  [FILTER_PARAMS.OWNER]: {
    labelKey: 'lta.filters.owner.label',
    hintTextKey: 'lta.filters.owner.label',
  },
  [FILTER_PARAMS.DATATYPE]: {
    labelKey: 'lta.filters.datatype.label',
    hintTextKey: 'lta.filters.datatype.label',
  },
  [FILTER_PARAMS.CREATION_DATE]: {
    labelKey: 'lta.filters.creationDate.label',
    hintTextKey: 'lta.filters.creationDate.label',
  },
  [FILTER_PARAMS.STATUS_DATE]: {
    labelKey: 'lta.filters.statusDate.label',
    hintTextKey: 'lta.filters.statusDate.label',
  },
  [FILTER_PARAMS.STATUSES]: {
    labelKey: 'lta.filters.statuses.label',
    hintTextKey: 'lta.filters.statuses.label',
    chipValueKeys: reduce(LTADomain.REQUEST_STATUS, (acc, status) => ({
      ...acc,
      [status]: `lta.table.column.status.${status}`,
    }), {}),
  },
}
