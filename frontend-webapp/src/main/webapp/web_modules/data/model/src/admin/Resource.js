const Resource = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    microservice: React.PropTypes.string,
    resource: React.PropTypes.string,
    verb: React.PropTypes.string,
  }),
})

export default Resource
export const ResourceList = React.PropTypes.objectOf(Resource)
