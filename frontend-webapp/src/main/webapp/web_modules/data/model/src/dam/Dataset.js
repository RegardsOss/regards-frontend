const Dataset = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    label: React.PropTypes.string.isRequired,
    subsetting: React.PropTypes.string.isRequired,
    tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    model: React.PropTypes.shape({
      id: React.PropTypes.number,
    }).isRequired,
    dataModel: React.PropTypes.number.isRequired,
    plgConfDataSource: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(['DATASET']).isRequired,
  }).isRequired,
})

export default Dataset
