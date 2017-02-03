/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * IHM Plugin entity definition
 * @author Sébastien Binda
 */
const PluginDefinition = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    type: React.PropTypes.string,
    sourcesPath: React.PropTypes.string,
  }).isRequired,
})

export default PluginDefinition
