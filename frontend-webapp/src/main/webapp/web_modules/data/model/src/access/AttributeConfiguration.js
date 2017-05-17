/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Type definition for AttributeConfiguration objects
 * @author Sébastien binda
 */
export default PropTypes.shape({
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
