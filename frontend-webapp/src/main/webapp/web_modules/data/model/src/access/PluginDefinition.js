/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * IHM Plugin entity definition
 * @author Sébastien Binda
 */
const PluginDefinition = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    sourcesPath: PropTypes.string,
  }).isRequired,
})

export default PluginDefinition
