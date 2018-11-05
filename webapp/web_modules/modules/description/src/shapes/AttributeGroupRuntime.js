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
 * This file exposes attribute groups and related shapes as they are resolved for runtime
 * @author Raphaël Mechali
 */

/** An attributes resolved for render */
export const AttributeRender = PropTypes.shape({
  key: PropTypes.string.isRequired, // simple element key for render
  Renderer: PropTypes.func.isRequired, // attribute render constructor
  renderValue: PropTypes.any, // attribute render value
  renderUnit: PropTypes.string, // unit if any
})

/** A group element (row) resolved for render */
export const GroupElement = PropTypes.shape({
  key: PropTypes.string.isRequired, // simple row key for render
  label: PropTypes.objectOf(PropTypes.string).isRequired, // row labels by locale
  // row attributes resolved for render
  attributes: PropTypes.arrayOf(AttributeRender).isRequired,
})

/** An attributes group resolved for render */
export const AttributesGroup = PropTypes.shape({
  key: PropTypes.string.isRequired, // simple group key for render
  showTitle: PropTypes.bool.isRequired, // should show group title?
  title: PropTypes.objectOf(PropTypes.string).isRequired, // group titles by locale
  // group rows
  elements: PropTypes.arrayOf(GroupElement).isRequired,
})

export const AttributesGroupArray = PropTypes.arrayOf(AttributesGroup)
