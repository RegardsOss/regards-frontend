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
import values from 'lodash/values'

/**
 * @author Théo Lasserre
 */
export const REQUEST_PARAMETERS = {
  VALUES: 'values',
  MODE: 'mode',
  AFTER: 'after',
  BEFORE: 'before',
  IGNORE_CASE: 'ignoreCase',
  MATCH_MODE: 'matchMode',
}

export const MATCH_MODE_ENUM = {
  STRICT: 'STRICT',
  STARTS_WITH: 'STARTS_WITH',
  ENDS_WITH: 'ENDS_WITH',
  CONTAINS: 'CONTAINS',
}

export const MATCH_MODE = values(MATCH_MODE_ENUM)
