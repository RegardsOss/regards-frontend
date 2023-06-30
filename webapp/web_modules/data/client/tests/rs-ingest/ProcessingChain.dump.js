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
    size: 100, totalElements: 3, totalPages: 1, number: 0,
  },
  content: [
    {
      content: {
        id: 2,
        name: 'ma_premiere_chaine',
        description: 'chris - une première chaine ',
        validationPlugin: {
          id: 3, pluginId: 'DefaultSipValidation', label: 'validationPlugin-1518444928074', version: '1.0.0', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.ingest.service.plugin.DefaultSipValidation', interfaceNames: ['fr.cnes.regards.modules.ingest.domain.plugin.ISipValidation'], parameters: [],
        },
        generationPlugin: {
          id: 4, pluginId: 'DefaultSingleAIPGeneration', label: 'generationPlugin-1518444929442', version: '1.0.0', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.ingest.service.plugin.DefaultSingleAIPGeneration', interfaceNames: ['fr.cnes.regards.modules.ingest.domain.plugin.IAipGeneration'], parameters: [],
        },
      },
      links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/ma_premiere_chaine', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/ma_premiere_chaine' } }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/ma_premiere_chaine', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/ma_premiere_chaine' } }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/ma_premiere_chaine', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/ma_premiere_chaine' } }],
    }, {
      content: {
        id: 52,
        name: 'firstIngestChain4DataProvider',
        description: 'premiere chaine pour test data provider',
        validationPlugin: {
          id: 52, pluginId: 'DefaultSipValidation', label: 'validationPlugin-1518615052589', version: '1.0.0', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.ingest.service.plugin.DefaultSipValidation', interfaceNames: ['fr.cnes.regards.modules.ingest.domain.plugin.ISipValidation'], parameters: [],
        },
        generationPlugin: {
          id: 53, pluginId: 'DefaultSingleAIPGeneration', label: 'generationPlugin-1518615054570', version: '1.0.0', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.ingest.service.plugin.DefaultSingleAIPGeneration', interfaceNames: ['fr.cnes.regards.modules.ingest.domain.plugin.IAipGeneration'], parameters: [],
        },
        tagPlugin: {
          id: 56,
          pluginId: 'DefaultAIPTagging',
          label: 'tagPlugin-1518618875395',
          version: '1.0.0',
          priorityOrder: 0,
          active: true,
          pluginClassName: 'fr.cnes.regards.modules.ingest.service.plugin.DefaultAIPTagging',
          interfaceNames: ['fr.cnes.regards.modules.ingest.domain.plugin.IAipTagging'],
          parameters: [{
            id: 1, name: 'tags', value: ['ChrisModel4DataProvider'], dynamic: false, dynamicsValues: [],
          }, {
            id: 2, name: 'links', dynamic: false, dynamicsValues: [],
          }],
        },
      },
      links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/firstIngestChain4DataProvider', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/firstIngestChain4DataProvider' } }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/firstIngestChain4DataProvider', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/firstIngestChain4DataProvider' } }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/firstIngestChain4DataProvider', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/firstIngestChain4DataProvider' } }],
    }, {
      content: {
        id: 1,
        name: 'DefaultProcessingChain',
        validationPlugin: {
          id: 1, pluginId: 'DefaultSipValidation', label: 'DefaultSIPValidation', version: '1.0.0', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.ingest.service.plugin.DefaultSipValidation', interfaceNames: ['fr.cnes.regards.modules.ingest.domain.plugin.ISipValidation'], parameters: [],
        },
        generationPlugin: {
          id: 2, pluginId: 'DefaultSingleAIPGeneration', label: 'DefaultAIPGeneration', version: '1.0.0', priorityOrder: 0, active: true, pluginClassName: 'fr.cnes.regards.modules.ingest.service.plugin.DefaultSingleAIPGeneration', interfaceNames: ['fr.cnes.regards.modules.ingest.domain.plugin.IAipGeneration'], parameters: [],
        },
      },
      links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/DefaultProcessingChain', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/DefaultProcessingChain' } }, { rel: 'update', href: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/DefaultProcessingChain', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-ingest/processingchains/DefaultProcessingChain' } }],
    }],
  links: [{ rel: 'self', href: 'http://172.26.47.52/api/v1/rs-ingest/processingchains?page\u003d0\u0026size\u003d100', template: { variables: { variables: [] }, baseUri: 'http://172.26.47.52/api/v1/rs-ingest/processingchains?page\u003d0\u0026size\u003d100' } }],
}
