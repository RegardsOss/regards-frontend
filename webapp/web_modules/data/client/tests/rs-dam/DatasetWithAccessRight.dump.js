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
export default {
  metadata: {
    size: 20, totalElements: 4, totalPages: 1, number: 0,
  },
  content: [{
    content: {
      datasetIpId: 'URN:AIP:DATASET:project1:7cb64c2a-a866-4c18-9cf7-08fef9dfcc6c:V1',
      dataset: {
        type: 'DATASET',
        plgConfDataSource: {
          id: 353,
          pluginId: 'aip-storage-datasource',
          label: 'CDPP - ARCAD3',
          businessId: '4e853aad-6aa7-4efb-9927-8fadeaeeaf4b',
          version: '1.0-SNAPSHOT',
          priorityOrder: 0,
          active: true,
          parameters: [{
            name: 'binding map',
            type: 'MAP',
            value: {
              label: 'properties.descriptiveInformation.product_name', 'properties.SIPAD_DATASET': 'properties.descriptiveInformation.productName', 'properties.TIME_PERIOD.STOP_DATE': 'properties.descriptiveInformation.time_period.stop_date', 'properties.TIME_PERIOD.START_DATE': 'properties.descriptiveInformation.time_period.start_date',
            },
            dynamic: false,
          }, {
            name: 'modelName', type: 'STRING', value: 'CDPP_DATA_MODEL', dynamic: false,
          }, {
            name: 'refreshRate', type: 'INTEGER', value: 86400, dynamic: false,
          }, {
            name: 'subsettingCategories', type: 'COLLECTION', value: ['CDPP'], dynamic: false,
          }, {
            name: 'attribute file size', type: 'STRING', value: 'FILE_SIZE', dynamic: false,
          }],
        },
        dataModel: 'CDPP_DATA_MODEL',
        subsettingClause: { '@type@': 'fr.cnes.regards.modules.indexer.domain.criterion.EmptyCriterion' },
        openSearchSubsettingClause: '',
        metadata: { dataObjectsGroups: {} },
        id: 153,
        ipId: 'URN:AIP:DATASET:project1:7cb64c2a-a866-4c18-9cf7-08fef9dfcc6c:V1',
        creationDate: '2019-12-03T16:02:08.3Z',
        lastUpdate: '2019-12-03T16:04:16.061Z',
        model: {
          id: 353, name: 'CDPP_DATASET_MODEL', description: 'Description d\u0027un jeu de données pour le CDPP', version: '1', type: 'DATASET',
        },
        tags: [],
        groups: ['GroupePublic'],
        feature: {
          providerId: 'CDPP_ARCAD3',
          entityType: 'DATASET',
          label: 'Arcad3',
          model: 'CDPP_DATASET_MODEL',
          files: {
            THUMBNAIL: [{
              dataType: 'THUMBNAIL', reference: false, uri: 'http://vm-perf.cloud-espace.si.c-s.fr:9030/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:7cb64c2a-a866-4c18-9cf7-08fef9dfcc6c:V1/files/10bd6450f2c7bf97f5e1b8233f85181f', mimeType: 'image/jpeg', online: true, checksum: '10bd6450f2c7bf97f5e1b8233f85181f', digestAlgorithm: 'MD5', filesize: 184425, filename: 'ff7-1.jpg',
            }],
            DESCRIPTION: [{
              dataType: 'DESCRIPTION', reference: false, uri: 'http://vm-perf.cloud-espace.si.c-s.fr:9030/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:7cb64c2a-a866-4c18-9cf7-08fef9dfcc6c:V1/files/86326cfd9c6d62785987e639e038aa46', mimeType: 'text/markdown', online: true, checksum: '86326cfd9c6d62785987e639e038aa46', digestAlgorithm: 'MD5', filesize: 4159, filename: 'cassini-rpws-native-l1-data-description.md',
            }],
          },
          tags: [],
          id: 'URN:AIP:DATASET:project1:7cb64c2a-a866-4c18-9cf7-08fef9dfcc6c:V1',
          properties: {
            FILE_FORMAT: 'NATIVE',
            PROCESSING_LEVEL: 'UNCALIBRATED',
            PHYSICAL_PARAMETER: {
              ENTITY: 'PROTON', COMPOUND: 'PLASMA_BETA', PROPERTY: ['MAGNITUDE', 'PROBE_POTENTIAL'], FLUCTUATIONS: 'WAVEFORM',
            },
            TEMPORAL_EXTRACTION_DEFINITION: { DATE_TYPE: 'CCSDS_ASCII', FILE_TYPE: 'VARIABLE_BINARY_RECORD' },
          },
          type: 'Feature',
        },
      },
    },
    links: [],
  }, {
    content: {
      datasetIpId: 'URN:AIP:DATASET:project1:1b3aaeb5-c475-46a1-9454-3c69c05215ea:V1',
      dataset: {
        type: 'DATASET',
        plgConfDataSource: {
          id: 2,
          pluginId: 'aip-storage-datasource',
          label: 'DoubleEntitiesCrawler - Raph',
          businessId: 'DoubleEntitiesCrawlerRaph',
          version: '1.0-SNAPSHOT',
          priorityOrder: 0,
          active: true,
          parameters: [{
            name: 'binding map',
            type: 'MAP',
            value: {
              label: 'properties.descriptiveInformation.label', 'properties.firstDouble': 'properties.descriptiveInformation.firstDouble', 'properties.thirdDouble': 'properties.descriptiveInformation.thirdDouble', 'properties.fourthDouble': 'properties.descriptiveInformation.fourthDouble', 'properties.secondDouble': 'properties.descriptiveInformation.secondDouble', 'properties.firstDoubleArray': 'properties.descriptiveInformation.firstDoubleArray',
            },
            dynamic: false,
          }, {
            name: 'modelName', type: 'STRING', value: 'TheDoubleEntities', dynamic: false,
          }, {
            name: 'refreshRate', type: 'INTEGER', value: 86400, dynamic: false,
          }, {
            name: 'tags', type: 'COLLECTION', value: ['DOUBLE_DATA'], dynamic: false,
          }, {
            name: 'subsettingTags', type: 'COLLECTION', value: [], dynamic: false,
          }, {
            name: 'subsettingCategories', type: 'COLLECTION', value: ['TEST_PRECISION'], dynamic: false,
          }],
        },
        dataModel: 'TheDoubleEntities',
        subsettingClause: { '@type@': 'fr.cnes.regards.modules.indexer.domain.criterion.EmptyCriterion' },
        openSearchSubsettingClause: '',
        metadata: { dataObjectsGroups: {} },
        id: 1,
        ipId: 'URN:AIP:DATASET:project1:1b3aaeb5-c475-46a1-9454-3c69c05215ea:V1',
        creationDate: '2019-11-22T14:24:04.214Z',
        lastUpdate: '2019-12-04T08:46:16.024Z',
        model: {
          id: 53, name: 'DatasetForDoubleData', description: 'Dataset for double data', type: 'DATASET',
        },
        tags: ['URN:AIP:COLLECTION:project1:17e6b3e1-99ea-4882-b21a-39bee24a6cb5:V1'],
        groups: ['Group1', 'RestrictedAccessTests'],
        feature: {
          providerId: 'DoublesDataset1', entityType: 'DATASET', label: 'DoublesDataset1', model: 'DatasetForDoubleData', files: {}, tags: ['URN:AIP:COLLECTION:project1:17e6b3e1-99ea-4882-b21a-39bee24a6cb5:V1'], id: 'URN:AIP:DATASET:project1:1b3aaeb5-c475-46a1-9454-3c69c05215ea:V1', properties: { firstDouble: 1.2345 }, type: 'Feature',
        },
      },
      accessRight: {
        id: 108,
        qualityFilter: { maxScore: 0, minScore: 0 },
        accessLevel: 'RESTRICTED_ACCESS',
        dataAccessLevel: 'NO_ACCESS',
        dataset: {
          type: 'DATASET',
          plgConfDataSource: {
            id: 2,
            pluginId: 'aip-storage-datasource',
            label: 'DoubleEntitiesCrawler - Raph',
            businessId: 'DoubleEntitiesCrawlerRaph',
            version: '1.0-SNAPSHOT',
            priorityOrder: 0,
            active: true,
            parameters: [{
              name: 'binding map',
              type: 'MAP',
              value: {
                label: 'properties.descriptiveInformation.label', 'properties.firstDouble': 'properties.descriptiveInformation.firstDouble', 'properties.thirdDouble': 'properties.descriptiveInformation.thirdDouble', 'properties.fourthDouble': 'properties.descriptiveInformation.fourthDouble', 'properties.secondDouble': 'properties.descriptiveInformation.secondDouble', 'properties.firstDoubleArray': 'properties.descriptiveInformation.firstDoubleArray',
              },
              dynamic: false,
            }, {
              name: 'modelName', type: 'STRING', value: 'TheDoubleEntities', dynamic: false,
            }, {
              name: 'refreshRate', type: 'INTEGER', value: 86400, dynamic: false,
            }, {
              name: 'tags', type: 'COLLECTION', value: ['DOUBLE_DATA'], dynamic: false,
            }, {
              name: 'subsettingTags', type: 'COLLECTION', value: [], dynamic: false,
            }, {
              name: 'subsettingCategories', type: 'COLLECTION', value: ['TEST_PRECISION'], dynamic: false,
            }],
          },
          dataModel: 'TheDoubleEntities',
          subsettingClause: { '@type@': 'fr.cnes.regards.modules.indexer.domain.criterion.EmptyCriterion' },
          openSearchSubsettingClause: '',
          metadata: { dataObjectsGroups: {} },
          id: 1,
          ipId: 'URN:AIP:DATASET:project1:1b3aaeb5-c475-46a1-9454-3c69c05215ea:V1',
          creationDate: '2019-11-22T14:24:04.214Z',
          lastUpdate: '2019-12-04T08:46:16.024Z',
          model: {
            id: 53, name: 'DatasetForDoubleData', description: 'Dataset for double data', type: 'DATASET',
          },
          tags: ['URN:AIP:COLLECTION:project1:17e6b3e1-99ea-4882-b21a-39bee24a6cb5:V1'],
          groups: ['Group1', 'RestrictedAccessTests'],
          feature: {
            providerId: 'DoublesDataset1', entityType: 'DATASET', label: 'DoublesDataset1', model: 'DatasetForDoubleData', files: {}, tags: ['URN:AIP:COLLECTION:project1:17e6b3e1-99ea-4882-b21a-39bee24a6cb5:V1'], id: 'URN:AIP:DATASET:project1:1b3aaeb5-c475-46a1-9454-3c69c05215ea:V1', properties: { firstDouble: 1.2345 }, type: 'Feature',
          },
        },
        accessGroup: {
          id: 102, name: 'Group1', users: [], isPublic: false, isInternal: false,
        },
      },
    },
    links: [],
  }, {
    content: {
      datasetIpId: 'URN:AIP:DATASET:project1:075bc1d9-0f3e-4275-8f8e-bbca8f092229:V1',
      dataset: {
        type: 'DATASET',
        plgConfDataSource: {
          id: 254,
          pluginId: 'aip-storage-datasource',
          label: 'Départements francais',
          businessId: '598947bc-4fe1-4e1b-976e-7e3f025425a4',
          version: '1.0-SNAPSHOT',
          priorityOrder: 0,
          active: true,
          parameters: [{
            name: 'binding map', type: 'MAP', value: { label: 'properties.descriptiveInformation.nom', 'properties.Code': 'properties.descriptiveInformation.code', 'properties.Name': 'properties.descriptiveInformation.nom' }, dynamic: false,
          }, {
            name: 'modelName', type: 'STRING', value: 'Departement', dynamic: false,
          }, {
            name: 'refreshRate', type: 'INTEGER', value: 30, dynamic: false,
          }, {
            name: 'tags', type: 'COLLECTION', value: [], dynamic: false,
          }, {
            name: 'subsettingTags', type: 'COLLECTION', value: [], dynamic: false,
          }, {
            name: 'subsettingCategories', type: 'COLLECTION', value: ['France'], dynamic: false,
          }, {
            name: 'attribute file size', type: 'STRING', value: 'FileSize', dynamic: false,
          }],
        },
        dataModel: 'Departement',
        subsettingClause: { '@type@': 'fr.cnes.regards.modules.indexer.domain.criterion.EmptyCriterion' },
        openSearchSubsettingClause: '',
        metadata: { dataObjectsGroups: {} },
        id: 152,
        ipId: 'URN:AIP:DATASET:project1:075bc1d9-0f3e-4275-8f8e-bbca8f092229:V1',
        creationDate: '2019-12-03T15:20:12.904Z',
        lastUpdate: '2019-12-03T16:01:25.566Z',
        model: {
          id: 302, name: 'Pays', description: 'Pays', type: 'DATASET',
        },
        tags: [],
        groups: ['Group1', 'GroupePublic'],
        feature: {
          providerId: 'France', entityType: 'DATASET', label: 'France', model: 'Pays', files: {}, tags: [], id: 'URN:AIP:DATASET:project1:075bc1d9-0f3e-4275-8f8e-bbca8f092229:V1', properties: {}, type: 'Feature',
        },
      },
      accessRight: {
        id: 106,
        qualityFilter: { maxScore: 0, minScore: 0 },
        accessLevel: 'CUSTOM_ACCESS',
        dataAccessPlugin: {
          id: 358,
          pluginId: 'CustomDataObjectsAccessPlugin',
          label: 'dataAccessPlugin-1575388871438',
          businessId: '3cdd3520-2257-4938-8f97-37e252e56423',
          version: '4.0.0-SNAPSHOT',
          priorityOrder: 0,
          active: true,
          parameters: [{
            name: 'openSearchFilter', type: 'STRING', value: 'prit*', dynamic: false,
          }],
        },
        dataAccessLevel: 'INHERITED_ACCESS',
        dataset: {
          type: 'DATASET',
          plgConfDataSource: {
            id: 254,
            pluginId: 'aip-storage-datasource',
            label: 'Départements francais',
            businessId: '598947bc-4fe1-4e1b-976e-7e3f025425a4',
            version: '1.0-SNAPSHOT',
            priorityOrder: 0,
            active: true,
            parameters: [{
              name: 'binding map', type: 'MAP', value: { label: 'properties.descriptiveInformation.nom', 'properties.Code': 'properties.descriptiveInformation.code', 'properties.Name': 'properties.descriptiveInformation.nom' }, dynamic: false,
            }, {
              name: 'modelName', type: 'STRING', value: 'Departement', dynamic: false,
            }, {
              name: 'refreshRate', type: 'INTEGER', value: 30, dynamic: false,
            }, {
              name: 'tags', type: 'COLLECTION', value: [], dynamic: false,
            }, {
              name: 'subsettingTags', type: 'COLLECTION', value: [], dynamic: false,
            }, {
              name: 'subsettingCategories', type: 'COLLECTION', value: ['France'], dynamic: false,
            }, {
              name: 'attribute file size', type: 'STRING', value: 'FileSize', dynamic: false,
            }],
          },
          dataModel: 'Departement',
          subsettingClause: { '@type@': 'fr.cnes.regards.modules.indexer.domain.criterion.EmptyCriterion' },
          openSearchSubsettingClause: '',
          metadata: { dataObjectsGroups: {} },
          id: 152,
          ipId: 'URN:AIP:DATASET:project1:075bc1d9-0f3e-4275-8f8e-bbca8f092229:V1',
          creationDate: '2019-12-03T15:20:12.904Z',
          lastUpdate: '2019-12-03T16:01:25.566Z',
          model: {
            id: 302, name: 'Pays', description: 'Pays', type: 'DATASET',
          },
          tags: [],
          groups: ['Group1', 'GroupePublic'],
          feature: {
            providerId: 'France', entityType: 'DATASET', label: 'France', model: 'Pays', files: {}, tags: [], id: 'URN:AIP:DATASET:project1:075bc1d9-0f3e-4275-8f8e-bbca8f092229:V1', properties: {}, type: 'Feature',
          },
        },
        accessGroup: {
          id: 102, name: 'Group1', users: [], isPublic: false, isInternal: false,
        },
      },
    },
    links: [],
  }, {
    content: {
      datasetIpId: 'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1',
      dataset: {
        type: 'DATASET',
        plgConfDataSource: {
          id: 153,
          pluginId: 'postgresql-datasource-single-table',
          label: 'DATASOURCE_REGARDS_2044',
          businessId: 'e2cfedc7-bdfc-432c-8434-9b774ba4fdc0',
          version: '2.0-SNAPSHOT',
          priorityOrder: 0,
          active: true,
          parameters: [{
            name: 'connection', type: 'PLUGIN', value: '49a91957-c721-456f-8665-f71a3e376e50', dynamic: false,
          }, {
            name: 'refreshRate', type: 'INTEGER', value: 86400, dynamic: false,
          }, {
            name: 'tags', type: 'COLLECTION', value: ['BADABOUM'], dynamic: false,
          }, {
            name: 'modelName', type: 'STRING', value: 'DATA_MODEL_REGARDS_2044', dynamic: false,
          }, {
            name: 'table', type: 'STRING', value: 't_validation_1', dynamic: false, dynamicsValues: [],
          }, {
            name: 'mapping',
            type: 'COLLECTION',
            value: [{
              name: 'providerId', type: 'STRING', nameDS: 'id', namespace: '', attributeType: 'STATIC',
            }, {
              name: 'label', type: 'STRING', nameDS: 'description', namespace: '', attributeType: 'STATIC',
            }, {
              name: 'thumbnail', type: 'STRING', nameDS: '\u0027http://vm-perf.cloud-espace.si.c-s.fr/img/gb_flag.png\u0027', namespace: '', attributeType: 'STATIC',
            }, {
              name: 'rawdata', type: 'STRING', nameDS: '\u0027http://vm-perf.cloud-espace.si.c-s.fr/img/fr_flag.png\u0027', namespace: '', attributeType: 'STATIC',
            }, {
              name: 'weight', type: 'INTEGER', nameDS: 'weight', namespace: '', attributeType: 'DYNAMIC',
            }, {
              name: 'date', type: 'DATE_ISO8601', nameDS: 'creation_date', namespace: '', attributeType: 'DYNAMIC',
            }, {
              name: 'value_l1', type: 'LONG', nameDS: 'value_l1', namespace: '', attributeType: 'DYNAMIC',
            }, {
              name: 'value_d1', type: 'DOUBLE', nameDS: 'value_d1', namespace: '', attributeType: 'DYNAMIC',
            }, {
              name: 'DATASET_VALIDATION_TYPE', type: 'STRING', nameDS: 'type', namespace: '', attributeType: 'DYNAMIC',
            }, {
              name: 'activated', type: 'BOOLEAN', nameDS: 'activated', namespace: 'fragment1', attributeType: 'DYNAMIC',
            }, {
              name: 'state', type: 'STRING', nameDS: 'state', namespace: 'fragment1', attributeType: 'DYNAMIC',
            }, {
              name: 'description', type: 'STRING', nameDS: 'description', namespace: '', attributeType: 'DYNAMIC',
            }],
            dynamic: false,
            dynamicsValues: [],
          }],
        },
        dataModel: 'DATA_MODEL_REGARDS_2044',
        subsettingClause: { '@type@': 'fr.cnes.regards.modules.indexer.domain.criterion.EmptyCriterion' },
        openSearchSubsettingClause: '',
        metadata: { dataObjectsGroups: {} },
        id: 102,
        ipId: 'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1',
        creationDate: '2019-12-03T14:02:53.789Z',
        lastUpdate: '2019-12-03T14:24:06.619Z',
        model: {
          id: 160, name: 'DATASET_MODEL_REGARDS_2044', description: 'Dataset model REGARDS-2044', version: '1', type: 'DATASET',
        },
        tags: [],
        groups: ['Group1'],
        feature: {
          providerId: 'ds_1',
          entityType: 'DATASET',
          label: 'validation_jeu_1',
          model: 'DATASET_MODEL_REGARDS_2044',
          files: {
            DESCRIPTION: [{
              dataType: 'DESCRIPTION', reference: false, uri: 'http://vm-perf.cloud-espace.si.c-s.fr:9030/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1/files/6e9cf885fbb3c63632c68cbaa2f20f2a', mimeType: 'application/pdf', online: true, checksum: '6e9cf885fbb3c63632c68cbaa2f20f2a', digestAlgorithm: 'MD5', filesize: 23913, filename: 'description.pdf',
            }, {
              dataType: 'DESCRIPTION', reference: false, uri: 'http://vm-perf.cloud-espace.si.c-s.fr:9030/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1/files/8a4e58755d4ce01d0d5a6ff6b9e14142', mimeType: 'text/x-markdown', online: true, checksum: '8a4e58755d4ce01d0d5a6ff6b9e14142', digestAlgorithm: 'MD5', filesize: 107, filename: 'description.md',
            }],
          },
          tags: [],
          id: 'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1',
          properties: { name: 'le jeu de données de validation 1.1', Missions: ['Spot', 'Jason'] },
          type: 'Feature',
        },
      },
      accessRight: {
        id: 53,
        qualityFilter: { maxScore: 10, minScore: 0, qualityLevel: 'ACCEPTED' },
        accessLevel: 'FULL_ACCESS',
        dataAccessPlugin: {
          id: 302,
          pluginId: 'CustomDataObjectsAccessPlugin',
          label: 'dataAccessPlugin-1575383102739',
          businessId: 'bf6cdc3c-57ce-4aa6-bea2-8a3ba188aeac',
          version: '4.0.0-SNAPSHOT',
          priorityOrder: 0,
          active: true,
          parameters: [{
            name: 'openSearchFilter', type: 'STRING', value: 'prout*', dynamic: false,
          }],
        },
        dataAccessLevel: 'INHERITED_ACCESS',
        dataset: {
          type: 'DATASET',
          plgConfDataSource: {
            id: 153,
            pluginId: 'postgresql-datasource-single-table',
            label: 'DATASOURCE_REGARDS_2044',
            businessId: 'e2cfedc7-bdfc-432c-8434-9b774ba4fdc0',
            version: '2.0-SNAPSHOT',
            priorityOrder: 0,
            active: true,
            parameters: [{
              name: 'connection', type: 'PLUGIN', value: '49a91957-c721-456f-8665-f71a3e376e50', dynamic: false,
            }, {
              name: 'refreshRate', type: 'INTEGER', value: 86400, dynamic: false,
            }, {
              name: 'tags', type: 'COLLECTION', value: ['BADABOUM'], dynamic: false,
            }, {
              name: 'modelName', type: 'STRING', value: 'DATA_MODEL_REGARDS_2044', dynamic: false,
            }, {
              name: 'table', type: 'STRING', value: 't_validation_1', dynamic: false, dynamicsValues: [],
            }, {
              name: 'mapping',
              type: 'COLLECTION',
              value: [{
                name: 'providerId', type: 'STRING', nameDS: 'id', namespace: '', attributeType: 'STATIC',
              }, {
                name: 'label', type: 'STRING', nameDS: 'description', namespace: '', attributeType: 'STATIC',
              }, {
                name: 'thumbnail', type: 'STRING', nameDS: '\u0027http://vm-perf.cloud-espace.si.c-s.fr/img/gb_flag.png\u0027', namespace: '', attributeType: 'STATIC',
              }, {
                name: 'rawdata', type: 'STRING', nameDS: '\u0027http://vm-perf.cloud-espace.si.c-s.fr/img/fr_flag.png\u0027', namespace: '', attributeType: 'STATIC',
              }, {
                name: 'weight', type: 'INTEGER', nameDS: 'weight', namespace: '', attributeType: 'DYNAMIC',
              }, {
                name: 'date', type: 'DATE_ISO8601', nameDS: 'creation_date', namespace: '', attributeType: 'DYNAMIC',
              }, {
                name: 'value_l1', type: 'LONG', nameDS: 'value_l1', namespace: '', attributeType: 'DYNAMIC',
              }, {
                name: 'value_d1', type: 'DOUBLE', nameDS: 'value_d1', namespace: '', attributeType: 'DYNAMIC',
              }, {
                name: 'DATASET_VALIDATION_TYPE', type: 'STRING', nameDS: 'type', namespace: '', attributeType: 'DYNAMIC',
              }, {
                name: 'activated', type: 'BOOLEAN', nameDS: 'activated', namespace: 'fragment1', attributeType: 'DYNAMIC',
              }, {
                name: 'state', type: 'STRING', nameDS: 'state', namespace: 'fragment1', attributeType: 'DYNAMIC',
              }, {
                name: 'description', type: 'STRING', nameDS: 'description', namespace: '', attributeType: 'DYNAMIC',
              }],
              dynamic: false,
              dynamicsValues: [],
            }],
          },
          dataModel: 'DATA_MODEL_REGARDS_2044',
          subsettingClause: { '@type@': 'fr.cnes.regards.modules.indexer.domain.criterion.EmptyCriterion' },
          openSearchSubsettingClause: '',
          metadata: { dataObjectsGroups: {} },
          id: 102,
          ipId: 'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1',
          creationDate: '2019-12-03T14:02:53.789Z',
          lastUpdate: '2019-12-03T14:24:06.619Z',
          model: {
            id: 160, name: 'DATASET_MODEL_REGARDS_2044', description: 'Dataset model REGARDS-2044', version: '1', type: 'DATASET',
          },
          tags: [],
          groups: ['Group1'],
          feature: {
            providerId: 'ds_1',
            entityType: 'DATASET',
            label: 'validation_jeu_1',
            model: 'DATASET_MODEL_REGARDS_2044',
            files: {
              DESCRIPTION: [{
                dataType: 'DESCRIPTION', reference: false, uri: 'http://vm-perf.cloud-espace.si.c-s.fr:9030/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1/files/6e9cf885fbb3c63632c68cbaa2f20f2a', mimeType: 'application/pdf', online: true, checksum: '6e9cf885fbb3c63632c68cbaa2f20f2a', digestAlgorithm: 'MD5', filesize: 23913, filename: 'description.pdf',
              }, {
                dataType: 'DESCRIPTION', reference: false, uri: 'http://vm-perf.cloud-espace.si.c-s.fr:9030/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1/files/8a4e58755d4ce01d0d5a6ff6b9e14142', mimeType: 'text/x-markdown', online: true, checksum: '8a4e58755d4ce01d0d5a6ff6b9e14142', digestAlgorithm: 'MD5', filesize: 107, filename: 'description.md',
              }],
            },
            tags: [],
            id: 'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1',
            properties: { name: 'le jeu de données de validation 1.1', Missions: ['Spot', 'Jason'] },
            type: 'Feature',
          },
        },
        accessGroup: {
          id: 102, name: 'Group1', users: [], isPublic: false, isInternal: false,
        },
      },
    },
    links: [],
  }],
  links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr:9030/api/v1/rs-dam/datasets/access-rights/group/Group1?offset\u003d0\u0026page\u003d0\u0026size\u003d20\u0026sort\u003did,asc' }],
}
