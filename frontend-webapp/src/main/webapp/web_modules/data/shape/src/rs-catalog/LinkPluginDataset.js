/**
 * LICENSE_PLACEHOLDER
 **/
import { PluginConfigurationContent } from '../rs-common/Plugin/PluginConfiguration'

const LinkPluginDataset = PropTypes.shape({
  content: PropTypes.shape({
    linkId: PropTypes.number,
    datasetId: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(PluginConfigurationContent).isRequired,
  }).isRequired,
})
const LinkPluginDatasetList = PropTypes.objectOf(LinkPluginDataset)

export default { LinkPluginDataset, LinkPluginDatasetList }
