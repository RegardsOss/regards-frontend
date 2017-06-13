const Connection = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
})

export default {
  Connection,
}
