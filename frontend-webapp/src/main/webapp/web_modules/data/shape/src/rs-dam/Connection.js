const Connection = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
})

const ConnectionList = PropTypes.objectOf(Connection)


export default {
  Connection,
  ConnectionList,
}
