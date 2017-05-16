/*
 * LICENSE_PLACEHOLDER
 */
import Project from './Project'

/**
 * Entity description for ProjectConnection. A ProjectConnection is the database configuration
 * for a couple microservice/project.
 *
 * @author Sébastien Binda
 */
const ProjectConnection = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    project: Project,
    microservice: PropTypes.string,
    userName: PropTypes.string,
    password: PropTypes.string,
    driverClassName: PropTypes.string,
    url: PropTypes.string,
    connectivity: PropTypes.symbol,
  }),
})

export default ProjectConnection
