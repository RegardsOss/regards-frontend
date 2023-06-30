/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export default [{
  content: {
    attrType: 'STRING',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'INTEGER',
    pluginConfigurations: [],
    pluginMetaDatas: [{
      pluginClassName: 'fr.cnes.regards.modules.entities.plugin.IntSumComputePlugin',
      interfaceNames: ['fr.cnes.regards.modules.model.domain.IComputedAttribute'],
      author: 'REGARDS Team',
      pluginId: 'IntSumComputePlugin',
      version: '1.0.0',
      description: 'allows to compute the sum of IntegerAttribute according to a collection of data using the same IntegerAttribute name',
      url: 'https://github.com/RegardsOss',
      contact: 'regards@c-s.fr',
      owner: 'CSSI',
      licence: 'LGPLv3.0',
      parameters: [{
        name: 'resultAttributeName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
      }, {
        name: 'resultAttributeFragmentName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
      }, {
        name: 'parameterAttributeName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
      }, {
        name: 'parameterAttributeFragmentName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
      }],
    }],
  },
  links: [],
}, {
  content: {
    attrType: 'DOUBLE',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'DATE_ISO8601',
    pluginConfigurations: [{
      id: 1,
      pluginId: 'MinDateComputePlugin',
      label: 'CdppDatasetStartDate',
      version: '1.0.0',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'fr.cnes.regards.modules.entities.plugin.MinDateComputePlugin',
      interfaceNames: ['fr.cnes.regards.modules.model.domain.IComputedAttribute'],
      parameters: [{
        id: 3,
        name: 'parameterAttributeFragmentName',
        value: 'TIME_PERIOD',
        dynamic: false,
        dynamicsValues: [],
      }, {
        id: 2,
        name: 'parameterAttributeName',
        value: 'START_DATE',
        dynamic: false,
        dynamicsValues: [],
      }, {
        id: 1,
        name: 'resultAttributeName',
        value: 'START_DATE',
        dynamic: false,
        dynamicsValues: [],
      }],
    }, {
      id: 2,
      pluginId: 'MinDateComputePlugin',
      label: 'CdppDatasetStopDate',
      version: '1.0.0',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'fr.cnes.regards.modules.entities.plugin.MinDateComputePlugin',
      interfaceNames: ['fr.cnes.regards.modules.model.domain.IComputedAttribute'],
      parameters: [{
        id: 6,
        name: 'parameterAttributeFragmentName',
        value: 'TIME_PERIOD',
        dynamic: false,
        dynamicsValues: [],
      }, {
        id: 5,
        name: 'parameterAttributeName',
        value: 'STOP_DATE',
        dynamic: false,
        dynamicsValues: [],
      }, {
        id: 4,
        name: 'resultAttributeName',
        value: 'STOP_DATE',
        dynamic: false,
        dynamicsValues: [],
      }],
    }],
    pluginMetaDatas: [{
      pluginClassName: 'fr.cnes.regards.modules.entities.plugin.MaxDateComputePlugin',
      interfaceNames: ['fr.cnes.regards.modules.model.domain.IComputedAttribute'],
      author: 'REGARDS Team',
      pluginId: 'MaxDateComputePlugin',
      version: '1.0.0',
      description: 'allows to compute the maximum of a DateAttribute according to a collection of data',
      url: 'https://github.com/RegardsOss',
      contact: 'regards@c-s.fr',
      owner: 'CSSI',
      licence: 'LGPLv3.0',
      parameters: [{
        name: 'resultAttributeName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
      }, {
        name: 'resultAttributeFragmentName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
      }, {
        name: 'parameterAttributeName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
      }, {
        name: 'parameterAttributeFragmentName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
      }],
    }, {
      pluginClassName: 'fr.cnes.regards.modules.entities.plugin.MinDateComputePlugin',
      interfaceNames: ['fr.cnes.regards.modules.model.domain.IComputedAttribute'],
      author: 'REGARDS Team',
      pluginId: 'MinDateComputePlugin',
      version: '1.0.0',
      description: 'allows to compute the minimum of a DateAttribute according to a collection of data',
      url: 'https://github.com/RegardsOss',
      contact: 'regards@c-s.fr',
      owner: 'CSSI',
      licence: 'LGPLv3.0',
      parameters: [{
        name: 'resultAttributeName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
      }, {
        name: 'resultAttributeFragmentName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
      }, {
        name: 'parameterAttributeName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
      }, {
        name: 'parameterAttributeFragmentName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
      }],
    }],
  },
  links: [],
}, {
  content: {
    attrType: 'URL',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'BOOLEAN',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'STRING_ARRAY',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'INTEGER_ARRAY',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'DOUBLE_ARRAY',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'DATE_ARRAY',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'INTEGER_INTERVAL',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'DOUBLE_INTERVAL',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'DATE_INTERVAL',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'LONG',
    pluginConfigurations: [{
      id: 3,
      pluginId: 'CountPlugin',
      label: 'CdppDatasetNbObjects',
      version: '1.0.0',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'fr.cnes.regards.modules.dam.plugin.entities.CountPlugin',
      interfaceNames: ['fr.cnes.regards.modules.model.domain.IComputedAttribute'],
      parameters: [{
        id: 7,
        name: 'resultAttributeName',
        value: 'NB_OBJECTS',
        dynamic: false,
        dynamicsValues: [],
      }],
    }, {
      id: 4,
      pluginId: 'LongSumComputePlugin',
      label: 'CdppDatasetTotalSize',
      version: '1.0.0',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'fr.cnes.regards.modules.entities.plugin.LongSumComputePlugin',
      interfaceNames: ['fr.cnes.regards.modules.model.domain.IComputedAttribute'],
      parameters: [{
        id: 10,
        name: 'parameterAttributeFragmentName',
        value: '',
        dynamic: false,
        dynamicsValues: [],
      }, {
        id: 9,
        name: 'parameterAttributeName',
        value: 'FILE_SIZE',
        dynamic: false,
        dynamicsValues: [],
      }, {
        id: 8,
        name: 'resultAttributeName',
        value: 'TOTAL_SIZE',
        dynamic: false,
        dynamicsValues: [],
      }],
    }],
    pluginMetaDatas: [{
      pluginClassName: 'fr.cnes.regards.modules.dam.plugin.entities.CountPlugin',
      interfaceNames: ['fr.cnes.regards.modules.model.domain.IComputedAttribute'],
      author: 'REGARDS Team',
      pluginId: 'CountPlugin',
      version: '1.0.0',
      description: 'allows to compute the number of data of a Dataset',
      url: 'https://github.com/RegardsOss',
      contact: 'regards@c-s.fr',
      owner: 'CSSI',
      licence: 'LGPLv3.0',
      parameters: [{
        name: 'resultAttributeName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
      }, {
        name: 'resultAttributeFragmentName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
      }],
    }, {
      pluginClassName: 'fr.cnes.regards.modules.entities.plugin.LongSumComputePlugin',
      interfaceNames: ['fr.cnes.regards.modules.model.domain.IComputedAttribute'],
      author: 'REGARDS Team',
      pluginId: 'LongSumComputePlugin',
      version: '1.0.0',
      description: 'allows to compute the sum of LongAttribute according to a collection of data using the same LongAttribute name',
      url: 'https://github.com/RegardsOss',
      contact: 'regards@c-s.fr',
      owner: 'CSSI',
      licence: 'LGPLv3.0',
      parameters: [{
        name: 'resultAttributeName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
      }, {
        name: 'resultAttributeFragmentName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
      }, {
        name: 'parameterAttributeName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
      }, {
        name: 'parameterAttributeFragmentName',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
      }],
    }],
  },
  links: [],
}, {
  content: {
    attrType: 'LONG_INTERVAL',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}, {
  content: {
    attrType: 'LONG_ARRAY',
    pluginConfigurations: [],
    pluginMetaDatas: [],
  },
  links: [],
}]
