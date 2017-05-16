const Collection = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    modelId: PropTypes.string,
  }).isRequired,
})

export default Collection
