/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
      entityType: 'DATASET',
      providerId: 'dataset1',
      id: 'URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1',
      label: 'validation_jeu_1',
      model: 'VALIDATION_DATASET_MODEL_1',
      tags: [],
      properties: {
        name: 'validation_jeu_1',
        values_l1_sum: 2261,
        end_date: '2020-05-16T15:39:00Z',
        start_date: '2016-05-16T15:28:00Z',
        count: 26,
      },
      geometry: null,
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
