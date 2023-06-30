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
    size: 2,
    totalElements: 2,
    totalPages: 1,
    number: 0,
  },
  content: [
    {
      content: {
        id: 1,
        label: 'Conf for all datasets',
        configuration: {
          id: 520,
          active: true,
          interfacenames: [
            'fr.cnes.regards.modules.search.domain.plugin.ISearchEngine',
          ],
          label: 'Global opensearch engine',
          pluginId: 'opensearch',
          version: '1.0.0',
          priorityOrder: 0,
          pluginClassName: 'fr.cnes.regards.modules.search.rest.engine.plugin.opensearch.OpenSearchEngine',
          parameters: [],
          iconUrl: '',
        },
        datasetUrn: null,
        dataset: null,
      },
      links: [
        {
          rel: 'update',
          link: 'plop',
        },
        {
          rel: 'delete',
          link: 'plop',
        },
        {
          rel: 'search',
          href: 'http://172.26.47.52/api/v1/rs-catalog/engines/opensearch/entities/search',
        },
      ],
    },
    {
      content: {
        id: 2,
        label: 'Conf for one dataset',
        configuration: {
          id: 953,
          pluginId: 'opensearch',
          label: '394f43bf-abd5-4fc9-bdfe-19e5e9b31b47',
          version: '1.0.0',
          priorityOrder: 0,
          active: true,
          pluginClassName: 'fr.cnes.regards.modules.search.rest.engine.plugin.opensearch.OpenSearchEngine',
          interfaceNames: [
            'fr.cnes.regards.modules.search.domain.plugin.ISearchEngine',
          ],
          parameters: [
            {
              id: 952,
              name: 'timeExtension',
              value: {
                activated: true,
              },
              dynamic: false,
              dynamicsValues: [],
              onlyDynamic: false,
            },
            {
              id: 953,
              name: 'regardsExtension',
              value: {
                activated: true,
              },
              dynamic: false,
              dynamicsValues: [],
              onlyDynamic: false,
            },
            {
              id: 954,
              name: 'mediaExtension',
              value: {
                activated: true,
              },
              dynamic: false,
              dynamicsValues: [],
              onlyDynamic: false,
            },
            {
              id: 955,
              name: 'parametersConfiguration',
              value: [
                {
                  name: 'planet',
                  optionsEnabled: true,
                  optionsCardinality: 10,
                  attributeModelJsonPath: 'properties.planet',
                },
                {
                  name: 'start',
                  namespace: 'time',
                  optionsEnabled: false,
                  optionsCardinality: 0,
                  attributeModelJsonPath: 'properties.TimePeriod.startDate',
                },
                {
                  name: 'end',
                  namespace: 'time',
                  optionsEnabled: false,
                  optionsCardinality: 0,
                  attributeModelJsonPath: 'properties.TimePeriod.stopDate',
                },
              ],
              dynamic: false,
              dynamicsValues: [],
              onlyDynamic: false,
            },
            {
              id: 956,
              name: 'engineConfiguration',
              value: {
                searchTitle: 'search',
                searchDescription: 'desc',
                contact: 'regards@c-s.fr',
                image: 'http://plop/image.png',
                attribution: 'Plop',
                entityLastUpdateDatePropertyPath: 'TimePeriod.startDate',
              },
              dynamic: false,
              dynamicsValues: [],
              onlyDynamic: false,
            },
          ],
        },
        datasetUrn: 'URN:AIP:DATASET:project1:27de606c-a6cd-411f-a5ba-bd1b2f29c965:V1',
        dataset: {
          type: 'DATASET',
          id: 1,
          ipId: 'URN:AIP:DATASET:project1:27de606c-a6cd-411f-a5ba-bd1b2f29c965:V1',
          model: {
            name: 'MockedModel',
          },
          dataModel: '5',
          creationDate: '2017-06-09T13:35:53.408Z',
          tags: [],
          groups: [],
          feature: {
            entityType: 'DATASET',
            label: 'Mocked dataset response from mock dataset dam client',
            model: 'MockedModel',
            files: {},
            tags: [],
            id: 'URN:AIP:DATASET:project1:27de606c-a6cd-411f-a5ba-bd1b2f29c965:V1',
            providerId: 'datasetTest',
            properties: {},
          },
        },
      },
      links: [
        {
          rel: 'update',
          link: 'plop',
        },
        {
          rel: 'delete',
          link: 'plop',
        },
        {
          rel: 'search',
          href: 'http://172.26.47.52/api/v1/rs-catalog/engines/opensearch/datasets/URN:AIP:DATASET:project1:27de606c-a6cd-411f-a5ba-bd1b2f29c965:V1/dataobjects/search',
        },
      ],
    },
  ],
}
