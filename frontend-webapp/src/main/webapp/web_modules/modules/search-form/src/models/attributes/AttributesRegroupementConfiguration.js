/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Type definition for AttributeRegroupementConfiguration objects
 * @author Sébastien binda
 */
export default React.PropTypes.shape({
  // Regroupement id
  id: React.PropTypes.number,
  // Regroupement label
  label: React.PropTypes.string,
  // Attributes associated to this regroupement
  attributes: React.PropTypes.arrayOf(React.PropTypes.string),
  // Is the regroupement visible ?
  visible: React.PropTypes.bool,
})
