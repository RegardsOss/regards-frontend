/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Project Entity definition
 */
export default React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    isPublic: React.PropTypes.bool,
    icon: React.PropTypes.string,
    isAccessible: React.PropTypes.bool,
  }),
})
