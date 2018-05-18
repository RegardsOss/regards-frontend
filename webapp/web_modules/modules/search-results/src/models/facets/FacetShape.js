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
import { DateTextBoundPropType, NumericTextBoundPropType } from './TextBoundPropType'

const FacetTypes = {
  Boolean: 'BOOLEAN',
  Date: 'DATE',
  Number: 'NUMERIC',
  String: 'STRING',
}

/** Attributes common to all facet values shapes */
const commonFacetValuesAttributesPropTypes = {
  // Count of elements in facet value
  count: PropTypes.number.isRequired,
  // Open search filter to append to research when selecting that facet value
  openSearchQuery: PropTypes.string.isRequired,
}

/**  value for date range facets */
const DateRangeFacetValue = PropTypes.shape({
  lowerBound: DateTextBoundPropType,
  upperBound: DateTextBoundPropType,
  ...commonFacetValuesAttributesPropTypes,
})

/** A value for number range facets */
const NumberRangeFacetValue = PropTypes.shape({
  lowerBound: NumericTextBoundPropType,
  upperBound: NumericTextBoundPropType,
  ...commonFacetValuesAttributesPropTypes,
})

/** A value for string facets (no range, word cound) */
const StringFacetValue = PropTypes.shape({
  word: PropTypes.string.isRequired,
  ...commonFacetValuesAttributesPropTypes,
})

/** A value for string facets (no range, word cound) */
const BooleanFacetValue = PropTypes.shape({
  value: PropTypes.bool.isRequired,
  ...commonFacetValuesAttributesPropTypes,
})

const commonFacetAttributesPropTypes = {
  // corresponding model attribute name
  attributeName: PropTypes.string.isRequired,
  // facet label, added when locally resolved
  label: PropTypes.string,
  // elements that are not covered by the facet
  others: PropTypes.number.isRequired,
}

/** A date range facet */
const DateRangeFacet = PropTypes.shape({
  ...commonFacetAttributesPropTypes,
  type: PropTypes.oneOf([FacetTypes.Date]).isRequired,
  values: PropTypes.arrayOf(DateRangeFacetValue).isRequired,
})

/** A Number range facet */
const NumberRangeFacet = PropTypes.shape({
  ...commonFacetAttributesPropTypes,
  type: PropTypes.oneOf([FacetTypes.Number]).isRequired,
  values: PropTypes.arrayOf(NumberRangeFacetValue),
})

/** A string facet */
const StringFacet = PropTypes.shape({
  ...commonFacetAttributesPropTypes,
  type: PropTypes.oneOf([FacetTypes.String]).isRequired,
  values: PropTypes.arrayOf(StringFacetValue),
})

/** A boolean facet */
const BooleanFacet = PropTypes.shape({
  ...commonFacetAttributesPropTypes,
  type: PropTypes.oneOf([FacetTypes.Boolean]).isRequired,
  values: PropTypes.arrayOf(BooleanFacetValue),
})

/** describes unpecific facet notion */
const Facet = PropTypes.oneOfType([DateRangeFacet, NumberRangeFacet, BooleanFacet, StringFacet])

/** A facet array */
const FacetArray = PropTypes.arrayOf(Facet)

module.exports = {
  BooleanFacetValue,
  BooleanFacet,
  DateRangeFacetValue,
  DateRangeFacet,
  Facet,
  FacetArray,
  FacetTypes,
  NumberRangeFacet,
  NumberRangeFacetValue,
  StringFacet,
  StringFacetValue,
}
