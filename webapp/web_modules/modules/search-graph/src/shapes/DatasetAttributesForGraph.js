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
const commonAttributeForGraph = {
  // attribute labels dictionary by language
  label: PropTypes.objectOf(PropTypes.string).isRequired,
  // the render component, see attributes-common/render (expects a list of attribute values)
  render: PropTypes.func.isRequired,
}

// a dataset attribute definition for graph
export const DatasetAttributeForGraph = PropTypes.shape({
  ...commonAttributeForGraph,
  // access path to attribute value in entity
  attributePath: PropTypes.string.isRequired,
  // precision if any
  precision: PropTypes.number,
  // attribute unit if any ("unitless" constant may also be found here)
  unit: PropTypes.string,
})

// array of dataset attributes definitions for graph
export const DatasetAttributesArrayForGraph = PropTypes.arrayOf(DatasetAttributeForGraph)

/**
 * A resolved dataset attribute   (holds value from dataset)
 */
export const ResolvedDatasetAttribute = PropTypes.shape({
  ...commonAttributeForGraph,
  renderKey: PropTypes.string.isRequired, // render key (for render optimizations)
  // eslint-disable-next-line react/forbid-prop-types
  renderValue: PropTypes.any, // the attribute value on an object, prepared for to be rendered, null or undefined allowed
  // eslint-disable-next-line react/forbid-prop-types
  renderProps: PropTypes.object.isRequired, // properties for render (like unit)
})

/**
 * A resolved dataset attributes array (holds corresponding values)
 */
export const ResolvedDatasetAttributesArray = PropTypes.arrayOf(ResolvedDatasetAttribute)
