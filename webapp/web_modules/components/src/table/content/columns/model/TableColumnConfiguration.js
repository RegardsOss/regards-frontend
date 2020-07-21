/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Column configuration entity
 * @author Sébastien Binda
 */

/** A cell builder */
export const CellDefinition = PropTypes.shape({
  // React cell content constructor
  Constructor: PropTypes.func,
  // built cell default properties
  // eslint-disable-next-line react/forbid-prop-types
  props: PropTypes.object, // note: the style properties can be used here to override default cell styles
})

/** a table column (order information is provided by columns array) */
export const TableColumnConfiguration = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // The instantiated header cell (optional, remove to get an headerless columns)
  headerCellDefinition: CellDefinition,
  // define the table cell
  rowCellDefinition: CellDefinition.isRequired,
  // Optional fixed width: if provided the column is always the same size (do not provide to get an adapting column)
  fixedWidth: PropTypes.number,
  // Is column visible?
  visible: PropTypes.bool.isRequired,
})
