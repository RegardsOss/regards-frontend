/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Object of key/value for all entity specific parameters
 * @author Sébastien Binda
 */
export default PropTypes.objectOf(
  PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number],
  ),
)
