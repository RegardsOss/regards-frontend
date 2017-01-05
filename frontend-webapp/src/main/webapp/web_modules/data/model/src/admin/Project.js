const Project = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    description: React.PropTypes.string,
    icon: React.PropTypes.string,
    isDeleted: React.PropTypes.bool,
    isPublic: React.PropTypes.bool,
    name: React.PropTypes.string,
  }),
})

export default Project
