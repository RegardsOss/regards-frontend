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
        label: 'sdfqsdf',
        entityType: 'DATASET',
        score: 0,
        attributes: {
          Attribute_0_0: 'QSDf',
          'Fragment 2': {
            Attribute_4: 'qsdf',
          },
        },
        model: {
          id: 2,
          name: 'VALIDATION_DATASET_MODEL_1',
          description: 'Validation dataset model',
          version: '1',
          type: 'DATASET',
        },
        creationDate: '2017-06-09T13:35:53.408Z',
        dataModel: 5,
        plgConfDataSource: {
          id: 6,
          pluginId: 'postgresql-datasource-single-table',
          label: 'validation_1_ds',
          version: '1.0-SNAPSHOT',
          priorityOrder: 0,
          active: true,
          pluginClassName: 'fr.cnes.regards.modules.datasources.plugins.PostgreDataSourceFromSingleTablePlugin',
          interfaceNames: ['fr.cnes.regards.modules.datasources.plugins.interfaces.IDataSourceFromSingleTablePlugin', 'fr.cnes.regards.modules.datasources.plugins.interfaces.IDataSourcePlugin'],
          parameters: [{
            id: 18,
            name: 'connection',
            pluginConfiguration: {
              id: 1,
              pluginId: 'postgresql-db-connection',
              label: 'rs_ext_validation_db',
              version: '1.0-SNAPSHOT',
              priorityOrder: 0,
              active: true,
              pluginClassName: 'fr.cnes.regards.modules.datasources.plugins.DefaultPostgreConnectionPlugin',
              interfaceNames: ['fr.cnes.regards.modules.datasources.plugins.interfaces.IDBConnectionPlugin', 'fr.cnes.regards.modules.datasources.plugins.interfaces.IConnectionPlugin'],
              parameters: [{
                id: 7,
                name: 'minPoolSize',
                value: '3',
                dynamic: false,
                dynamicsValues: [],
              }, {
                id: 6,
                name: 'maxPoolSize',
                value: '10',
                dynamic: false,
                dynamicsValues: [],
              }, {
                id: 5,
                name: 'dbName',
                value: 'rs_ext_validation_db',
                dynamic: false,
                dynamicsValues: [],
              }, {
                id: 4,
                name: 'dbPort',
                value: '5432',
                dynamic: false,
                dynamicsValues: [],
              }, {
                id: 3,
                name: 'dbHost',
                value: 'rs_postgres',
                dynamic: false,
                dynamicsValues: [],
              }, {
                id: 2,
                name: 'password',
                value: 'azertyuiop123456789',
                dynamic: false,
                dynamicsValues: [],
              }, {
                id: 1,
                name: 'user',
                value: 'azertyuiop123456789',
                dynamic: false,
                dynamicsValues: [],
              }],
            },
            dynamic: false,
            dynamicsValues: [],
          }, {
            id: 20,
            name: 'table',
            value: 't_validation_1',
            dynamic: false,
            dynamicsValues: [],
          }, {
            id: 19,
            name: 'model',
            value: '{"model":1,"attributesMapping":[{"name":"sipId","type":"LONG","nameDS":"id"},{"name":"label","type":"STRING","nameDS":"description"},{"name":"weight","type":"INTEGER","namespace":"","nameDS":"weight"},{"name":"date","type":"DATE_ISO8601","namespace":"","nameDS":"creation_date"},{"name":"value_l1","type":"LONG","namespace":"","nameDS":"value_l1"},{"name":"value_d1","type":"DOUBLE","namespace":"","nameDS":"value_d1"},{"name":"activated","type":"BOOLEAN","namespace":"fragment1","nameDS":"activated"},{"name":"state","type":"STRING","namespace":"fragment1","nameDS":"state"},{"name":"description","type":"STRING","namespace":"","nameDS":"description"}]}',
            dynamic: false,
            dynamicsValues: [],
          }],
        },
        groups: [],
        tags: [
          'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
          'habla espanol',
        ],
        ipId: 'URN:AIP:DATASET:project1:e206f4e2-8bb7-4955-b5b6-0cfdca1b3238:V1',
        subsetting: 'fqsdsdf qsdf qsf sdf sf f',
        id: 23,
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