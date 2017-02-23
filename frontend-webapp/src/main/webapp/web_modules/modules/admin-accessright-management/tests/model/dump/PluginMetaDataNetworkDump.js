export default {
  content: [
    {
      content: {
        id: 'aComplexErrorPlugin',
        pluginId: 'aComplexErrorPlugin',
        pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexErrorPlugin',
        interfaceName: 'fr.cnes.regards.framework.plugins.ISamplePlugin',
        author: 'CSSI',
        version: '0.0.1',
        description: 'Complex plugin test',
        parameters: [
          {
            name: 'coeff',
            type: 'java.lang.Integer',
            paramType: 'PRIMITIVE',
          },
        ],
      },
      links: [],
    },
    {
      content: {
        id: 'aSamplePlugin',
        pluginId: 'aSamplePlugin',
        pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
        interfaceName: 'fr.cnes.regards.framework.plugins.ISamplePlugin',
        author: 'CSSI',
        version: '12345-6789-11',
        description: 'Sample plugin test',
        parameters: [
          {
            name: 'suffix',
            type: 'java.lang.String',
            paramType: 'PRIMITIVE',
          },
          {
            name: 'coeff',
            type: 'java.lang.Integer',
            paramType: 'PRIMITIVE',
          },
          {
            name: 'isActive',
            type: 'java.lang.Boolean',
            paramType: 'PRIMITIVE',
          },
        ],
      },
      links: [],
    },
    {
      content: {
        id: 'aSampleErrorPlugin',
        pluginId: 'aSampleErrorPlugin',
        pluginClassName: 'fr.cnes.regards.framework.plugins.SampleErrorPlugin',
        interfaceName: 'fr.cnes.regards.framework.plugins.ISamplePlugin',
        author: 'CSSI',
        version: '0.0.1',
        description: 'Sample plugin test',
        parameters: [
          {
            name: 'suffix',
            type: 'java.lang.String',
            paramType: 'PRIMITIVE',
          },
          {
            name: 'coeff',
            type: 'java.lang.Integer',
            paramType: 'PRIMITIVE',
          },
          {
            name: 'isActive',
            type: 'java.lang.Boolean',
            paramType: 'PRIMITIVE',
          },
        ],
      },
      links: [],
    },
    {
      content: {
        id: 'aComplexPlugin',
        pluginId: 'aComplexPlugin',
        pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexPlugin',
        interfaceName: 'fr.cnes.regards.framework.plugins.ISamplePlugin',
        author: 'CSSI',
        version: '0.0.1',
        description: 'Complex plugin test',
        parameters: [
          {
            name: 'plgInterface',
            type: 'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin',
            paramType: 'PLUGIN',
          },
          {
            name: 'coeff',
            type: 'java.lang.Integer',
            paramType: 'PRIMITIVE',
          },
          {
            name: 'isActive',
            type: 'java.lang.Boolean',
            paramType: 'PRIMITIVE',
          },
        ],
      },
      links: [],
    },
  ],
  metadata: {
    number: 0,
    size: 100,
    totalElements: 4,
  },
  links: [],
}
