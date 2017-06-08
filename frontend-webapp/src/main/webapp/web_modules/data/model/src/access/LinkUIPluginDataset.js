/**
 * LICENSE_PLACEHOLDER
 **/
import PluginConf from './PluginConf'

/**
 * Container entity
 * @author Léo Mieulet
 */
const LinkUIPluginDataset = PropTypes.shape({
  content: PropTypes.shape({
    linkId: PropTypes.number,
    datasetId: PropTypes.string,
    services: PropTypes.arrayOf(PluginConf).isRequired,
  }).isRequired,
})

export default LinkUIPluginDataset
