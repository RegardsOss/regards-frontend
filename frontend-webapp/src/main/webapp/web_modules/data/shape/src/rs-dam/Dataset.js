import { PluginConfiguration } from '../rs-common/Plugin/PluginConfiguration'

const DatasetContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  subsetting: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  model: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  dataModel: PropTypes.number.isRequired,
  plgConfDataSource: PluginConfiguration,
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
