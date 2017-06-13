/**
 * LICENSE_PLACEHOLDER
 **/
import URL from '../rs-common/URL'

const ProjectContent = PropTypes.shape({
  id: PropTypes.number,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: URL,
  licenseLink: URL,
  isDeleted: PropTypes.bool.isRequired,
  isPublic: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
})

const Project = PropTypes.shape({
  content: ProjectContent,
})

const ProjectList = PropTypes.objectOf(Project)

export default {
  ProjectContent,
  Project,
  ProjectList,
}
