const ProjectUser = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    role: React.PropTypes.shape({
      id: React.PropTypes.number,
      name: React.PropTypes.string,
    }),
    email: React.PropTypes.string,
    lastConnection: React.PropTypes.date,
    status: React.PropTypes.string,
    lastUpdate: React.PropTypes.date,
  }),
})


export default ProjectUser
