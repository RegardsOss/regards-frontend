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
module.exports = {
  metadata: {
    size: 143,
    totalElements: 1,
    totalPages: 1,
    number: 0,
  },
  content: [{
    content: {
      entityType: 'COLLECTION',
      score: 0,
      plgConfDataSource: {
        id: 6,
        pluginId: 'postgresql-datasource-single-table',
        label: 'VALIDATION_DS',
        version: '1.0-SNAPSHOT',
        priorityOrder: 0,
        active: true,
        pluginClassName: 'fr.cnes.regards.modules.datasources.plugins.PostgreDataSourceFromSingleTablePlugin',
        interfaceNames: ['fr.cnes.regards.modules.datasources.plugins.interfaces.IDataSourceFromSingleTablePlugin', 'fr.cnes.regards.modules.datasources.plugins.interfaces.IDataSourcePlugin'],
        parameters: [],
      },
      dataModel: 1,
      subsettingClause: {
        '@type@': 'fr.cnes.regards.modules.indexer.domain.criterion.AndCriterion',
        criterions: [{
          '@type@': 'fr.cnes.regards.modules.indexer.domain.criterion.EmptyCriterion',
        }, {
          '@type@': 'fr.cnes.regards.modules.indexer.domain.criterion.LongMatchCriterion',
          type: 'EQUALS',
          value: 6,
          name: 'dataSourceId',
        }],
      },
      openSearchSubsettingClause: '',
      quotations: [],
      metadata: {
        dataObjectsGroups: ['TheGroup'],
      },
      descriptionFile: {
        type: 'text/markdown',
      },
      ipId: 'URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1',
      label: 'validation_jeu_1',
      model: {
        id: 2,
        name: 'VALIDATION_DATASET_MODEL_1',
        description: 'Validation dataset model',
        version: '1',
        type: 'DATASET',
      },
      lastUpdate: '2017-09-27T14:43:38.5Z',
      creationDate: '2017-09-19T10:05:03.374Z',
      id: 1,
      tags: [],
      groups: ['TheGroup'],
      properties: {
        name: 'validation_jeu_1',
        values_l1_sum: 2261,
        end_date: '2020-05-16T15:39:00Z',
        start_date: '2016-05-16T15:28:00Z',
        count: 26,
      },
      services: [],
    },
    links: [{
      rel: 'self',
      href: 'http://c40c7e0c2d11:9036/datasets/URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://c40c7e0c2d11:9036/datasets/URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1',
      },
    }, {
      rel: 'dataobjects',
      href: 'http://c40c7e0c2d11:9036/dataobjects/search?q\u003dtags:URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1',
      template: {
        variables: {
          variables: [],
        },
        baseUri: 'http://c40c7e0c2d11:9036/dataobjects/search?q\u003dtags:URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1',
      },
    }],
  }],
  links: [{
    rel: 'self',
    href: 'http://c40c7e0c2d11:9036/datasets/search?size\u003d143\u0026page\u003d0',
    template: {
      variables: {
        variables: [],
      },
      baseUri: 'http://c40c7e0c2d11:9036/datasets/search?size\u003d143\u0026page\u003d0',
    },
  }],
}
