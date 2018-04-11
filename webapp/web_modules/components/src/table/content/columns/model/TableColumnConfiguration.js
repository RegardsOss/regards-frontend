/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const TableColumnConfiguration = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  order: PropTypes.number, // optional column order (columns without order goes at the middle - index 1000)
  // The instantiated header cell (optional, remove to get an headerless columns)
  headerCell: PropTypes.node,
  // define the table cell
  rowCellDefinition: PropTypes.shape({
    // React cell content constructor
    Constructor: PropTypes.func,
    // built cell default properties
    props: PropTypes.object, // note: the style properties can be used here to override default cell styles
  }).isRequired,
  // Optional fixed width: if provided the column is always the same size (do not provide to get an adapting column)
  fixedWidth: PropTypes.number,
  // Is column visible?
  visible: PropTypes.bool.isRequired,
})

export default TableColumnConfiguration
