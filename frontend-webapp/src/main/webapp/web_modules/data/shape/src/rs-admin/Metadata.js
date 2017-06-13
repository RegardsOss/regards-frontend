/**
 * LICENSE_PLACEHOLDER
 **/
const MetadataContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
})

const MetadataContentArray = PropTypes.arrayOf(MetadataContent)


export default {
  MetadataContent,
  MetadataContentArray,
}
