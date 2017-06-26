const Resource = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    microservice: PropTypes.string,
    resource: PropTypes.string,
    verb: PropTypes.string,
  }),
})
const ResourceList = PropTypes.objectOf(Resource)
const ResourceArray = PropTypes.arrayOf(Resource)

export default {
  Resource,
  ResourceList,
  ResourceArray,
}
