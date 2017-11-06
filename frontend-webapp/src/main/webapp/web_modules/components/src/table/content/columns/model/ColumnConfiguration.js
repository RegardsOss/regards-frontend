/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TableSortOrders } from '../../../model/TableSortOrders'

/**
 * Column configuration entity
 * @author Sébastien Binda
 */
const ColumnConfigurationModel = PropTypes.shape({
  // Label of the column
  label: PropTypes.string.isRequired,
  // Entity attributes to display as cell in the column
  attributes: PropTypes.arrayOf(PropTypes.string),
  // Custom react component to display attributes
  customCell: PropTypes.shape({
    component: PropTypes.func,
    props: PropTypes.object,
  }),
  // Number to fixe column width.
  fixed: PropTypes.number,
  // True to hide the column label in the header line of the table
  hideLabel: PropTypes.bool,
  // Does the column is sortable
  sortable: PropTypes.bool,
  // sort order (it not provided, no sort order will be the default)
  sortingOrder: PropTypes.oneOf(values(TableSortOrders)),
  // visible state management
  visible: PropTypes.bool,
})

export default ColumnConfigurationModel
