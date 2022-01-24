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
 * Sort  enumeration
 */
export const SORT_ORDERS_ENUM = {
  NO_SORT: 'NO_SORT',
  ASCENDING_ORDER: 'ASCENDING_ORDER',
  DESCENDING_ORDER: 'DESCENDING_ORDER',
}

/** Possible enumeration values */
export const SORT_ORDERS = values(SORT_ORDERS_ENUM)

/**
 * Returns next sort order from current
 */
export const getNextSortOrder = (sorting) => {
  switch (sorting) {
    case SORT_ORDERS_ENUM.NO_SORT:
      return SORT_ORDERS_ENUM.ASCENDING_ORDER
    case SORT_ORDERS_ENUM.ASCENDING_ORDER:
      return SORT_ORDERS_ENUM.DESCENDING_ORDER
    case SORT_ORDERS_ENUM.DESCENDING_ORDER:
      return SORT_ORDERS_ENUM.NO_SORT
    default:
      throw new Error(`Unknown sorting order ${sorting}`)
  }
}
