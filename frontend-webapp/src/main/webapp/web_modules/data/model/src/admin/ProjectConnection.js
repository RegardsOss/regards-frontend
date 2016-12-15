const ProjectConnection = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    projectName: React.PropTypes.string,
    microservice: React.PropTypes.string,
    userName: React.PropTypes.string,
    password: React.PropTypes.string,
    driverClassName: React.PropTypes.string,
    url: React.PropTypes.string,
    connectivity: React.PropTypes.symbol,
  }),
})

export default ProjectConnection
export const ProjectConnectionList = React.PropTypes.objectOf(ProjectConnection)
