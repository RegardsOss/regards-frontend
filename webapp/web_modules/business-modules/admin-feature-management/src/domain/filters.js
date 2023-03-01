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
import { FemDomain, CommonDomain } from '@regardsoss/domain'
import { DISSEMINATION_PENDING_VALUES } from './DisseminationStatus'

/**
 * Filter params
 * @author Théo Lasserre
 */

/** Possible filter params */
export const FILTER_PARAMS = {
  SOURCE: 'source',
  SESSION: 'session',
  PROVIDER_IDS: 'providerIds',
  LAST_UPDATE: 'lastUpdate',
  STATE: 'states',
  DISSEMINATION_PENDING: 'disseminationPending',
  IDS: 'featureIds',
  REQUEST_IDS: 'requestIds',
}

/**
 * References default state for filters edition
 */
export const REFERENCES_DEFAULT_FILTERS_STATE = {
  [FILTER_PARAMS.SOURCE]: '',
  [FILTER_PARAMS.SESSION]: '',
  [FILTER_PARAMS.PROVIDER_IDS]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  [FILTER_PARAMS.LAST_UPDATE]: CommonDomain.TableFilterDefaultStateEnum.DATES,
  [FILTER_PARAMS.DISSEMINATION_PENDING]: null,
}

/**
 * Requests default state for filters edition
 */
export const REQUESTS_DEFAULT_FILTERS_STATE = {
  [FILTER_PARAMS.SOURCE]: '',
  [FILTER_PARAMS.SESSION]: '',
  [FILTER_PARAMS.PROVIDER_IDS]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  [FILTER_PARAMS.LAST_UPDATE]: CommonDomain.TableFilterDefaultStateEnum.DATES,
  [FILTER_PARAMS.STATE]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
}

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [FILTER_PARAMS.LAST_UPDATE]: {
    labelKey: 'feature.list.filters.lastUpdate.label',
  },
  [FILTER_PARAMS.SOURCE]: {
    labelKey: 'feature.list.filters.source.label',
    hintTextKey: 'feature.list.filters.source.label',
  },
  [FILTER_PARAMS.SESSION]: {
    labelKey: 'feature.list.filters.session.label',
    hintTextKey: 'feature.list.filters.session.label',
  },
  [FILTER_PARAMS.PROVIDER_IDS]: {
    labelKey: 'feature.list.filters.providerId.label',
    hintTextKey: 'feature.list.filters.providerId.label',
  },
  [FILTER_PARAMS.DISSEMINATION_PENDING]: {
    labelKey: 'feature.list.filters.disseminationPending.label',
    chipValueKeys: reduce(DISSEMINATION_PENDING_VALUES, (acc, value) => ({
      ...acc,
      [value]: `feature.list.filters.disseminationPending.${value}`,
    }), {}),
  },
  [FILTER_PARAMS.STATE]: {
    labelKey: 'feature.list.filters.state.label',
    hintTextKey: 'feature.list.filters.state.label',
    chipValueKeys: reduce(FemDomain.REQUEST_STATUS, (acc, value) => ({
      ...acc,
      [value]: `feature.list.filters.state.${value}`,
    }), {}),
  },
}
