
export const MetaData = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  key: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
})

export const MetaDataArray = React.PropTypes.arrayOf(MetaData)
