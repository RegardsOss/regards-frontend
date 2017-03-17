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
  count: React.PropTypes.number.isRequired,
  // Open search filter to append to research when selecting that facet value
  openSearchQuery: React.PropTypes.string.isRequired,
}

/**  value for date range facets */
export const DateRangeFacetValue = React.PropTypes.shape({
  lowerBound: DateTextBoundPropType,
  upperBound: DateTextBoundPropType,
  ...commonFacetValuesAttributesPropTypes,
})

/** A value for number range facets */
export const NumberRangeFacetValue = React.PropTypes.shape({
  lowerBound: NumericTextBoundPropType,
  upperBound: NumericTextBoundPropType,
  ...commonFacetValuesAttributesPropTypes,
})

/** A value for string facets (no range, word cound) */
export const StringFacetValue = React.PropTypes.shape({
  word: React.PropTypes.string.isRequired,
  // for date and numeric, upper bound, just like lower bound
  upperBound: React.PropTypes.string,
  ...commonFacetValuesAttributesPropTypes,
})

const commonFacetAttributesPropTypes = {
  // corresponding model attribute name
  attributeName: React.PropTypes.string.isRequired,
}

/** A date range facet */
export const DateRangeFacet = React.PropTypes.shape({
  ...commonFacetAttributesPropTypes,
  type: React.PropTypes.oneOf([FacetTypes.Date]).isRequired,
  values: React.PropTypes.arrayOf(DateRangeFacetValue).isRequired,
})

/** A Number range facet */
export const NumberRangeFacet = React.PropTypes.shape({
  ...commonFacetAttributesPropTypes,
  type: React.PropTypes.oneOf([FacetTypes.Number]).isRequired,
  values: React.PropTypes.arrayOf(NumberRangeFacetValue),
})

export const allRangeFacets = [DateRangeFacet, NumberRangeFacet]

/** A string facet */
export const StringFacet = React.PropTypes.shape({
  ...commonFacetAttributesPropTypes,
  type: React.PropTypes.oneOf([FacetTypes.String]).isRequired,
  values: React.PropTypes.arrayOf(StringFacetValue),
})

/** describes unpecific facet notion */
export const Facet = React.PropTypes.oneOfType([DateRangeFacet, NumberRangeFacet, StringFacet])

/** A facet array */
export const FacetArray = React.PropTypes.arrayOf(Facet)
