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
import { IntlMessage } from '../ui/IntlMessage'

/**
 * Defines list of elements, each of them holding one or more attributes (used by modules for presentation, like
 * search results columns, facets list...)
 * @author Raphaël Mechali
 */

/** Attribute configuration data: data that can be defined along with each attribute full qualified names */
export const AttributeConfigurationData = PropTypes.shape({
  name: PropTypes.string.isRequired, // full qualified name
  renderer: PropTypes.string, // optional specific renderer identifier (when not present, default one should be used)
})

/** A list element, holding an attributes list (allows groups) */
export const AttributeElementModel = PropTypes.shape({
  // list of attributes and corresponding elements
  attributes: PropTypes.arrayOf(AttributeConfigurationData).isRequired,
  // ... other properties defined on a per group basis
  // internationalized label for presentation
  label: IntlMessage,
})

export const AttributeListConfigurationModel = PropTypes.arrayOf(AttributeElementModel)
