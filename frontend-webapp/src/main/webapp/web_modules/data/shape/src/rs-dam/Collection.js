const Collection = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
})
// TODO : too light

const CollectionList = PropTypes.objectOf(Collection)
const CollectionArray = PropTypes.arrayOf(Collection)

export default { Collection, CollectionList, CollectionArray }
