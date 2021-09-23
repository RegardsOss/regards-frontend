/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { CommonDomain } from '@regardsoss/domain'

/**
 * Get the id of an active Sort Option
 */
export const getSortConfigId = (sortOption) => sortOption.attribute.content.id

/**
 * @returns true when two sort options are equals
 */
export const areSortOptionsEquals = (sortConf, currentSorting) => getSortConfigId(sortConf) === getSortConfigId(currentSorting)

/**
 * ID related to an attribute newly created
 */
const NEW_SORT_OPTION_ID = -50

/**
 * @returns true when sortConfId is NEW_SORT_OPTION_ID
 */
export const isNewSortConfigId = (sortConfId) => sortConfId === NEW_SORT_OPTION_ID

/**
 * @returns true when sortConf is a new sort conf
 */
export const isNewSortConfig = (sortConf) => isNewSortConfigId(getSortConfigId(sortConf))

/**
 * @returns a new sorting option that only exists on the form
 */
export const getNewSortConfig = () => ({
  uncomplete: true,
  sortOrder: CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER,
  attribute: {
    content: {
      id: NEW_SORT_OPTION_ID,
    },
  },
})
