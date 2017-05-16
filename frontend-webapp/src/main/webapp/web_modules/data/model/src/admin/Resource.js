const Resource = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    microservice: PropTypes.string,
    resource: PropTypes.string,
    verb: PropTypes.string,
  }),
})

export default Resource
export const ResourceList = PropTypes.objectOf(Resource)
