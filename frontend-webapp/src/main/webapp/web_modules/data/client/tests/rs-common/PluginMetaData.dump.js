/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
export default [
  {
    content: {
      pluginClassName: 'fr.cnes.regards.modules.ingest.service.plugin.FullPluginExample',
      interfaceNames: ['fr.cnes.regards.modules.ingest.domain.plugin.IFullPluginExample'],
      author: 'REGARDS Team',
      pluginId: 'FullPluginExample',
      version: '1.0.0',
      description: 'Fake no effect SIP validation plugin (do not use in production)',
      url: 'https://regardsoss.github.io/',
      contact: 'regards@c-s.fr',
      owner: 'CNES',
      licence: 'GPLv3',
      parameters: [{
        name: 'pString',
        label: 'Simple string',
        description: 'Simple string description',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
        parameters: [],
      }, {
        name: 'pByte',
        label: 'Simple byte',
        description: 'Simple byte description',
        type: 'java.lang.Byte',
        paramType: 'PRIMITIVE',
        optional: false,
        parameters: [],
      }, {
        name: 'pShort',
        label: 'Simple short',
        description: 'Simple short description',
        type: 'java.lang.Short',
        paramType: 'PRIMITIVE',
        optional: false,
        parameters: [],
      }, {
        name: 'pInteger',
        label: 'Simple integer',
        description: 'Simple integer description',
        type: 'java.lang.Integer',
        paramType: 'PRIMITIVE',
        optional: false,
        parameters: [],
      }, {
        name: 'pLong',
        label: 'Simple long',
        description: 'Simple long description',
        type: 'java.lang.Long',
        paramType: 'PRIMITIVE',
        optional: false,
        parameters: [],
      }, {
        name: 'pFloat',
        label: 'Simple float',
        description: 'Simple float description',
        type: 'java.lang.Float',
        paramType: 'PRIMITIVE',
        optional: false,
        parameters: [],
      }, {
        name: 'pDouble',
        label: 'Simple double',
        description: 'Simple double description',
        type: 'java.lang.Double',
        paramType: 'PRIMITIVE',
        optional: false,
        parameters: [],
      }, {
        name: 'pBoolean',
        label: 'Simple boolean',
        description: 'Simple boolean description',
        type: 'java.lang.Boolean',
        paramType: 'PRIMITIVE',
        optional: false,
        parameters: [],
      }, {
        name: 'sList',
        label: 'List of string',
        description: 'List of string description',
        type: 'java.util.List',
        parameterizedSubTypes: ['java.lang.String'],
        paramType: 'COLLECTION',
        optional: false,
        parameters: [],
      }, {
        name: 'sListPojo',
        label: 'List of objects',
        description: 'List of objects',
        type: 'java.util.List',
        parameterizedSubTypes: ['fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Pojo'],
        paramType: 'COLLECTION',
        optional: false,
        parameters: [{
          name: 'message', label: 'message', type: 'java.lang.String', paramType: 'PRIMITIVE', optional: false, parameters: [],
        }],
      }, {
        name: 'ssMap',
        label: 'Map string to string',
        description: 'Map string to string description',
        type: 'java.util.Map',
        parameterizedSubTypes: ['java.lang.String', 'java.lang.String'],
        paramType: 'MAP',
        optional: false,
        parameters: [],
      }, {
        name: 'pojo',
        label: 'Pojo containing string',
        description: '',
        type: 'fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Pojo',
        paramType: 'OBJECT',
        optional: false,
        parameters: [{
          name: 'message', label: 'message', type: 'java.lang.String', paramType: 'PRIMITIVE', optional: false, parameters: [],
        }],
      }, {
        name: 'constraints',
        label: 'Constraint pojo wrapper',
        description: '',
        type: 'fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Constraints',
        paramType: 'OBJECT',
        optional: false,
        parameters: [{
          name: 'constraints',
          label: 'List of constraints',
          description: '',
          type: 'java.util.List',
          parameterizedSubTypes: ['fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Constraint'],
          paramType: 'COLLECTION',
          optional: false,
          parameters: [{
            name: 'pattern', label: 'Pattern', description: 'JAVA regular expression', type: 'java.lang.String', paramType: 'PRIMITIVE', optional: false, parameters: [],
          }, {
            name: 'enabled', label: 'Enabled', description: 'Contraint may be enabled/disabled', type: 'boolean', paramType: 'PRIMITIVE', defaultValue: 'true', optional: true, parameters: [],
          }],
        }],
      }, {
        name: 'scMap',
        label: 'Constraint map',
        description: '',
        type: 'java.util.Map',
        parameterizedSubTypes: ['java.lang.String', 'fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Constraint'],
        paramType: 'MAP',
        optional: false,
        parameters: [{
          name: 'pattern', label: 'Pattern', description: 'JAVA regular expression', type: 'java.lang.String', paramType: 'PRIMITIVE', optional: false, parameters: [],
        }, {
          name: 'enabled', label: 'Enabled', description: 'Contraint may be enabled/disabled', type: 'boolean', paramType: 'PRIMITIVE', defaultValue: 'true', optional: true, parameters: [],
        }],
      }, {
        name: 'embedded', label: 'Embedded plugin', description: '', type: 'fr.cnes.regards.modules.ingest.domain.plugin.ISipValidation', paramType: 'PLUGIN', optional: false, parameters: [],
      }],
    },
    links: [],
  },
  {
    content: {
      id: 'aComplexErrorPlugin',
      pluginId: 'aComplexErrorPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexErrorPlugin',
      interfaceName: 'fr.cnes.regards.framework.plugins.ComplexErrorPlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
        'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin',
      ],
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
      interfaceName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
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
      interfaceName: 'fr.cnes.regards.framework.plugins.SampleErrorPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.SampleErrorPlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
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
      interfaceName: 'fr.cnes.regards.framework.plugins.ComplexPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexPlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
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
]
