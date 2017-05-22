export default [{
  content: {
    label: 'Ma datasource simple',
    pluginConfigurationId: 1357,
    pluginConfigurationConnectionId: 1359,
    mapping: {
      model: 5,
      attributesMapping: [
        {
          name: 'Attribute_0_0',
          type: 'STRING',
          nameSpace: 'Fragment 1',
          isPrimaryKey: true,
          typeDS: 'int8',
          nameDS: 'id',
        },
        {
          name: 'Attribute_4',
          type: 'STRING',
          nameSpace: 'Fragment 2',
          isPrimaryKey: false,
          nameDS: 'count(*)',
        },
      ],
    },
    tableName: 't_fragment',
    fromClause: '',
  },
  links: [],
}, {
  content: {
    label: 'Ma datasource complexe',
    pluginConfigurationId: 1355,
    pluginConfigurationConnectionId: 1352,
    mapping: {
      model: 5,
      attributesMapping: [
        {
          name: 'Attribute_0_0',
          type: 'STRING',
          nameSpace: 'Fragment 1',
          isPrimaryKey: true,
          nameDS: 'T1.id',
        },
        {
          name: 'Attribute_4',
          type: 'STRING',
          nameSpace: 'Fragment 2',
          isPrimaryKey: false,
          nameDS: 'count(*)',
        },
      ],
    },
    fromClause: 'FROM T1, T2, T3\nWHERE T1.tazerty = T2.poiuy\nAND T2.xcvbn = T3.uyjhntg',
    tableName: '',
  },
  links: [],
}]
