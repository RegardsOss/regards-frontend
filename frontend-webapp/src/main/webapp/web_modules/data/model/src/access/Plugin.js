/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * IHM Plugin entity definition
 */
const Plugin = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    sourcesPath: React.PropTypes.string.isRequired,
  }),
})

export default Plugin
