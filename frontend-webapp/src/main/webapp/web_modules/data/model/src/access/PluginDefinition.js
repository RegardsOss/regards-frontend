/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * IHM Plugin entity definition
 */
const PluginDefinition = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  sourcesPath: React.PropTypes.string.isRequired,
})

export default PluginDefinition
