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
export default [
  {
    content: {
      label: 'Hello Toulouse',
      id: 1353,
      version: 'V1',
      priorityOrder: '42',
      active: false,
      pluginClassName: 'fr.cnes.regards.framework.plugins.SampleErrorPlugin',
      parameters: [
        {
          name: 'user',
          value: 'admin',
          dynamic: false,
        },
        {
          name: 'password',
          value: 'admin',
          dynamic: false,
        },
        {
          name: 'dbHost',
          value: 'localhost',
          dynamic: false,
        },
        {
          name: 'dbPort',
          value: '1256',
          dynamic: false,
        },
        {
          name: 'dbName',
          value: 'pierre',
          dynamic: false,
        },
        {
          name: 'driver',
          dynamic: false,
        },
        {
          name: 'maxPoolSize',
          value: '20',
          dynamic: false,
        },
        {
          name: 'minPoolSize',
          value: '5',
          dynamic: false,
        },
      ],
    },
    links: [],
  },
]
