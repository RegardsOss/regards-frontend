/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Project Entity definition
 * @author Sébastien Binda
 */
const Project = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    isPublic: React.PropTypes.bool,
    icon: React.PropTypes.string,
    isAccessible: React.PropTypes.bool,
  }),
})

export default Project
