import PluginConfiguration from '../admin/plugin/PluginConfiguration'

const LinkPluginDataset = PropTypes.shape({
  content: PropTypes.shape({
    linkId: PropTypes.number,
    datasetId: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(PluginConfiguration).isRequired,
  }).isRequired,
})

export default LinkPluginDataset
