const Datasource = PropTypes.shape({
  content: PropTypes.shape({
    pluginConfigurationId: PropTypes.number,
    pluginConfigurationConnectionId: PropTypes.number,
    label: PropTypes.string,
    tableName: PropTypes.string,
    mapping: PropTypes.shape({
      attributeMapping: PropTypes.arrayOf(
        React.PropTypes.shape({
          namespace: PropTypes.string,
          name: PropTypes.string,
          type: PropTypes.string,
          nameDS: PropTypes.string,
        }),
      ),
      model: PropTypes.string,
    }),
  }).isRequired,
})

export default Datasource
