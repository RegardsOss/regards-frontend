/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export default [
  {
    content: {
      id: 40,
      pluginId: 'aComplexErrorPlugin',
      label: 'a plugin configuration for the test',
      version: '12345-6789-11',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'param31',
          value: 'value31',
          dynamic: true,
        },
        {
          name: 'param32',
          value: 'value32',
          dynamic: false,
        },
        {
          name: 'param33',
          value: 'value33',
          dynamic: false,
        },
        {
          name: 'param34',
          value: 'value34',
          dynamic: false,
        },
        {
          name: 'param35',
          value: 'value35',
          dynamic: false,
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 12,
      pluginId: 'aComplexPlugin',
      label: 'This is a configuration',
      version: '1.2.0',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'coeff',
          value: '42',
          dynamic: true,
        },
        {
          name: 'isActive',
          value: 'true',
          dynamic: false,
        },
        {
          name: 'plgInterface',
          value: '40',
          dynamic: false,
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 11,
      pluginId: 'aComplexPlugin',
      label: 'A configuration',
      version: '1.0.0',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'coeff',
          value: '43',
          dynamic: true,
        },
        {
          name: 'isActive',
          value: 'false',
          dynamic: false,
        },
        {
          name: 'plgInterface',
          value: '40',
          dynamic: false,
        },
      ],
    },
    links: [],
  },
  {
    content: {
      id: 10,
      pluginId: 'aComplexPlugin',
      label: 'An other configuration',
      version: '1.0.0',
      priorityOrder: 0,
      active: false,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'coeff',
          value: '44',
          dynamic: true,
        },
        {
          name: 'isActive',
          value: 'true',
          dynamic: false,
        },
        {
          name: 'plgInterface',
          value: '12',
          dynamic: false,
        },
      ],
    },
    links: [],
  },
]
