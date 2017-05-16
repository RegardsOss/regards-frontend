
export const MetaData = PropTypes.shape({
  id: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
})

export const MetaDataArray = PropTypes.arrayOf(MetaData)
