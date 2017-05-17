export const StoragePluginShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  totalSize: PropTypes.string,
  usedSize: PropTypes.string,
}).isRequired

const StoragePlugin = PropTypes.shape({
  content: StoragePluginShape,
}).isRequired

export default StoragePlugin
