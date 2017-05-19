import BusinessPluginConfiguration from '../microservice-common/BusinessPluginConfiguration'

const Dataset = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    subsetting: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    model: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    dataModel: PropTypes.number.isRequired,
    plgConfDataSource: BusinessPluginConfiguration,
  }).isRequired,
})

export default Dataset
