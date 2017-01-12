const PluginMetaData = React.PropTypes.shape({
  content: React.PropTypes.shape({
    pluginId: React.PropTypes.string.isRequired,
    pluginClassName: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    version: React.PropTypes.string.isRequired,
    parameters: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
})

export default PluginMetaData
export const PluginMetaDataList = React.PropTypes.objectOf(PluginMetaData)
