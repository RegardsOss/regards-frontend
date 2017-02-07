/**
 * LICENSE_PLACEHOLDER
 **/
const PluginParameter = React.PropTypes.shape({
  name: React.PropTypes.string,
  value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
  dynamic: React.PropTypes.bool,
})

export default PluginParameter
