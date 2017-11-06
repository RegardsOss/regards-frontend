/**
* LICENSE_PLACEHOLDER
**/
import { DateTextBoundPropType, NumericTextBoundPropType } from './TextBoundPropType'

const FacetTypes = {
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

const commonFacetAttributesPropTypes = {
  // corresponding model attribute name
  attributeName: PropTypes.string.isRequired,
  // facet label, added when locally resolved
  label: PropTypes.string,
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

/** describes unpecific facet notion */
const Facet = PropTypes.oneOfType([DateRangeFacet, NumberRangeFacet, StringFacet])

/** A facet array */
const FacetArray = PropTypes.arrayOf(Facet)

export default {
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
