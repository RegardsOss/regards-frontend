/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * IHM Plugin entity definition
 * @author Sébastien Binda
 */
const UIPluginDefinition = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    sourcePath: PropTypes.string,
  }).isRequired,
})

export default {
  UIPluginDefinition,
}
