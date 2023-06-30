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
import { DamDomain, IngestDomain } from '@regardsoss/domain'
import { VERSION_OPTIONS } from './versionOptions'

/**
 * Filters definitions
 * @author Théo Lasserre
 */

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const AIP_FILTERS_I18N = {
  [IngestDomain.AIP_FILTER_PARAMS.AIP_STATE]: {
    labelKey: 'oais.list.filters.aipState.label',
    hintTextKey: 'oais.list.filters.aipState.label',
    chipValueKeys: reduce(IngestDomain.AIP_STATUS, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.aipState.${value}`,
    }), {}),
  },
  [IngestDomain.AIP_FILTER_PARAMS.AIP_IP_TYPE]: {
    labelKey: 'oais.list.filters.aipIdType.label',
    hintTextKey: 'oais.list.filters.aipIdType.label',
    chipValueKeys: reduce(DamDomain.ENTITY_TYPES, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.aipIdType.${value}`,
    }), {}),
  },
  [IngestDomain.AIP_FILTER_PARAMS.LAST_UPDATE]: {
    labelKey: 'oais.list.filters.lastUpdate.label',
  },
  [IngestDomain.AIP_FILTER_PARAMS.PROVIDER_IDS]: {
    labelKey: 'oais.list.filters.providerIds.label',
    hintTextKey: 'oais.list.filters.providerIds.label',
  },
  [IngestDomain.AIP_FILTER_PARAMS.SOURCE]: {
    labelKey: 'oais.list.filters.sessionOwner.label',
    hintTextKey: 'oais.list.filters.sessionOwner.label',
  },
  [IngestDomain.AIP_FILTER_PARAMS.SESSION]: {
    labelKey: 'oais.list.filters.session.label',
    hintTextKey: 'oais.list.filters.session.label',
  },
  [IngestDomain.AIP_FILTER_PARAMS.STORAGES]: {
    labelKey: 'oais.list.filters.storages.label',
    hintTextKey: 'oais.list.filters.storages.label',
    // chipValueKeys is not needed since we display raw selected value
  },
  [IngestDomain.AIP_FILTER_PARAMS.LAST]: {
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
  [IngestDomain.REQUEST_FILTER_PARAMS.PROVIDER_IDS]: {
    labelKey: 'oais.list.filters.providerIds.label',
    hintTextKey: 'oais.list.filters.providerIds.label',
  },
  [IngestDomain.REQUEST_FILTER_PARAMS.CREATION_DATE]: {
    labelKey: 'oais.requests.list.filters.creationDate.label',
  },
  [IngestDomain.REQUEST_FILTER_PARAMS.SOURCE]: {
    labelKey: 'oais.list.filters.sessionOwner.label',
    hintTextKey: 'oais.list.filters.sessionOwner.label',
  },
  [IngestDomain.REQUEST_FILTER_PARAMS.SESSION]: {
    labelKey: 'oais.list.filters.session.label',
    hintTextKey: 'oais.list.filters.session.label',
  },
  [IngestDomain.REQUEST_FILTER_PARAMS.REQUEST_TYPE]: {
    labelKey: 'oais.requests.list.filters.requestType.label',
    hintTextKey: 'oais.requests.list.filters.requestType.label',
    chipValueKeys: reduce(IngestDomain.AIP_REQUEST_TYPES, (acc, value) => ({
      ...acc,
      [value]: `oais.requests.list.filters.requestType.${value}`,
    }), {}),
  },
  [IngestDomain.REQUEST_FILTER_PARAMS.REQUEST_STATE]: {
    labelKey: 'oais.list.filters.requestState.label',
    hintTextKey: 'oais.list.filters.requestState.label',
    chipValueKeys: reduce(IngestDomain.AIP_REQUEST_STATUS, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.requestState.${value}`,
    }), {}),
  },
  [IngestDomain.REQUEST_FILTER_PARAMS.ERROR_TYPES]: {
    labelKey: 'oais.list.filters.errorType.label',
    hintTextKey: 'oais.list.filters.errorType.label',
    chipValueKeys: reduce(IngestDomain.REQUEST_ERROR_CODES, (acc, value) => ({
      ...acc,
      [value]: `oais.list.filters.errorType.${value}`,
    }), {}),
  },
}
