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
  content: [
    {
      content: {
        id: 1,
        label: 'Test première chaîne acquisition',
        active: true,
        mode: 'MANUAL',
        versioningMode: 'INC_VERSION',
        session: 'session-test',
        locked: false,
        lastActivationDate: '2018-02-19T14:11:19.181Z',
        ingestChain: 'firstIngestChain4DataProvider',
        storages: [
          {
            pluginBusinessId: 'LocalDataStorage',
            storePath: '/machin/chose',
            targetTypes: [],
          },
          {
            pluginBusinessId: 'Sacoche Infini',
            storePath: '',
            targetTypes: [],
          },
        ],
        categories: [
          'pikachu', 'soyouz', 'vendetta',
        ],
        fileInfos: [{
          id: 1,
          mandatory: true,
          scanPlugin: {
            id: 1,
            pluginId: 'GlobDiskScanning',
            label: 'scanPlugin-1518614316199',
            version: '1.0.0-SNAPSHOT',
            priorityOrder: 0,
            active: true,
            pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.GlobDiskScanning',
            interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.IScanPlugin'],
            parameters: [{
              id: 107, name: 'glob', value: '*', dynamic: false, dynamicsValues: [],
            }, {
              id: 106, name: 'directories', value: ['/regards-input/chris/data-provider-input'], dynamic: false, dynamicsValues: [],
            }],
          },
          lastModificationDate: '2018-02-15T09:57:06Z',
          mimeType: 'application/json',
          dataType: 'RAWDATA',
          comment: 'premier fichier',
        }],
        validationPluginConf: {
          id: 2, pluginId: 'DefaultFileValidation', label: 'validationPluginConf-1518614109397', version: '1.0.0-SNAPSHOT', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.DefaultFileValidation', interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.IValidationPlugin'], parameters: [],
        },
        productPluginConf: {
          id: 3,
          pluginId: 'DefaultProductPlugin',
          label: 'productPluginConf-1518614109398',
          version: '1.0.0-SNAPSHOT',
          priorityOrder: 0,
          active: true,
          pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.DefaultProductPlugin',
          interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.IProductPlugin'],
          parameters: [{
            id: 112, name: 'removeExtension', value: true, dynamic: false, dynamicsValues: [],
          }, {
            id: 111, name: 'maxLength', dynamic: false, dynamicsValues: [],
          }, {
            id: 110, name: 'maxLengthRequired', value: false, dynamic: false, dynamicsValues: [],
          }, {
            id: 109, name: 'prefix', dynamic: false, dynamicsValues: [],
          }, {
            id: 108, name: 'extensions', dynamic: false, dynamicsValues: [],
          }],
        },
        generateSipPluginConf: {
          id: 4, pluginId: 'DefaultSIPGeneration', label: 'generateSipPluginConf-1518614109398', version: '1.0.0-SNAPSHOT', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.DefaultSIPGeneration', interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.ISipGenerationPlugin'], parameters: [],
        },
        lastProductAcquisitionJobInfo: {
          id: '6b1351f8-b275-483f-8028-2645fa3a9f3d',
          priority: 0,
          result: 'null',
          parameters: [{ name: 'chain', value: '1', className: 'java.lang.Long' }],
          owner: 'regards-admin@c-s.fr',
          className: 'fr.cnes.regards.modules.acquisition.service.job.ProductAcquisitionJob',
          locked: true,
          status: {
            status: 'SUCCEEDED', statusDate: '2018-02-19T14:11:19.456Z', percentCompleted: 100, startDate: '2018-02-19T14:11:19.406Z', stopDate: '2018-02-19T14:11:19.456Z', queuedDate: '2018-02-19T14:11:19.181Z', completionChanged: false,
          },
        },
      },
      links: [{ rel: 'list', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains' } }, { rel: 'self', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/1', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/1' } }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/1', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/1' } }, { rel: 'start', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/1/start', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/1/start' } }, { rel: 'stop', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/1/stop', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/1/stop' } }],
    }, {
      content: {
        id: 2,
        label: 'tototo',
        active: false,
        mode: 'AUTO',
        versioningMode: 'MANUAL',
        locked: false,
        lastActivationDate: '2018-02-20T09:32:10.722Z',
        periodicity: 30,
        ingestChain: 'firstIngestChain4DataProvider',
        fileInfos: [{
          id: 2,
          mandatory: true,
          scanPlugin: {
            id: 5,
            pluginId: 'GlobDiskScanning',
            label: 'scanPlugin-1518622793378',
            version: '1.0.0-SNAPSHOT',
            priorityOrder: 0,
            active: true,
            pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.GlobDiskScanning',
            interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.IScanPlugin'],
            parameters: [{
              id: 153, name: 'directories', value: ['/regards-input/chris/data-provider-input/tototo'], dynamic: false, dynamicsValues: [],
            }, {
              id: 152, name: 'glob', value: '*.dat', dynamic: false, dynamicsValues: [],
            }],
          },
          lastModificationDate: '2018-02-15T13:52:29Z',
          mimeType: 'application/octet-stream',
          dataType: 'RAWDATA',
        }],
        validationPluginConf: {
          id: 6, pluginId: 'DefaultFileValidation', label: 'validationPluginConf-1518622793298', version: '1.0.0-SNAPSHOT', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.DefaultFileValidation', interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.IValidationPlugin'], parameters: [],
        },
        productPluginConf: {
          id: 7,
          pluginId: 'DefaultProductPlugin',
          label: 'productPluginConf-1518622793298',
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
          id: 8, pluginId: 'DefaultSIPGeneration', label: 'generateSipPluginConf-1518622793298', version: '1.0.0-SNAPSHOT', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.acquisition.service.plugins.DefaultSIPGeneration', interfaceNames: ['fr.cnes.regards.modules.acquisition.plugins.ISipGenerationPlugin'], parameters: [],
        },
        lastProductAcquisitionJobInfo: {
          id: 'd95658f3-e4c5-4382-aca8-db33c248ee96',
          priority: 0,
          result: 'null',
          parameters: [{ name: 'chain', value: '2', className: 'java.lang.Long' }],
          className: 'fr.cnes.regards.modules.acquisition.service.job.ProductAcquisitionJob',
          locked: true,
          status: {
            status: 'SUCCEEDED', statusDate: '2018-02-20T09:32:11.805Z', percentCompleted: 100, startDate: '2018-02-20T09:32:11.75Z', stopDate: '2018-02-20T09:32:11.805Z', queuedDate: '2018-02-20T09:32:10.722Z', completionChanged: false,
          },
        },
      },
      links: [{ rel: 'list', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains' } }, { rel: 'self', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/2', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/2' } }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/2', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/2' } }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/2', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/2' } }, { rel: 'stop', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/2/stop', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains/2/stop' } }],
    },
  ],
  metadata: {
    size: 100,
    totalElements: 2,
    totalPages: 1,
    number: 0,
  },
  links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-dataprovider/chains?page\u003d0\u0026size\u003d100', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-dataprovider/chains?page\u003d0\u0026size\u003d100' } }],
}
