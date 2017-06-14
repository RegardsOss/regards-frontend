/**
 * LICENSE_PLACEHOLDER
 **/
import { UIPluginConf } from './UIPluginConf'

/**
 * Container entity
 * @author Sébastien Binda
 */
const LinkUIPluginDataset = PropTypes.shape({
  content: PropTypes.shape({
    linkId: PropTypes.number,
    datasetId: PropTypes.string,
    services: PropTypes.arrayOf(UIPluginConf).isRequired,
  }).isRequired,
})

const LinkUIPluginDatasetList = PropTypes.objectOf(LinkUIPluginDataset)

export default {
  LinkUIPluginDataset,
  LinkUIPluginDatasetList,
}
