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
import values from 'lodash/values'
/**
  * Filters definitions
  * @author Théo Lasserre
  */

/**
  * Possible filters parameters
  * values are properties names sent to backend (ex: dispatchedWorkerType)
  */
export const FILTER_PARAMS_ENUM = {
  SOURCE: 'source',
  SESSION: 'session',
  WORKER_TYPE: 'dispatchedWorkerType',
  CONTENT_TYPES: 'contentTypes',
  STATUSES: 'statuses',
  CREATION_DATE: 'creationDate',
  IDS: 'ids',
}

export const FILTER_PARAMS = values(FILTER_PARAMS_ENUM)
