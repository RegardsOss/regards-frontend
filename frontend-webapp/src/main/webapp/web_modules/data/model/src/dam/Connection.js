const Connection = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    label: React.PropTypes.string,
  }).isRequired,
})

export default Connection
