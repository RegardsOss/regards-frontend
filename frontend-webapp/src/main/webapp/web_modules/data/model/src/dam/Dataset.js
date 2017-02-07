const Collection = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
  }).isRequired,
})

export default Collection
