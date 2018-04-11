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
 * Type definition for AttributeConfiguration objects
 * @author Sébastien binda
 * @author Léo Mieulet
 */

const AttributeConfigurationContent = PropTypes.shape({
  // Attribute name as <fragmentName>.<attributeName>
  attributeFullQualifiedName: PropTypes.string.isRequired,
  // Display order of the attribute
  order: PropTypes.number,
  // Is the attribute configured to be visible ?
  visibility: PropTypes.bool,
  // Is the attribute configured to be used as a facet ?
  facetable: PropTypes.bool,
  // Default sort results on this attribute ?
  initialSort: PropTypes.bool,
})

const AttributeConfigurationArray = PropTypes.arrayOf(AttributeConfigurationContent)

const AttributeConfigurationList = PropTypes.objectOf(AttributeConfigurationContent)


module.exports = {
  AttributeConfigurationContent,
  AttributeConfigurationArray,
  AttributeConfigurationList,
}
