const Project = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    lastName: React.PropTypes.string,
    email: React.PropTypes.string,
    firstName: React.PropTypes.string,
    status: React.PropTypes.string,
  }),
})

export default Project
