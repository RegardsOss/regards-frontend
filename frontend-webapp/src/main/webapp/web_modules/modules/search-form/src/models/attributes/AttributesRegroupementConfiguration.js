/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Type definition for AttributeRegroupementConfiguration objects
 * @author Sébastien binda
 */
export default React.PropTypes.shape({
  // Regroupement label
  label: React.PropTypes.string,
  // Attributes associated to this regroupement
  attributes: React.PropTypes.arrayOf(React.PropTypes.string),
  // Is the regroupement visible ?
  visibility: React.PropTypes.bool,
})
