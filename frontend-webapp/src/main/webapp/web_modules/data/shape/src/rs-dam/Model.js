/**
 * LICENSE_PLACEHOLDER
 **/
const Model = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
  }),
})

const ModelList = PropTypes.objectOf(Model)

export default { Model, ModelList }
