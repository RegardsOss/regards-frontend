/*
 * LICENSE_PLACEHOLDER
 */
import { ProjectContent } from './Project'

/**
 * Entity description for ProjectConnection. A ProjectConnection is the database configuration
 * for a couple microservice/project.
 *
 * @author Sébastien Binda
 */
const ProjectConnection = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    project: ProjectContent,
    microservice: PropTypes.string,
    userName: PropTypes.string,
    password: PropTypes.string,
    driverClassName: PropTypes.string,
    url: PropTypes.string,
    connectivity: PropTypes.symbol,
  }),
})

const ProjectConnectionList = PropTypes.objectOf(ProjectConnection)

export default { ProjectConnection, ProjectConnectionList }
