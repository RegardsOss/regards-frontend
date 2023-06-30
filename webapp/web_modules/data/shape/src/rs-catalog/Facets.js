/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogDomain } from '@regardsoss/domain'
import { DateTextBoundPropType, NumericTextBoundPropType } from '../rs-common/TextBoundPropType'

/**
 * Describes facets as provided by the backend
 * @author Raphaël Mechali
 */

/** Fields that are common to all facet types */
const commonFacetFields = {
  // corresponding model attribute name
  attributeName: PropTypes.string.isRequired,
  // elements that are not covered by the facet
  others: PropTypes.number,
}

/** Fields that are common to all facet values types */
const commonFacetValuesFields = {
  // Count of elements in facet value
  count: PropTypes.number.isRequired,
  // Open search filter to append to research when selecting that facet value
  openSearchQuery: PropTypes.string.isRequired,
}

/**
 * A boolean facet value
 */
export const BooleanFacetValue = PropTypes.shape({
  ...commonFacetValuesFields,
  value: PropTypes.bool.isRequired,
})

/** A boolean facet */
export const BooleanFacet = PropTypes.shape({
  ...commonFacetFields,
  type: PropTypes.oneOf([CatalogDomain.FACET_TYPES_ENUM.BOOLEAN]).isRequired,
  values: PropTypes.arrayOf(BooleanFacetValue),
})

/** A date range facet value */
export const DateRangeFacetValue = PropTypes.shape({
  ...commonFacetValuesFields,
  lowerBound: DateTextBoundPropType,
  upperBound: DateTextBoundPropType,
})

/** A date range facet */
export const DateRangeFacet = PropTypes.shape({
  ...commonFacetFields,
  type: PropTypes.oneOf([CatalogDomain.FACET_TYPES_ENUM.DATE]).isRequired,
  values: PropTypes.arrayOf(DateRangeFacetValue),
})

/** A number range facet value */
export const NumberRangeFacetValue = PropTypes.shape({
  ...commonFacetValuesFields,
  lowerBound: NumericTextBoundPropType,
  upperBound: NumericTextBoundPropType,
})

/** A number range facet */
export const NumberRangeFacet = PropTypes.shape({
  ...commonFacetFields,
  type: PropTypes.oneOf([CatalogDomain.FACET_TYPES_ENUM.NUMBER]).isRequired,
  values: PropTypes.arrayOf(NumberRangeFacetValue),

})

/** A string facet value */
export const StringFacetValue = PropTypes.shape({
  ...commonFacetValuesFields,
  word: PropTypes.string.isRequired,
})

/** A string facet */
export const StringFacet = PropTypes.shape({
  ...commonFacetFields,
  type: PropTypes.oneOf([CatalogDomain.FACET_TYPES_ENUM.STRING]).isRequired,
  values: PropTypes.arrayOf(StringFacetValue),
})

/** A common facet */
export const Facet = PropTypes.oneOfType([BooleanFacet, DateRangeFacet, NumberRangeFacet, StringFacet])

/** A facet array */
export const FacetArray = PropTypes.arrayOf(Facet)
