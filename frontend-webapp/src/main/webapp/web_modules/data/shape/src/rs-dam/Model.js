/**
 * LICENSE_PLACEHOLDER
 **/

const ModelContent = PropTypes.shape({
  id: PropTypes.number,
  type: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
})

const Model = PropTypes.shape({
  content: ModelContent.isRequired,
})

const ModelList = PropTypes.objectOf(Model)

export default {
  ModelContent,
  Model,
  ModelList
}
