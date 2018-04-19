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
  content: [
    {
      content: {
        entityType: 'DOCUMENT',
        documents: [{
          uri: 'http://localhost/documents/5320/files/62779b161b80fcc2d7df2577346d6b48',
          checksum: '62779b161b80fcc2d7df2577346d6b48',
          digestAlgorithm: 'MD5',
          size: 15,
          mimeType: {
            type: 'text',
            subtype: 'plain',
            parameters: {},
          },
        }, {
          uri: 'http://localhost/documents/5320/files/de7b451b9f8097bd9e127babe4c52a80',
          checksum: 'de7b451b9f8097bd9e127babe4c52a80',
          digestAlgorithm: 'MD5',
          size: 8618,
          mimeType: {
            type: 'application',
            subtype: 'pdf',
            parameters: {},
          },
        }],
        ipId: 'URN:AIP:DOCUMENT:PROJECT:d3c87a0f-9edb-4a34-84b5-41c69abf41a3:V1',
        label: 'label',
        model: {
          id: 6160,
          name: 'modelName2',
          description: 'model desc',
          type: 'DOCUMENT',
        },
        lastUpdate: '2017-09-19T15:57:15.335Z',
        creationDate: '2017-09-19T15:57:15.201Z',
        id: 5320,
        sipId: 'SipId2',
        tags: [],
        groups: [],
        properties: {},
      },
      links: [{
        rel: 'self',
        href: 'http://localhost/documents/5320',
        template: {
          variables: {
            variables: [],
          },
          baseUri: 'http://localhost/documents/5320',
        },
      }, {
        rel: 'list',
        href: 'http://localhost/documents',
        template: {
          variables: {
            variables: [],
          },
          baseUri: 'http://localhost/documents',
        },
      }, {
        rel: 'update',
        href: 'http://localhost/documents/5320',
        template: {
          variables: {
            variables: [],
          },
          baseUri: 'http://localhost/documents/5320',
        },
      }, {
        rel: 'dissociate',
        href: 'http://localhost/documents/5320/dissociate',
        template: {
          variables: {
            variables: [],
          },
          baseUri: 'http://localhost/documents/5320/dissociate',
        },
      }],
    },
  ],
  metadata: {
    number: 0,
    size: 100,
    totalElements: 1,
  },
  links: [],
}