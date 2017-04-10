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
const ProjectConnection = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    project: Project,
    microservice: React.PropTypes.string,
    userName: React.PropTypes.string,
    password: React.PropTypes.string,
    driverClassName: React.PropTypes.string,
    url: React.PropTypes.string,
    connectivity: React.PropTypes.symbol,
  }),
})

export default ProjectConnection
