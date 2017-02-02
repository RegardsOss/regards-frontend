/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Object of key/value for all entity specific parameters
 */
export default React.PropTypes.objectOf(
  React.PropTypes.oneOfType(
    [React.PropTypes.string, React.PropTypes.number],
  ),
)
