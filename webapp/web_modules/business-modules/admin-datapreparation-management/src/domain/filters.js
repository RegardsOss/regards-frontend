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
import { WorkerDomain } from '@regardsoss/domain'

/**
 * Filters definitions
 * @author Théo Lasserre
 */

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [WorkerDomain.FILTER_PARAMS_ENUM.CREATION_DATE]: {
    labelKey: 'datapreparation.filters.creationDate.label',
  },
  [WorkerDomain.FILTER_PARAMS_ENUM.CONTENT_TYPES]: {
    labelKey: 'datapreparation.filters.contentTypes.label',
    hintTextKey: 'datapreparation.filters.contentTypes.label.hint',
  },
  [WorkerDomain.FILTER_PARAMS_ENUM.WORKER_TYPE]: {
    labelKey: 'datapreparation.filters.dispatchedWorkerType.label',
    hintTextKey: 'datapreparation.filters.dispatchedWorkerType.label',
  },
  [WorkerDomain.FILTER_PARAMS_ENUM.SOURCE]: {
    labelKey: 'datapreparation.filters.source.label',
    hintTextKey: 'datapreparation.filters.source.label',
  },
  [WorkerDomain.FILTER_PARAMS_ENUM.SESSION]: {
    labelKey: 'datapreparation.filters.session.label',
    hintTextKey: 'datapreparation.filters.session.label',
  },
  [WorkerDomain.FILTER_PARAMS_ENUM.STATUSES]: {
    labelKey: 'datapreparation.filters.statuses.label',
    hintTextKey: 'datapreparation.filters.statuses.label',
    chipValueKeys: reduce(WorkerDomain.REQUEST_STATUS, (acc, status) => ({
      ...acc,
      [status]: `datapreparation.filters.statuses.${status}`,
    }), {}),
  },
}
