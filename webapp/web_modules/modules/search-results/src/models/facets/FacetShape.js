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
import { CatalogShapes } from '@regardsoss/shape'

/**
 * Describes runtime resolved facets (parts recovered from backend and parts added at runtime resolution and use)
 * @author Raphaël Mechali
 */

/**
 * Facet with configured label and optional unit
 */
export const UIFacet = PropTypes.shape({
  // labels dictionnary (where languages like 'en', 'fr'... are the keys)
  label: PropTypes.objectOf(PropTypes.string).isRequired,
  unit: PropTypes.string,
  model: CatalogShapes.Facet.isRequired,
})

/** Array of UI facets */
export const UIFacetArray = PropTypes.arrayOf(UIFacet)

/**
 * A selected date boolean facet
 */
export const SelectedBooleanFacet = PropTypes.shape({
  label: PropTypes.objectOf(PropTypes.string).isRequired,
  model: CatalogShapes.BooleanFacet.isRequired,
  value: CatalogShapes.BooleanFacetValue.isRequired,
})

/**
 * A selected date range facet
 */
export const SelectedDateRangeFacet = PropTypes.shape({
  label: PropTypes.objectOf(PropTypes.string).isRequired,
  model: CatalogShapes.DateRangeFacet.isRequired,
  value: CatalogShapes.DateRangeFacetValue.isRequired,
})

/**
 * A selected number facet
 */
export const SelectedNumberRangeFacet = PropTypes.shape({
  label: PropTypes.objectOf(PropTypes.string).isRequired,
  unit: PropTypes.string,
  model: CatalogShapes.NumberRangeFacet.isRequired,
  value: CatalogShapes.NumberRangeFacetValue.isRequired,
})

/**
 * A selected string boolean facet
 */
export const SelectedStringFacet = PropTypes.shape({
  label: PropTypes.objectOf(PropTypes.string).isRequired,
  model: CatalogShapes.StringFacet.isRequired,
  value: CatalogShapes.StringFacetValue.isRequired,
})

/** describes unpecific selected facet notion, summarizes both the facet and the selected value in facet */
export const SelectedFacet = PropTypes.oneOfType([SelectedBooleanFacet, SelectedDateRangeFacet, SelectedNumberRangeFacet, SelectedStringFacet])

/** A selected facet array */
export const SelectedFacetArray = PropTypes.arrayOf(SelectedFacet)
