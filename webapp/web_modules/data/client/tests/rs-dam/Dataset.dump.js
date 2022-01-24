/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
        type: 'DATASET',
        id: 23,
        ipId: 'URN:AIP:DATASET:project1:e206f4e2-8bb7-4955-b5b6-0cfdca1b3238:V1',
        feature: {
          label: 'sdfqsdf',
          model: 'VALIDATION_DATASET_MODEL_1',
          entityType: 'DATASET',
          type: 'Feature',
          tags: [
            'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
            'habla espanol',
          ],
          attributes: {
            // eslint-disable-next-line camelcase
            Attribute_0_0: 'QSDf', // eslint wont fix: matches server format
            'Fragment 2': {
              // eslint-disable-next-line camelcase
              Attribute_4: 'qsdf', // eslint wont fix: matches server format
            },
          },
          providerId: 'dataset1',
          id: 'URN:AIP:DATASET:project1:e206f4e2-8bb7-4955-b5b6-0cfdca1b3238:V1',
        },
        model: {
          id: 2,
          name: 'VALIDATION_DATASET_MODEL_1',
          description: 'Validation dataset model',
          version: '1',
          type: 'DATASET',
        },
        creationDate: '2017-06-09T13:35:53.408Z',
        dataModel: '5',
        plgConfDataSource: {
          id: 6,
          businessId: 'validation_1_ds',
          pluginId: 'postgresql-datasource-single-table',
          label: 'validation_1_ds',
          version: '1.0-SNAPSHOT',
          priorityOrder: 0,
          active: true,
          parameters: [{
            id: 18,
            name: 'connection',
            type: 'PLUGIN',
            value: 'rs_ext_validation_db',
          }, {
            id: 20,
            name: 'table',
            value: 't_validation_1',
            type: 'STRING',
            dynamicsValues: [],
          }, {
            id: 19,
            name: 'model',
            value: '{"model":1,"attributesMapping":[{"name":"sipId","type":"LONG","nameDS":"id"},{"name":"label","type":"STRING","nameDS":"description"},{"name":"weight","type":"INTEGER","namespace":"","nameDS":"weight"},{"name":"date","type":"DATE_ISO8601","namespace":"","nameDS":"creation_date"},{"name":"value_l1","type":"LONG","namespace":"","nameDS":"value_l1"},{"name":"value_d1","type":"DOUBLE","namespace":"","nameDS":"value_d1"},{"name":"activated","type":"BOOLEAN","namespace":"fragment1","nameDS":"activated"},{"name":"state","type":"STRING","namespace":"fragment1","nameDS":"state"},{"name":"description","type":"STRING","namespace":"","nameDS":"description"}]}',
            type: 'STRING',
          }],
        },
        groups: [],
        tags: [
          'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
          'habla espanol',
        ],
        subsetting: 'fqsdsdf qsdf qsf sdf sf f',
      },
      links: [],
    },
  ],
  metadata: {
    number: 0,
    size: 100,
    totalElements: 1,
  },
  links: [],
}
