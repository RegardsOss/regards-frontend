/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Type definition for AttributeConfiguration objects
 * @author Sébastien binda
 */
export default React.PropTypes.shape({
  // Attribute identifier
  id: React.PropTypes.number,
  // Is the attribute configured to be visible ?
  visibility: React.PropTypes.bool,
  // Is the attribute configured to be used as a facet ?
  facetable: React.PropTypes.bool,
})
