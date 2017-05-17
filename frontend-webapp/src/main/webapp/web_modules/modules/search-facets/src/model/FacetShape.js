/**
* LICENSE_PLACEHOLDER
**/
import { DateTextBoundPropType, NumericTextBoundPropType } from './TextBoundPropType'

export const FacetTypes = {
  String: 'STRING',
  Date: 'DATE',
  Number: 'NUMERIC',
}

/** Attributes common to all facet values shapes */
const commonFacetValuesAttributesPropTypes = {
  // Count of elements in facet value
  count: PropTypes.number.isRequired,
  // Open search filter to append to research when selecting that facet value
  openSearchQuery: PropTypes.string.isRequired,
}

/**  value for date range facets */
export const DateRangeFacetValue = PropTypes.shape({
  lowerBound: DateTextBoundPropType,
  upperBound: DateTextBoundPropType,
  ...commonFacetValuesAttributesPropTypes,
})

/** A value for number range facets */
export const NumberRangeFacetValue = PropTypes.shape({
  lowerBound: NumericTextBoundPropType,
  upperBound: NumericTextBoundPropType,
  ...commonFacetValuesAttributesPropTypes,
})

/** A value for string facets (no range, word cound) */
export const StringFacetValue = PropTypes.shape({
  word: PropTypes.string.isRequired,
  ...commonFacetValuesAttributesPropTypes,
})

const commonFacetAttributesPropTypes = {
  // corresponding model attribute name
  attributeName: PropTypes.string.isRequired,
}

/** A date range facet */
export const DateRangeFacet = PropTypes.shape({
  ...commonFacetAttributesPropTypes,
  type: PropTypes.oneOf([FacetTypes.Date]).isRequired,
  values: PropTypes.arrayOf(DateRangeFacetValue).isRequired,
})

/** A Number range facet */
export const NumberRangeFacet = PropTypes.shape({
  ...commonFacetAttributesPropTypes,
  type: PropTypes.oneOf([FacetTypes.Number]).isRequired,
  values: PropTypes.arrayOf(NumberRangeFacetValue),
})

/** A string facet */
export const StringFacet = PropTypes.shape({
  ...commonFacetAttributesPropTypes,
  type: PropTypes.oneOf([FacetTypes.String]).isRequired,
  values: PropTypes.arrayOf(StringFacetValue),
})

/** describes unpecific facet notion */
export const Facet = PropTypes.oneOfType([DateRangeFacet, NumberRangeFacet, StringFacet])

/** A facet array */
export const FacetArray = PropTypes.arrayOf(Facet)
