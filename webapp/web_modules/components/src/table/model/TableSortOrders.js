/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Column sorting enumeration
 */
export const TableSortOrders = {
  NO_SORT: 'no.sort',
  ASCENDING_ORDER: 'ascending.order',
  DESCENDING_ORDER: 'descending.order',
}
/**
 * Returns next sort order from current
 */
export const getNextSortOrder = (sorting) => {
  switch (sorting) {
    case TableSortOrders.NO_SORT:
      return TableSortOrders.ASCENDING_ORDER
    case TableSortOrders.ASCENDING_ORDER:
      return TableSortOrders.DESCENDING_ORDER
    case TableSortOrders.DESCENDING_ORDER:
      return TableSortOrders.NO_SORT
    default:
      throw new Error(`Unknown sorting order ${sorting}`)
  }
}
