import BusinessPluginConfiguration from '../microservice-common/BusinessPluginConfiguration'

const DatasetContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  subsetting: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  model: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  dataModel: PropTypes.number.isRequired,
  plgConfDataSource: BusinessPluginConfiguration,
})

const Dataset = PropTypes.shape({
  content: DatasetContent.isRequired,
})

export default {
  Dataset,
  DatasetContent,
}
