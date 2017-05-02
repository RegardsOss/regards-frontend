/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Type definition for AttributeConfiguration objects
 * @author Sébastien binda
 */
export default React.PropTypes.shape({
  // Attribute name as <fragmentName>.<attributeName>
  attributeFullQualifiedName: React.PropTypes.string.isRequired,
  // Display order of the attribute
  order: React.PropTypes.number,
  // Is the attribute configured to be visible ?
  visibility: React.PropTypes.bool,
  // Is the attribute configured to be used as a facet ?
  facetable: React.PropTypes.bool,
  // Default sort results on this attribute ?
  initialSort: React.PropTypes.bool,
})
