const LinkPluginDataset = PropTypes.shape({
  content: PropTypes.shape({
    datasetId: PropTypes.number.isRequired,
    services: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
})

export default LinkPluginDataset
