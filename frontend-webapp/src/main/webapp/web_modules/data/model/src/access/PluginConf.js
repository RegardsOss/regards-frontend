/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Plugin configuration for layout display
 */
const Plugin = React.PropTypes.shape({
  content: React.PropTypes.shape({
    pluginId: React.PropTypes.string.isRequired,
    container: React.PropTypes.string.isRequired,
  }),
})

export default Plugin
