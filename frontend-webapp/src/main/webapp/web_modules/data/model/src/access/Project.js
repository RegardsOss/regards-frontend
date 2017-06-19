/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Project Entity definition
 * @author Sébastien Binda
 */
const Project = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    isPublic: PropTypes.bool,
    icon: PropTypes.string,
    isAccessible: PropTypes.bool,
    isDeleted: PropTypes.bool,
  }),
})

export default Project
