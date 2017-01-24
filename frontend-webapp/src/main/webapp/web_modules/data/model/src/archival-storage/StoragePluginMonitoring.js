const StoragePluginShape = React.PropTypes.shape({
  id: React.PropTypes.number,
  label: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  totalSize: React.PropTypes.string,
  usedSize: React.PropTypes.string,
})
export default StoragePluginShape

export const StoragePluginShape4Normalizr = React.PropTypes.shape({
  content: StoragePluginShape,
})
