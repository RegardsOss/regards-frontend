const Dataset = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    subsetting: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    model: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    dataModel: PropTypes.number.isRequired,
    plgConfDataSource: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['DATASET']).isRequired,
    uiPluginConfIdList: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
})

export default Dataset
