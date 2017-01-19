const StoragePluginShape = React.PropTypes.shape({
  id: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  totalSize: React.PropTypes.string,
  usedSize: React.PropTypes.string,
})
export default StoragePluginShape

export const PluginShape4Normalizr = React.PropTypes.shape({
  content: React.PropTypes.shape(StoragePluginShape),
})
