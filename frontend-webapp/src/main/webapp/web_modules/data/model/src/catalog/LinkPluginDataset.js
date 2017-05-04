const LinkPluginDataset = React.PropTypes.shape({
  content: React.PropTypes.shape({
    datasetId: React.PropTypes.number.isRequired,
    services: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  }).isRequired,
})

export default LinkPluginDataset
