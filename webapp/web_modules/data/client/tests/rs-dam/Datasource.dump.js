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
export default [{
  content: {
    label: 'Ma datasource simple',
    id: 1357,
    businessId: 'simple',
    version: '0.0',
    priorityOrder: 0,
    active: true,
    parameters: [{
      id: 59,
      name: 'connection',
      value: 'toulouse',
      type: 'PLUGIN',
    }, {
      id: 60,
      name: 'table',
      value: 't_fragment',
      type: 'STRING',
    }, {
      id: 61,
      name: 'model',
      type: 'POJO',
      clazz: 'fr.test',
      value: {
        model: 1,
        attributesMapping: [{
          model: 5,
          attributesMapping: [
            {
              name: 'Attribute_0_0',
              type: 'STRING',
              nameSpace: 'Fragment 1',
              isPrimaryKey: true,
              typeDS: 'int8',
              nameDS: 'id',
            },
            {
              name: 'Attribute_4',
              type: 'STRING',
              nameSpace: 'Fragment 2',
              isPrimaryKey: false,
              nameDS: 'count(*)',
            },
          ],
        }],
      },
    }, {
      id: 854,
      name: 'refreshRate',
      value: 864000,
      type: 'INTEGER',
    }],
  },
},
{
  content: {
    label: 'Ma datasource complexe',
    id: 1355,
    version: '0.0',
    priorityOrder: 0,
    active: true,
    pluginClassName: 'fr.cnes.regards.modules.datasources.plugins.PostgreDataSourceFromSingleTablePlugin',
    interfaceNames: ['fr.cnes.regards.modules.datasources.plugins.interfaces.IDBDataSourceFromSingleTablePlugin', 'fr.cnes.regards.modules.datasources.plugins.interfaces.IDataSourcePlugin'],
    parameters: [{
      id: 59,
      name: 'connection',
      pluginConfiguration: {
        id: 1352,
      },
    }, {
      id: 60,
      name: 'fromClause',
      value: 'FROM T1, T2, T3\nWHERE T1.tazerty = T2.poiuy\nAND T2.xcvbn = T3.uyjhntg',
      dynamic: false,
      dynamicsValues: [],
    }, {
      id: 854,
      name: 'refreshRate',
      value: 864000,
      dynamic: false,
      dynamicsValues: [],
    }, {
      id: 61,
      name: 'model',
      value: {
        model: 1,
        attributesMapping: [{
          model: 5,
          attributesMapping: [
            {
              name: 'Attribute_0_0',
              type: 'STRING',
              nameSpace: 'Fragment 1',
              isPrimaryKey: true,
              nameDS: 'T1.id',
            },
            {
              name: 'Attribute_4',
              type: 'STRING',
              nameSpace: 'Fragment 2',
              isPrimaryKey: false,
              nameDS: 'count(*)',
            },
          ],
        }],
      },
    }],
  },
},
]
