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
export default [{
  content: {
    label: 'Ma datasource simple',
    pluginConfigurationId: 1357,
    pluginConfigurationConnectionId: 1359,
    mapping: {
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
    },
    tableName: 't_fragment',
    fromClause: '',
  },
  links: [],
}, {
  content: {
    label: 'Ma datasource complexe',
    pluginConfigurationId: 1355,
    pluginConfigurationConnectionId: 1352,
    mapping: {
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
    },
    fromClause: 'FROM T1, T2, T3\nWHERE T1.tazerty = T2.poiuy\nAND T2.xcvbn = T3.uyjhntg',
    tableName: '',
  },
  links: [],
}]
