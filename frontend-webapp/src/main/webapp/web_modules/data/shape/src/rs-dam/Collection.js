const Collection = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
})
// TODO : too light

const CollectionList = PropTypes.objectOf(Collection)

export default { Collection, CollectionList }
