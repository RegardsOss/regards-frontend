const LinkPluginDataset = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    datasetId: React.PropTypes.number.isRequired,
    filters: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    services: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    converters: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  }).isRequired,
})

export default LinkPluginDataset
