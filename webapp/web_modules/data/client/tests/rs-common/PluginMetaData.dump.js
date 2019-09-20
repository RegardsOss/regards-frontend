/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
        type: 'STRING',
        optional: false,
      }, {
        name: 'pByte',
        label: 'Simple byte',
        description: 'Simple byte description',
        type: 'BYTE',
        optional: false,
      }, {
        name: 'pShort',
        label: 'Simple short',
        description: 'Simple short description',
        type: 'SHORT',
        optional: false,
      }, {
        name: 'pInteger',
        label: 'Simple integer',
        description: 'Simple integer description',
        type: 'INTEGER',
        optional: false,
      }, {
        name: 'pLong',
        label: 'Simple long',
        description: 'Simple long description',
        type: 'LONG',
        optional: false,
      }, {
        name: 'pFloat',
        label: 'Simple float',
        description: 'Simple float description',
        type: 'FLOAT',
        optional: false,
      }, {
        name: 'pDouble',
        label: 'Simple double',
        description: 'Simple double description',
        type: 'DOUBLE',
        optional: false,
      }, {
        name: 'pBoolean',
        label: 'Simple boolean',
        description: 'Simple boolean description',
        type: 'BOOLEAN',
        optional: false,
      }, {
        name: 'sList',
        label: 'List of string',
        description: 'List of string description',
        type: 'COLLECTION',
        parameterizedSubTypes: ['java.lang.String'],
        optional: false,
        parameters: [
          'message', 'message', 'STRING',
        ],
      }, {
        name: 'sListPojo',
        label: 'List of objects',
        description: 'List of objects',
        type: 'COLLECTION',
        parameterizedSubTypes: ['fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Pojo'],
        optional: false,
        parameters: [{
          name: 'message', label: 'message', type: 'STRING', optional: false,
        }],
      }, {
        name: 'ssMap',
        label: 'Map string to string',
        description: 'Map string to string description',
        type: 'MAP',
        parameterizedSubTypes: ['java.lang.String', 'java.lang.String'],
        optional: false,
      }, {
        name: 'pojo',
        label: 'Pojo containing string',
        description: '',
        type: 'POJO',
        optional: false,
        parameters: [{
          name: 'message', label: 'message', type: 'STRING', optional: false,
        }],
      }, {
        name: 'constraints',
        label: 'Constraint pojo wrapper',
        description: '',
        type: 'POJO',
        optional: false,
        parameters: [{
          name: 'constraints',
          label: 'List of constraints',
          description: '',
          type: 'COLLECTION',
          parameterizedSubTypes: ['fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Constraint'],
          optional: false,
          parameters: [{
            name: 'pattern', label: 'Pattern', description: 'JAVA regular expression', type: 'STRING', optional: false,
          }, {
            name: 'enabled', label: 'Enabled', description: 'Contraint may be enabled/disabled', type: 'BOOLEAN', defaultValue: 'true', optional: true,
          }],
        }],
      }, {
        name: 'scMap',
        label: 'Constraint map',
        description: '',
        type: 'MAP',
        parameterizedSubTypes: ['java.lang.String', 'fr.cnes.regards.modules.ingest.service.plugin.FakeSipValidation$Constraint'],
        optional: false,
        parameters: [{
          name: 'pattern', label: 'Pattern', description: 'JAVA regular expression', type: 'STRING', optional: false,
        }, {
          name: 'enabled', label: 'Enabled', description: 'Contraint may be enabled/disabled', type: 'BOOLEAN', defaultValue: 'true', optional: true,
        }],
      }, {
        name: 'embedded', label: 'Embedded plugin', description: '', parameterizedSubTypes: ['fr.cnes.regards.modules.ingest.domain.plugin.ISipValidation'], type: 'PLUGIN', optional: false, parameters: [],
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
          type: 'INTEGER',
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
      interfaceNames: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '12345-6789-11',
      description: 'Sample plugin test',
      parameters: [
        {
          name: 'suffix',
          type: 'STRING',
        },
        {
          name: 'coeff',
          type: 'INTEGER',
        },
        {
          name: 'isActive',
          type: 'BOOLEAN',
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
      interfaceName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Sample plugin test',
      parameters: [
        {
          name: 'suffix',
          type: 'STRING',
        },
        {
          name: 'coeff',
          type: 'INTEGER',
        },
        {
          name: 'isActive',
          type: 'BOOLEAN',
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
      interfaceName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Complex plugin test',
      parameters: [
        {
          name: 'plgInterface',
          parameterizedSubTypes: ['fr.cnes.regards.framework.plugins.IComplexInterfacePlugin'],
          type: 'PLUGIN',
        },
        {
          name: 'coeff',
          type: 'INTEGER',
        },
        {
          name: 'isActive',
          type: 'BOOLEAN',
        },
      ],
    },
    links: [],
  },
]
