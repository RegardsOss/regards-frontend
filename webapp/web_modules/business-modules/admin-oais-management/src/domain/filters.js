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
import { DamDomain, IngestDomain, CommonDomain } from '@regardsoss/domain'
import { VERSION_OPTIONS } from './versionOptions'

/**
 * Filters definitions
 * @author Théo Lasserre
 */

/**
 * Possible filters parameters
 * values are properties names sent to backend
 */
export const AIP_FILTER_PARAMS = {
  AIP_STATE: 'aipStates',
  AIP_IP_TYPE: 'aipIpTypes',
  LAST_UPDATE: 'lastUpdate',
  PROVIDER_IDS: 'providerIds',
  SOURCE: 'sessionOwner',
  SESSION: 'session',
  STORAGES: 'storages',
  CATEGORIES: 'categories',
  TAGS: 'tags',
  LAST: 'last',
  AIP_IDS: 'aipIds',
}

export const REQUEST_FILTER_PARAMS = {
  REQUEST_IDS: 'requestIds',
  PROVIDER_IDS: 'providerIds',
  SOURCE: 'sessionOwner',
  SESSION: 'session',
  CREATION_DATE: 'creationDate',
  REQUEST_STATE: 'requestStates',
  REQUEST_TYPE: 'requestTypes',
}

/**
 * AIP tab default form state used in filters pane
 */
export const AIP_DEFAULT_FILTERS_STATE = {
  [AIP_FILTER_PARAMS.SOURCE]: '',
  [AIP_FILTER_PARAMS.SESSION]: '',
  [AIP_FILTER_PARAMS.PROVIDER_IDS]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  [AIP_FILTER_PARAMS.LAST_UPDATE]: CommonDomain.TableFilterDefaultStateEnum.DATES,
  [AIP_FILTER_PARAMS.AIP_IP_TYPE]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  [AIP_FILTER_PARAMS.AIP_STATE]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  [AIP_FILTER_PARAMS.STORAGES]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  [AIP_FILTER_PARAMS.LAST]: null,
}

/**
   * Requests tab default form state used in filters pane
   */
export const REQUESTS_DEFAULT_FILTERS_STATE = {
  [REQUEST_FILTER_PARAMS.SOURCE]: '',
  [REQUEST_FILTER_PARAMS.SESSION]: '',
  [REQUEST_FILTER_PARAMS.PROVIDER_IDS]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  [REQUEST_FILTER_PARAMS.CREATION_DATE]: CommonDomain.TableFilterDefaultStateEnum.DATES,
  [REQUEST_FILTER_PARAMS.REQUEST_ID_TYPE]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  [REQUEST_FILTER_PARAMS.REQUEST_STATE]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
}

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const AIP_FILTERS_I18N = {
  [AIP_FILTER_PARAMS.AIP_STATE]: {
    labelKey: 'oais.list.filters.aipState.label',
    hintTextKey: 'oais.list.filters.aipState.label',
    chipValueKeys: reduce(IngestDomain.AIP_STATUS, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.aipState.${value}`,
    }), {}),
  },
  [AIP_FILTER_PARAMS.AIP_IP_TYPE]: {
    labelKey: 'oais.list.filters.aipIdType.label',
    hintTextKey: 'oais.list.filters.aipIdType.label',
    chipValueKeys: reduce(DamDomain.ENTITY_TYPES, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.aipIdType.${value}`,
    }), {}),
  },
  [AIP_FILTER_PARAMS.LAST_UPDATE]: {
    labelKey: 'oais.list.filters.lastUpdate.label',
  },
  [AIP_FILTER_PARAMS.PROVIDER_IDS]: {
    labelKey: 'oais.list.filters.providerIds.label',
    hintTextKey: 'oais.list.filters.providerIds.label',
  },
  [AIP_FILTER_PARAMS.SOURCE]: {
    labelKey: 'oais.list.filters.sessionOwner.label',
    hintTextKey: 'oais.list.filters.sessionOwner.label',
  },
  [AIP_FILTER_PARAMS.SESSION]: {
    labelKey: 'oais.list.filters.session.label',
    hintTextKey: 'oais.list.filters.session.label',
  },
  [AIP_FILTER_PARAMS.STORAGES]: {
    labelKey: 'oais.list.filters.storages.label',
    hintTextKey: 'oais.list.filters.storages.label',
    // chipValueKeys is not needed since we display raw selected value
  },
  [AIP_FILTER_PARAMS.LAST]: {
    labelKey: 'oais.list.filters.last.label',
    chipValueKeys: reduce(VERSION_OPTIONS, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.last.${value}`,
    }), {}),
  },
}
/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const REQUEST_FILTERS_I18N = {
  [REQUEST_FILTER_PARAMS.PROVIDER_IDS]: {
    labelKey: 'oais.list.filters.providerIds.label',
    hintTextKey: 'oais.list.filters.providerIds.label',
  },
  [REQUEST_FILTER_PARAMS.CREATION_DATE]: {
    labelKey: 'oais.requests.list.filters.creationDate.label',
  },
  [REQUEST_FILTER_PARAMS.SOURCE]: {
    labelKey: 'oais.list.filters.sessionOwner.label',
    hintTextKey: 'oais.list.filters.sessionOwner.label',
  },
  [REQUEST_FILTER_PARAMS.SESSION]: {
    labelKey: 'oais.list.filters.session.label',
    hintTextKey: 'oais.list.filters.session.label',
  },
  [REQUEST_FILTER_PARAMS.REQUEST_TYPE]: {
    labelKey: 'oais.requests.list.filters.requestType.label',
    hintTextKey: 'oais.requests.list.filters.requestType.label',
    chipValueKeys: reduce(IngestDomain.AIP_REQUEST_TYPES, (acc, value) => ({
      ...acc,
      [value]: `oais.requests.list.filters.requestType.${value}`,
    }), {}),
  },
  [REQUEST_FILTER_PARAMS.REQUEST_STATE]: {
    labelKey: 'oais.list.filters.requestState.label',
    hintTextKey: 'oais.list.filters.requestState.label',
    chipValueKeys: reduce(IngestDomain.AIP_REQUEST_STATUS, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.requestState.${value}`,
    }), {}),
  },
}
