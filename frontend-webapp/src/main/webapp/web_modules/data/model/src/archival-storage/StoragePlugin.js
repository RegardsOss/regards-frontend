export const StoragePluginShape = React.PropTypes.shape({
  id: React.PropTypes.number,
  label: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  totalSize: React.PropTypes.string,
  usedSize: React.PropTypes.string,
}).isRequired

const StoragePlugin = React.PropTypes.shape({
  content: StoragePluginShape,
}).isRequired

export default StoragePlugin
