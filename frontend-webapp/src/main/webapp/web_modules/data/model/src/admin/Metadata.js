
export const Metadata = PropTypes.shape({
  id: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
})

export const MetadataArray = PropTypes.arrayOf(Metadata)
