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
import { CatalogShapes, DataManagementShapes, UIShapes } from '@regardsoss/shape'

/**
 * Describes runtime resolved facets (parts recovered from backend and parts added at runtime resolution and use)
 * @author Raphaël Mechali
 */

/**
 * Facet with configured label and optional unit
 */
export const UIFacet = PropTypes.shape({
  // labels dictionary (where languages like 'en', 'fr'... are the keys)
  facetLabels: UIShapes.IntlMessage.isRequired,
  attribute: DataManagementShapes.AttributeModel.isRequired,
  model: CatalogShapes.Facet.isRequired, // from backend
})

/** Array of UI facets */
export const UIFacetArray = PropTypes.arrayOf(UIFacet)
