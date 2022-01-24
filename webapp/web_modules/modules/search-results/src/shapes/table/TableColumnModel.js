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
import { AccessShapes } from '@regardsoss/shape'
import { CommonDomain } from '@regardsoss/domain'
import { TableColumnBuilder } from '@regardsoss/components'

/**
 * This files exposes table model column as consumed by SearchResultsComponent
 * @author Raphaël Mechali
 */

// points out a column that is not related with any attribute
export const TableColumnModel = PropTypes.shape({
  key: PropTypes.oneOf([TableColumnBuilder.optionsColumnKey, TableColumnBuilder.selectionColumnKey]).isRequired,
  visible: PropTypes.bool.isRequired,
  enableSorting: PropTypes.oneOf([false]).isRequired, // allows algorithm ignoring this column type
  sortOrder: PropTypes.oneOf([CommonDomain.SORT_ORDERS_ENUM.NO_SORT]), // same reason
})

/**
 * Possible column presentation model for results table
 */
export const ColumnPresentationModel = PropTypes.oneOfType([
  TableColumnModel,
  AccessShapes.AttributePresentationModel,
])

// list of columns
export const ColumnPresentationModelArray = PropTypes.arrayOf(ColumnPresentationModel)
