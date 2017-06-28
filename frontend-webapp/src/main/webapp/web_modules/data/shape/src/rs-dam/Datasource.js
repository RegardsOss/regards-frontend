const Datasource = PropTypes.shape({
  content: PropTypes.shape({
    pluginConfigurationId: PropTypes.number,
    pluginConfigurationConnectionId: PropTypes.number,
    pluginClassName: PropTypes.string,
    label: PropTypes.string,
    tableName: PropTypes.string,
    mapping: PropTypes.shape({
      attributeMapping: PropTypes.arrayOf(
        PropTypes.shape({
          namespace: PropTypes.string,
          name: PropTypes.string,
          type: PropTypes.string,
          nameDS: PropTypes.string,
        }),
      ),
      model: PropTypes.number,
    }),
  }).isRequired,
})

const DatasourceList = PropTypes.objectOf(Datasource)


export default { Datasource, DatasourceList }