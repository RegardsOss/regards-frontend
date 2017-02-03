/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Object of key/value for all entity specific parameters
 * @author Sébastien Binda
 */
export default React.PropTypes.objectOf(
  React.PropTypes.oneOfType(
    [React.PropTypes.string, React.PropTypes.number],
  ),
)
