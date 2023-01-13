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
import { MODE_TYPES } from './modeTypes'
import { RUNNING_TYPES } from './runningTypes'

/**
 * Filters definitions
 * @author Théo Lasserre
 */

/**
 * Possible filters parameters
 * values are properties names sent to backend (ex: lastConnection)
 */
export const FILTER_PARAMS = {
  RUNNING: 'running',
  MODE: 'mode',
  LABEL: 'label',
}

/**
 * i18n filters keys used in filters pane and in filters chip
 * (required) labelKey is the internationalized name of a filter
 * (optional) chipValueKeys are the internationalized possible values of a SelectField type filter.
 */
export const FILTERS_I18N = {
  [FILTER_PARAMS.RUNNING]: {
    labelKey: 'acquisition-chain.list.filters.running.label',
    chipValueKeys: reduce(RUNNING_TYPES, (acc, value) => ({
      ...acc,
      [value]: `acquisition-chain.list.filters.running.${value}`,
    }), {}),
  },
  [FILTER_PARAMS.MODE]: {
    labelKey: 'acquisition-chain.list.filters.mode.label',
    chipValueKeys: reduce(MODE_TYPES, (acc, value) => ({
      ...acc,
      [value]: `acquisition-chain.list.filters.mode.${value}`,
    }), {}),
  },
  [FILTER_PARAMS.LABEL]: {
    labelKey: 'acquisition-chain.list.filters.label.label',
    hintTextKey: 'acquisition-chain.list.filters.label.label',
  },
}
