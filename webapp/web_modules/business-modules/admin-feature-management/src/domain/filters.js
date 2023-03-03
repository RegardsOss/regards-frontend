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
import { FemDomain } from '@regardsoss/domain'
import { DISSEMINATION_PENDING_VALUES } from './DisseminationStatus'

/**
 * Filter params
 * @author Théo Lasserre
 */

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [FemDomain.REQUEST_FILTER_PARAMS.LAST_UPDATE]: {
    labelKey: 'feature.list.filters.lastUpdate.label',
  },
  [FemDomain.REQUEST_FILTER_PARAMS.SOURCE]: {
    labelKey: 'feature.list.filters.source.label',
    hintTextKey: 'feature.list.filters.source.label',
  },
  [FemDomain.REQUEST_FILTER_PARAMS.SESSION]: {
    labelKey: 'feature.list.filters.session.label',
    hintTextKey: 'feature.list.filters.session.label',
  },
  [FemDomain.REQUEST_FILTER_PARAMS.PROVIDER_IDS]: {
    labelKey: 'feature.list.filters.providerId.label',
    hintTextKey: 'feature.list.filters.providerId.label',
  },
  [FemDomain.REQUEST_FILTER_PARAMS.DISSEMINATION_PENDING]: {
    labelKey: 'feature.list.filters.disseminationPending.label',
    chipValueKeys: reduce(DISSEMINATION_PENDING_VALUES, (acc, value) => ({
      ...acc,
      [value]: `feature.list.filters.disseminationPending.${value}`,
    }), {}),
  },
  [FemDomain.REQUEST_FILTER_PARAMS.STATE]: {
    labelKey: 'feature.list.filters.state.label',
    hintTextKey: 'feature.list.filters.state.label',
    chipValueKeys: reduce(FemDomain.REQUEST_STATUS, (acc, value) => ({
      ...acc,
      [value]: `feature.list.filters.state.${value}`,
    }), {}),
  },
}
