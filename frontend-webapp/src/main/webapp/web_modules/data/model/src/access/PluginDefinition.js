/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * IHM Plugin entity definition
 */
const PluginDefinition = React.PropTypes.shape({
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  sourcesPath: React.PropTypes.string,
})

export default PluginDefinition
