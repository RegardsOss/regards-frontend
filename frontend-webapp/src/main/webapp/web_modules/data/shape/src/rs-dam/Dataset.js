import { PluginConfigurationContent } from '../rs-common/Plugin/PluginConfiguration'
import { ModelContent } from './Model'

const DatasetContent = PropTypes.shape({
  id: PropTypes.number,
  ipId: PropTypes.string,
  creationDate: PropTypes.string,
  lastUpdate: PropTypes.string,
  label: PropTypes.string.isRequired,
  subsetting: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  model: ModelContent.isRequired,
  dataModel: PropTypes.number.isRequired,
  plgConfDataSource: PluginConfigurationContent,
  descriptionFile: PropTypes.shape({
    url: PropTypes.string,
    type: PropTypes.string,
  }),
  properties: PropTypes.any,
  quotations: PropTypes.any,
  groups: PropTypes.any,
  score: PropTypes.number,
  entityType: PropTypes.string,
})

const Dataset = PropTypes.shape({
  content: DatasetContent.isRequired,
})

const DatasetList = PropTypes.objectOf(Dataset)


export default {
  Dataset,
  DatasetContent,
  DatasetList,
}
