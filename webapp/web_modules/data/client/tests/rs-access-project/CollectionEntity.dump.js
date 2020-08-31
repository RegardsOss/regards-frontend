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
  metadata: {
    size: 143,
    totalElements: 1,
    totalPages: 1,
    number: 0,
  },
  content: [{
    content: {
      entityType: 'COLLECTION',
      providerId: 'TestCollection1',
      id: 'URN:AIP:DATASET:raph_tests_validation_1_1_0__2:90dc4ef0-8cb9-4246-a2ae-156ed032e09d:V1',
      version: 1,
      last: true,
      model: '1',
      label: 'collection1',
      tags: [],
      files: {
        DESCRIPTION: [{
          dataType: 'DESCRIPTION',
          reference: true,
          filename: 'description.pdf',
          online: true,
          uri: 'http://localhost/documents/5320/files/description.pdf',
          mimeType: 'application/pdf',
        }],
      },
      properties: {
        name: 'collection1',
        // eslint-disable-next-line camelcase
        values_l1_sum: 2261, // eslint wont fix: matches server format
        // eslint-disable-next-line camelcase
        end_date: '2020-05-16T15:39:00Z', // eslint wont fix: matches server format
        // eslint-disable-next-line camelcase
        start_date: '2016-05-16T15:28:00Z', // eslint wont fix: matches server format
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
