/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Type definition for AttributeRegroupmentConfiguration objects
 * @author Sébastien binda
 */
const AttributesGroupConfigurationContent = PropTypes.shape({
  // Regroupement label
  label: PropTypes.string,
  // Attributes associated to this regroupement
  attributes: PropTypes.arrayOf(PropTypes.number),
  // Is the regroupement visible ?
  visibility: PropTypes.bool,
  // Display order of the attribute
  order: PropTypes.number,
})

export default AttributesGroupConfigurationContent
