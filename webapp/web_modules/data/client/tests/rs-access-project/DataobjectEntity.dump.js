/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export default {
  facets: [],
  metadata: {
    size: 143,
    totalElements: 26,
    totalPages: 1,
    number: 0,
  },
  content: [{
    content: {
      entityType: 'DATA',
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:b05d644e-b230-3c31-8562-23b988604689:V1',
      version: 1,
      last: true,
      providerId: 'dataObject1',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      label: 'Data file six',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2017-05-16T15:39:00Z',
        weight: 40,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DS2',
        description: 'Data file six',
      },
      geometry: null,
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:8bd850b3-c7c4-3244-8a76-34ce1dd86db2:V1',
      version: 1,
      last: true,
      providerId: 'dataObject2',
      label: 'dataObject2',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 42, // eslint wont fix: matches server format
        date: '2017-05-16T15:28:00Z',
        weight: 25,
        // eslint-disable-next-line camelcase
        value_d1: 0.666, // eslint wont fix: matches server format
        fragment1: {
          activated: true,
          state: 'STARTED',
        },
        DATASET_VALIDATION_TYPE: 'DS3',
        description: 'Dataset3 data number 4',
      },
      geometry: null,
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      providerId: 'dataObject3',
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:7a447b6e-7383-3ded-a92f-2486259eb29b:V1',
      version: 1,
      last: true,
      label: 'Private data 1',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2018-05-16T15:39:00Z',
        weight: 150,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DS4',
        description: 'Private data 1',
      },
      geometry: null,
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:6f3447e2-6b6d-33f6-b20b-7cfa90fcc145:V1',
      version: 1,
      last: true,
      providerId: 'dataObject4',
      label: 'Data file two',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 666, // eslint wont fix: matches server format
        date: '2016-05-16T15:28:00Z',
        weight: 10,
        // eslint-disable-next-line camelcase
        value_d1: 3.14157,
        fragment1: {
          activated: false,
          state: 'UPDATED',
        },
        DATASET_VALIDATION_TYPE: 'DS2',
        description: 'Data file two',
      },
      geometry: null,
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:55c9ad13-0748-3bfa-9eea-d4a8a278db46:V1',
      version: 1,
      last: true,
      providerId: 'dataObject5',
      label: 'Data file one',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 42, // eslint wont fix: matches server format
        date: '2017-05-16T15:28:00Z',
        weight: 25,
        // eslint-disable-next-line camelcase
        value_d1: 0.666, // eslint wont fix: matches server format
        fragment1: {
          activated: true,
          state: 'STARTED',
        },
        DATASET_VALIDATION_TYPE: 'DS2',
        description: 'Data file one',
      },
      geometry: null,
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:01ea0eb9-24c5-39f5-b693-aaec6d8c3b21:V1',
      version: 1,
      last: true,
      providerId: 'dataObject6',
      label: 'Public data',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2018-05-16T15:39:00Z',
        weight: 150,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DSP',
        description: 'Public data',
      },
      geometry: null,
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:7a0ff42f-098b-3b19-96cf-86a4d6fdaa39:V1',
      version: 1,
      last: true,
      providerId: 'dataObject7',
      label: 'Third test data',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: -1, // eslint wont fix: matches server format
        date: '2017-04-01T10:28:40.875Z',
        weight: 140,
        // eslint-disable-next-line camelcase
        value_d1: 1.4142, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'UPDATED',
        },
        DATASET_VALIDATION_TYPE: 'DS1',
        description: 'Third test data',
      },
      geometry: null,
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:356d7232-9455-362c-93ca-ab1b2072f6d4:V1',
      version: 1,
      last: true,
      providerId: 'dataObject8',
      geometry: null,
      label: 'Data file five',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1,
        date: '2017-01-01T00:00:00Z',
        weight: 40,
        // eslint-disable-next-line camelcase
        value_d1: 1.0,
        fragment1: {
          activated: true,
          state: 'STARTED',
        },
        DATASET_VALIDATION_TYPE: 'DS2',
        description: 'Data file five',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:c8c3e095-1e7f-3402-8102-c3b197a22886:V1',
      version: 1,
      last: true,
      providerId: 'dataObject9',
      geometry: null,
      label: 'Private data 3',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2020-05-16T15:39:00Z',
        weight: 150,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DS4',
        description: 'Private data 3',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:9812057f-4767-30b5-92bd-d326f41b1e18:V1',
      version: 1,
      last: true,
      providerId: 'dataObject10',
      geometry: null,
      label: 'First test data',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 42, // eslint wont fix: matches server format
        date: '2017-05-16T15:28:00Z',
        weight: 25,
        // eslint-disable-next-line camelcase
        value_d1: 0.666, // eslint wont fix: matches server format
        fragment1: {
          activated: true,
          state: 'STARTED',
        },
        DATASET_VALIDATION_TYPE: 'DS1',
        description: 'First test data',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:581ecca6-baca-3d29-b55d-d3ffea31f050:V1',
      version: 1,
      last: true,
      providerId: 'dataObject11',
      geometry: null,
      label: 'Data file seven',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2017-05-16T15:39:00Z',
        weight: 40,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DS2',
        description: 'Data file seven',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:7f4194f5-e861-39e4-bc96-ea7af9c21a86:V1',
      version: 1,
      last: true,
      providerId: 'dataObject12',
      geometry: null,
      label: 'Dataset3 data number 5',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2017-01-01T00:00:00Z',
        weight: 40,
        // eslint-disable-next-line camelcase
        value_d1: 1.0, // eslint wont fix: matches server format
        fragment1: {
          activated: true,
          state: 'STARTED',
        },
        DATASET_VALIDATION_TYPE: 'DS3',
        description: 'Dataset3 data number 5',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:e4f13926-94f0-3e0c-bab8-f048e29d02df:V1',
      version: 1,
      last: true,
      providerId: 'dataObject12',
      geometry: null,
      label: 'Universe atoms count',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2017-05-16T15:39:00Z',
        weight: 40,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DS1',
        description: 'Universe atoms count',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:99f81cbd-e970-3d44-9bb3-7e635fb9f8c3:V1',
      version: 1,
      last: true,
      providerId: 'dataObject13',
      geometry: null,
      label: 'Data file three',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: -1, // eslint wont fix: matches server format
        date: '2017-04-01T10:28:40.875Z',
        weight: 140,
        // eslint-disable-next-line camelcase
        value_d1: 1.4142, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'UPDATED',
        },
        DATASET_VALIDATION_TYPE: 'DS2',
        description: 'Data file three',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:4979f060-24f2-3451-a705-d43863094846:V1',
      version: 1,
      last: true,
      providerId: 'dataObject14',
      geometry: null,
      label: 'Data file nine',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2017-05-16T15:39:00Z',
        weight: 40,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DS2',
        description: 'Data file nine',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:5b60a81a-cdb2-34c2-b657-b18a6f4806bd:V1',
      version: 1,
      last: true,
      providerId: 'dataObject15',
      geometry: null,
      label: 'Dataset3 data number 1',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 42, // eslint wont fix: matches server format
        date: '2017-05-16T15:28:00Z',
        weight: 25,
        // eslint-disable-next-line camelcase
        value_d1: 0.666, // eslint wont fix: matches server format
        fragment1: {
          activated: true,
          state: 'STARTED',
        },
        DATASET_VALIDATION_TYPE: 'DS3',
        description: 'Dataset3 data number 1',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:2bc79969-f6f3-31fa-accd-a07c01b66422:V1',
      version: 1,
      last: true,
      providerId: 'dataObject16',
      geometry: null,
      label: 'Data file four',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 42, // eslint wont fix: matches server format
        date: '2017-05-16T15:28:00Z',
        weight: 25,
        // eslint-disable-next-line camelcase
        value_d1: 0.666, // eslint wont fix: matches server format
        fragment1: {
          activated: true,
          state: 'STARTED',
        },
        DATASET_VALIDATION_TYPE: 'DS2',
        description: 'Data file four',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:b09265d4-eac2-39f9-ae2f-156d56c4b0bd:V1',
      version: 1,
      last: true,
      providerId: 'dataObject17',
      geometry: null,
      label: 'Dataset3 data number 3',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: -1, // eslint wont fix: matches server format
        date: '2017-04-01T10:28:40.875Z',
        weight: 140,
        // eslint-disable-next-line camelcase
        value_d1: 1.4142, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'UPDATED',
        },
        DATASET_VALIDATION_TYPE: 'DS3',
        description: 'Dataset3 data number 3',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:6a5644ea-e481-33d0-8d40-117e05b4d8f2:V1',
      version: 1,
      last: true,
      providerId: 'dataObject18',
      geometry: null,
      label: 'Data file ten',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2017-05-16T15:39:00Z',
        weight: 40,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DS2',
        description: 'Data file ten',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:9ec57df6-59e5-3e41-8772-fdf6cc497ea3:V1',
      version: 1,
      last: true,
      providerId: 'dataObject19',
      geometry: null,
      label: 'Dataset3 data number 6',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2017-05-16T15:39:00Z',
        weight: 40,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DS3',
        description: 'Dataset3 data number 6',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:7f245ada-935c-311b-8f4b-af4b4f16d1f7:V1',
      version: 1,
      last: true,
      providerId: 'dataObject20',
      geometry: null,
      label: 'Private data 2',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2019-05-16T15:39:00Z',
        weight: 150,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DS4',
        description: 'Private data 2',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:d4957c82-d39a-3261-88b5-c0806e3db31c:V1',
      version: 1,
      last: true,
      providerId: 'dataObject21',
      geometry: null,
      label: 'Data file height',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2017-05-16T15:39:00Z',
        weight: 40,
        // eslint-disable-next-line camelcase
        value_d1: 1.0E80, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'STOPPED',
        },
        DATASET_VALIDATION_TYPE: 'DS2',
        description: 'Data file height',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:cbb70269-f5f7-3e37-b214-77e49b22e197:V1',
      version: 1,
      last: true,
      providerId: 'dataObject22',
      geometry: null,
      label: 'First test data copy',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 42, // eslint wont fix: matches server format
        date: '2017-05-16T15:28:00Z',
        weight: 25,
        // eslint-disable-next-line camelcase
        value_d1: 0.666, // eslint wont fix: matches server format
        fragment1: {
          activated: true,
          state: 'STARTED',
        },
        DATASET_VALIDATION_TYPE: 'DS1',
        description: 'First test data copy',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:146eae92-826b-3ed5-a8d2-b5d26b7a0132:V1',
      version: 1,
      last: true,
      providerId: 'dataObject23',
      geometry: null,
      label: 'Dataset3 data number 2',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 666, // eslint wont fix: matches server format
        date: '2016-05-16T15:28:00Z',
        weight: 10,
        // eslint-disable-next-line camelcase
        value_d1: 3.14157, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'UPDATED',
        },
        DATASET_VALIDATION_TYPE: 'DS3',
        description: 'Dataset3 data number 2',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:41eceb38-46f4-33d3-941b-7bf76c96bdd1:V1',
      version: 1,
      last: true,
      providerId: 'dataObject24',
      geometry: null,
      label: 'Second test data',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 666, // eslint wont fix: matches server format
        date: '2016-05-16T15:28:00Z',
        weight: 10,
        // eslint-disable-next-line camelcase
        value_d1: 3.14157, // eslint wont fix: matches server format
        fragment1: {
          activated: false,
          state: 'UPDATED',
        },
        DATASET_VALIDATION_TYPE: 'DS1',
        description: 'Second test data',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }, {
    content: {
      entityType: 'DATA',
      files: {
        THUMBNAIL: [{
          dataType: 'THUMBNAIL',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA',
          filename: 'test_thumbnail.png',
          reference: false,
          uri: 'http://172.26.47.107/img/test_thumbnail.png',
          online: true,
          mimeType: 'image/png',
        }],
      },
      id: 'URN:AIP:DATA:raph_tests_validation_1_1_0__2:8d1170e7-c477-3cfc-9bca-a1bc7241f39d:V1',
      version: 1,
      last: true,
      providerId: 'dataObject25',
      geometry: null,
      label: 'Happy New Year !',
      model: 'DATA_MODEL_1',
      tags: ['URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1'],
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 1, // eslint wont fix: matches server format
        date: '2017-01-01T00:00:00Z',
        weight: 40,
        // eslint-disable-next-line camelcase
        value_d1: 1.0, // eslint wont fix: matches server format
        fragment1: {
          activated: true,
          state: 'STARTED',
        },
        DATASET_VALIDATION_TYPE: 'DS1',
        description: 'Happy New Year !',
      },
      services: [{
        content: {
          configId: 53,
          label: 'VALIDATION-PLUGIN-CATALOG-CONF-1',
          applicationModes: ['MANY', 'ONE'],
          entityTypes: ['DATASET'],
          type: 'CATALOG',
        },
        links: [],
      }, {
        content: {
          configId: 1,
          label: 'VALIDATION-SERVICE-IHM-CONFIG',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }, {
        content: {
          configId: 2,
          label: 'VALIDATION-SERVICE-IHM-CONFIG-1',
          iconUrl: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_pie_chart_white_24px.svg',
          applicationModes: ['ONE', 'MANY'],
          entityTypes: ['DATA'],
          type: 'UI',
        },
        links: [],
      }],
    },
    links: [],
  }],
  links: [{
    rel: 'self',
    href: 'http://c40c7e0c2d11:9036/dataobjects/search',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://c40c7e0c2d11:9036/dataobjects/search',
    },
  }],
}
