export default [
  {
    content: {
      id: 40,
      pluginId: 'aComplexErrorPlugin',
      label: 'a plugin configuration for the test',
      version: '12345-6789-11',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'param31',
          value: 'value31',
          dynamic: true,
        },
        {
          name: 'param32',
          value: 'value32',
          dynamic: false,
        },
        {
          name: 'param33',
          value: 'value33',
          dynamic: false,
        },
        {
          name: 'param34',
          value: 'value34',
          dynamic: false,
        },
        {
          name: 'param35',
          value: 'value35',
          dynamic: false,
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 12,
      pluginId: 'aComplexPlugin',
      label: 'This is a configuration',
      version: '1.2.0',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'coeff',
          value: '42',
          dynamic: true,
        },
        {
          name: 'isActive',
          value: 'true',
          dynamic: false,
        },
        {
          name: 'plgInterface',
          value: '40',
          dynamic: false,
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 11,
      pluginId: 'aComplexPlugin',
      label: 'A configuration',
      version: '1.0.0',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'coeff',
          value: '43',
          dynamic: true,
        },
        {
          name: 'isActive',
          value: 'false',
          dynamic: false,
        },
        {
          name: 'plgInterface',
          value: '40',
          dynamic: false,
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 10,
      pluginId: 'aComplexPlugin',
      label: 'An other configuration',
      version: '1.0.0',
      priorityOrder: 0,
      active: false,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'coeff',
          value: '44',
          dynamic: true,
        },
        {
          name: 'isActive',
          value: 'true',
          dynamic: false,
        },
        {
          name: 'plgInterface',
          value: '12',
          dynamic: false,
        },
      ],
    },
    links: [],
  },
]