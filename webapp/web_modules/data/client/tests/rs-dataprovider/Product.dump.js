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
export default {
  metadata: {
    size: 100, totalElements: 1, totalPages: 1, number: 0,
  },
  content: [{
    content: {
      id: 23,
      state: 'ACQUIRING',
      sipState: 'NOT_SCHEDULED',
      lastUpdate: '2018-02 - 15T09: 22: 08.442Z',
      productName: 'data_big_file_to_acquire',
      session: 'session - test',
      processingChain: {
        id: 2,
        label: 'tototo',
        active: false,
        mode: 'AUTO',
        locked: false,
        lastActivationDate: '2018 - 02 - 20T09: 32: 10.722Z',
        periodicity: 30,
        ingestChain: 'firstIngestChain4DataProvider',
        datasetIpId: 'URN: AIP: DATASET: project1: 7357a63a-e6ad - 4583 - a02c - 9c71c5123a4c: V1',
        fileInfos: [{
          id: 2,
          mandatory: true,
          scanPlugin: {
            id: 5,
            pluginId: 'GlobDiskScanning',
            label: 'scanPlugin - 1518622793378',
            version: '1.0.0-SNAPSHOT',
            priorityOrder: 0,
            active: true,
            pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.GlobDiskScanning',
            interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.IScanPlugin'],
            parameters: [{
              id: 153, name: 'directories', value: ['/regards-input/chris / data - provider - input / tototo'], dynamic: false, dynamicsValues: [],
            }, {
              id: 152, name: 'glob', value: '*.dat', dynamic: false, dynamicsValues: [],
            }],
          },
          lastModificationDate: '2018 - 02 - 15T13: 52: 29Z',
          mimeType: 'application / octet - stream',
          dataType: 'RAWDATA',
        }],
        validationPluginConf: {
          id: 6, pluginId: 'DefaultFileValidation', label: 'validationPluginConf - 1518622793298', version: '1.0.0-SNAPSHOT', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.DefaultFileValidation', interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.IValidationPlugin'], parameters: [],
        },
        productPluginConf: {
          id: 7,
          pluginId: 'DefaultProductPlugin',
          label: 'productPluginConf - 1518622793298',
          version: '1.0.0-SNAPSHOT',
          priorityOrder: 0,
          active: true,
          pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.DefaultProductPlugin',
          interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.IProductPlugin'],
          parameters: [{
            id: 158, name: 'removeExtension', value: true, dynamic: false, dynamicsValues: [],
          }, {
            id: 157, name: 'prefix', dynamic: false, dynamicsValues: [],
          }, {
            id: 156, name: 'maxLengthRequired', value: false, dynamic: false, dynamicsValues: [],
          }, {
            id: 155, name: 'maxLength', dynamic: false, dynamicsValues: [],
          }, {
            id: 154, name: 'extensions', dynamic: false, dynamicsValues: [],
          }],
        },
        generateSipPluginConf: {
          id: 8, pluginId: 'DefaultSIPGeneration', label: 'generateSipPluginConf - 1518622793298', version: '1.0.0-SNAPSHOT', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.DefaultSIPGeneration', interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.ISipGenerationPlugin'], parameters: [],
        },
        lastProductAcquisitionJobInfo: {
          id: 'd95658f3 - e4c5 - 4382 - aca8 - db33c248ee96',
          priority: 0,
          result: 'null',
          parameters: [{ name: 'chain', value: '2', className: 'java.lang.Long' }],
          className: 'fr.cnes.regards.modules.acquisition.service.job.ProductAcquisitionJob',
          locked: true,
          status: {
            status: 'SUCCEEDED', statusDate: '2018 - 02 - 20T09: 32: 11.805Z', percentCompleted: 100, startDate: '2018 - 02 - 20T09: 32: 11.75Z', stopDate: '2018 - 02 - 20T09: 32: 11.805Z', queuedDate: '2018 - 02 - 20T09: 32: 10.722Z', completionChanged: false,
          },
        },
      },
      fileList: [{
        id: 25,
        filePath: '/regards-input/chris / data - provider - input / data_big_file_to_acquire.dat',
        state: 'ACQUIRED',
        acqDate: '2018 - 02 - 15T09: 22: 03.865Z',
        checksum: '03c103f31617b6948619156b07216b13',
        checksumAlgorithm: 'MD5',
        fileInfo: {
          id: 1,
          mandatory: true,
          scanPlugin: {
            id: 1,
            pluginId: 'GlobDiskScanning',
            label: 'scanPlugin - 1518614316199',
            version: '1.0.0-SNAPSHOT',
            priorityOrder: 0,
            active: true,
            pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.GlobDiskScanning',
            interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.IScanPlugin'],
            parameters: [{
              id: 107, name: 'glob', value: '* ', dynamic: false, dynamicsValues: [],
            }, {
              id: 106, name: 'directories', value: [' / regards - input / chris / data - provider - input'], dynamic: false, dynamicsValues: [],
            }],
          },
          lastModificationDate: '2018 - 02 - 15T09: 57: 06Z',
          mimeType: 'application / json',
          dataType: 'RAWDATA',
          comment: 'premier fichier',
        },
      }, {
        id: 24,
        filePath: ' / regards - input / chris / data - provider - input / tototo / data_big_file_to_acquire.dat',
        state: 'ACQUIRED',
        acqDate: '2018 - 02 - 15T09: 18: 43.603Z',
        checksum: '05304278ac40e07d9bdc0a4a1189886b',
        checksumAlgorithm: 'MD5',
        fileInfo: {
          id: 2,
          mandatory: true,
          scanPlugin: {
            id: 5,
            pluginId: 'GlobDiskScanning',
            label: 'scanPlugin - 1518622793378',
            version: '1.0.0-SNAPSHOT',
            priorityOrder: 0,
            active: true,
            pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.GlobDiskScanning',
            interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.IScanPlugin'],
            parameters: [{
              id: 153, name: 'directories', value: ['/regards-input/chris / data - provider - input / tototo'], dynamic: false, dynamicsValues: [],
            }, {
              id: 152, name: 'glob', value: '*.dat', dynamic: false, dynamicsValues: [],
            }],
          },
          lastModificationDate: '2018 - 02 - 15T13: 52: 29Z',
          mimeType: 'application / octet - stream',
          dataType: 'RAWDATA',
        },
      }],
      sip: {
        ipType: 'DATA',
        id: 'data_big_file_to_acquire',
        geometry: null,
        properties: {
          contentInformations: [{
            representationInformation: { syntax: { mimeType: 'application / octet - stream' } },
            dataObject: {
              regardsDataType: 'RAWDATA', url: 'file:/ regards - input / chris / data - provider - input / tototo / data_big_file_to_acquire.dat', algorithm: 'MD5', checksum: '05304278ac40e07d9bdc0a4a1189886b',
            },
          }],
          pdi: {
            contextInformation: {}, referenceInformation: {}, provenanceInformation: { history: [{ comment: 'Product SIP generation', date: '2018 - 02 - 15T09: 18: 45.653Z' }] }, fixityInformation: {}, accessRightInformation: {},
          },
          descriptiveInformation: {},
        },
        type: 'Feature',
      },
      ipId: 'URN: SIP: DATA: project1: 36b20705 - 863b - 32ca - 90ea - 7a763c274efb: V1',
      lastSIPGenerationJobInfo: {
        id: '27fcc978 - d091 - 487f - 8dbd - 14b2bf50b615',
        priority: 0,
        result: 'null',
        parameters: [{ name: 'chain_id', value: '2', className: 'java.lang.Long' }, { name: 'product_id', value: '23', className: 'java.lang.Long' }],
        className: 'fr.cnes.regards.modules.acquisition.service.job.SIPGenerationJob',
        locked: true,
        status: {
          status: 'SUCCEEDED', statusDate: '2018 - 02 - 15T09: 18: 45.667Z', percentCompleted: 100, startDate: '2018 - 02 - 15T09: 18: 45.643Z', stopDate: '2018 - 02 - 15T09: 18: 45.667Z', queuedDate: '2018 - 02 - 15T09: 18: 45.452Z', completionChanged: false,
        },
      },
      lastSIPSubmissionJobInfo: {
        id: 'cbcc9ba8 - f50f - 40a8 - 9932 - 7eead664e081',
        priority: 0,
        result: 'null',
        parameters: [{ name: 'chain', value: '"firstIngestChain4DataProvider"', className: 'java.lang.String' }, { name: 'session', value: 'null' }],
        className: 'fr.cnes.regards.modules.acquisition.service.job.SIPSubmissionJob',
        locked: true,
        status: {
          status: 'SUCCEEDED', statusDate: '2018-02-15T09:18:48.852Z', percentCompleted: 100, startDate: '2018-02-15T09:18:48.626Z', stopDate: '2018-02-15T09:18:48.852Z', queuedDate: '2018-02-15T09:18:48.269Z', completionChanged: false,
        },
      },
    },
    links: [],
  }],
  links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-dataprovider/products?page\u003d0\u0026size\u003d100', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/products?page\u003d0\u0026size\u003d100' } }],
}
