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
import { DamDomain, IngestDomain } from '@regardsoss/domain'
import { VERSION_OPTIONS } from './versionOptions'

/**
 * Filters definitions
 * @author Théo Lasserre
 */

/**
 * Possible filters parameters
 * values are properties names sent to backend
 */
export const FILTER_PARAMS = {
  SOURCE: 'sessionOwner',
  SESSION: 'session',
  PROVIDER_IDS: 'providerIds',
  LAST_UPDATE: 'lastUpdate',
  CREATION_DATE: 'creationDate',
  FROM: 'from',
  TO: 'to',
  AIP_STATE: 'aipStates',
  REQUEST_STATE: 'requestStates',
  STORAGES: 'storages',
  AIP_IP_TYPE: 'aipIpTypes',
  REQUEST_ID_TYPE: 'requestIdType',
  LAST: 'last',
  AIP_IDS: 'aipIds',
}

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [FILTER_PARAMS.LAST_UPDATE]: {
    labelKey: 'oais.list.filters.lastUpdate.label',
  },
  [FILTER_PARAMS.SOURCE]: {
    labelKey: 'oais.list.filters.sessionOwner.label',
    hintTextKey: 'oais.list.filters.sessionOwner.label',
  },
  [FILTER_PARAMS.SESSION]: {
    labelKey: 'oais.list.filters.session.label',
    hintTextKey: 'oais.list.filters.session.label',
  },
  [FILTER_PARAMS.PROVIDER_IDS]: {
    labelKey: 'oais.list.filters.providerIds.label',
    hintTextKey: 'oais.list.filters.providerIds.label',
  },
  [FILTER_PARAMS.AIP_IP_TYPE]: {
    labelKey: 'oais.list.filters.aipIdType.label',
    hintTextKey: 'oais.list.filters.aipIdType.label',
    chipValueKeys: reduce(DamDomain.ENTITY_TYPES, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.aipIdType.${value}`,
    }), {}),
  },
  [FILTER_PARAMS.AIP_STATE]: {
    labelKey: 'oais.list.filters.aipState.label',
    hintTextKey: 'oais.list.filters.aipState.label',
    chipValueKeys: reduce(IngestDomain.AIP_STATUS, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.aipState.${value}`,
    }), {}),
  },
  [FILTER_PARAMS.STORAGES]: {
    labelKey: 'oais.list.filters.storages.label',
    hintTextKey: 'oais.list.filters.storages.label',
    // chipValueKeys is not needed since we display raw selected value
  },
  [FILTER_PARAMS.LAST]: {
    labelKey: 'oais.list.filters.last.label',
    chipValueKeys: reduce(VERSION_OPTIONS, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.last.${value}`,
    }), {}),
  },
  [FILTER_PARAMS.REQUEST_ID_TYPE]: {
    labelKey: 'oais.list.filters.requestIdType.label',
    hintTextKey: 'oais.list.filters.requestIdType.label',
    chipValueKeys: reduce(IngestDomain.AIP_REQUEST_TYPES, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.requestIdType.${value}`,
    }), {}),
  },
  [FILTER_PARAMS.REQUEST_STATE]: {
    labelKey: 'oais.list.filters.requestState.label',
    hintTextKey: 'oais.list.filters.requestState.label',
    chipValueKeys: reduce(IngestDomain.AIP_REQUEST_STATUS, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.requestState.${value}`,
    }), {}),
  },
}
