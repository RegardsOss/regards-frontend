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
import { ProcessingDomain } from '@regardsoss/domain'

/**
 * Filters definitions
 * @author Théo Lasserre
 */

/**
 * Possible filters parameters
 * values are properties names sent to backend (ex: processBusinessId)
 */
export const FILTER_PARAMS = {
  CREATION_DATE: 'creationDate',
  USERNAME: 'userEmail',
  PROCESS_BID: 'processBusinessId',
  STATUS: 'status',
}

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [FILTER_PARAMS.CREATION_DATE]: {
    labelKey: 'processing.monitoring.filters.creationDate.label',
  },
  [FILTER_PARAMS.USERNAME]: {
    labelKey: 'processing.monitoring.filters.userEmail.label',
    hintTextKey: 'processing.monitoring.filters.userEmail.hint',
  },
  [FILTER_PARAMS.PROCESS_BID]: {
    labelKey: 'processing.monitoring.filters.processBusinessId.label',
    // chipValueKeys are built in ProcessingMonitoringComponent
  },
  [FILTER_PARAMS.STATUS]: {
    labelKey: 'processing.monitoring.filters.status.label',
    hintTextKey: 'processing.monitoring.filters.status.label',
    chipValueKeys: reduce(ProcessingDomain.PROCESS_STATUS_TYPES_VALUES, (acc, status) => ({
      ...acc,
      [status]: `processing.monitoring.filters.status.${status}`,
    }), {}),
  },
}
