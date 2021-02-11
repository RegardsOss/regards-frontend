/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
      id: 202,
      businessId: 'businessId1',
      pluginId: 'FullPluginExample',
      label: 'fdgfdgfdg',
      version: '1.0.0',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'fr.cnes.regards.modules.ingest.service.plugin.FullPluginExample',
      interfaceNames: ['fr.cnes.regards.modules.ingest.domain.plugin.IFullPluginExample'],
      parameters: [{
        id: 115, name: 'embedded', value: '"1"', dynamic: false, dynamicsValues: [],
      }, {
        id: 113, name: 'constraints', value: { constraints: [{ enabled: true, pattern: 'dfgdg' }, { enabled: false, pattern: 'plop' }] }, dynamic: false, dynamicsValues: [],
      }, {
        id: 114, name: 'scMap', value: { dfgfdfgdg: { enabled: true, pattern: 'dfgfdg' } }, dynamic: false, dynamicsValues: [],
      }, {
        id: 112, name: 'pojo', value: { message: 'dfgfdgd' }, dynamic: false, dynamicsValues: [],
      }, {
        id: 111, name: 'ssMap', value: { dfgdg: 'dfgdg' }, dynamic: false, dynamicsValues: [],
      }, {
        id: 110, name: 'sList', value: ['dfgdg'], dynamic: false, dynamicsValues: [],
      }, {
        id: 110, name: 'sListPojo', value: [{ message: 'value' }, { message: 'value2' }], dynamic: false, dynamicsValues: [],
      }, {
        id: 109, name: 'pBoolean', value: 'true', dynamic: false, dynamicsValues: [],
      }, {
        id: 108, name: 'pDouble', value: '"1"', dynamic: false, dynamicsValues: [],
      }, {
        id: 107, name: 'pFloat', value: '"1"', dynamic: false, dynamicsValues: [],
      }, {
        id: 106, name: 'pLong', value: '"1"', dynamic: false, dynamicsValues: [],
      }, {
        id: 105, name: 'pInteger', value: '"1"', dynamic: false, dynamicsValues: [],
      }, {
        id: 104, name: 'pShort', value: '"1"', dynamic: false, dynamicsValues: [],
      }, {
        id: 103, name: 'pByte', value: '"1"', dynamic: false, dynamicsValues: [],
      }, {
        id: 102, name: 'pString', value: '"df"', dynamic: false, dynamicsValues: [],
      }],
    },
    links: [{ rel: 'self', href: 'http://172.26.47.107/api/v1/rs-ingest/plugins/FullPluginExample/config/202', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.107/api/v1/rs-ingest/plugins/FakeSipValidation/config/202' } }, { rel: 'delete', href: 'http://172.26.47.107/api/v1/rs-ingest/plugins/FakeSipValidation/config/202', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.107/api/v1/rs-ingest/plugins/FakeSipValidation/config/202' } }, { rel: 'update', href: 'http://172.26.47.107/api/v1/rs-ingest/plugins/FakeSipValidation/config/202', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.107/api/v1/rs-ingest/plugins/FakeSipValidation/config/202' } }, { rel: 'list', href: 'http://172.26.47.107/api/v1/rs-ingest/plugins/FakeSipValidation/config', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.107/api/v1/rs-ingest/plugins/FullPluginExample/config' } }],
  },
  {
    content: {
      id: 40,
      businessId: 'businessId2',
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
      businessId: 'businessId3',
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
      businessId: 'businessId4',
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
      businessId: 'businessId5',
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
