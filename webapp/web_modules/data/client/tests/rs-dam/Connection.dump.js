/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
      businessId: 'toulouse',
      version: 'V1',
      priorityOrder: '42',
      active: false,
      parameters: [
        {
          name: 'user',
          value: 'admin',
          TYPE: 'STRING',
        },
        {
          name: 'password',
          value: 'admin',
          TYPE: 'STRING',
        },
        {
          name: 'dbHost',
          value: 'localhost',
          TYPE: 'STRING',
        },
        {
          name: 'dbPort',
          value: '1256',
          TYPE: 'STRING',
        },
        {
          name: 'dbName',
          value: 'pierre',
          TYPE: 'STRING',
        },
        {
          name: 'driver',
          TYPE: 'STRING',
        },
        {
          name: 'maxPoolSize',
          value: '20',
          TYPE: 'STRING',
        },
        {
          name: 'minPoolSize',
          value: '5',
          TYPE: 'STRING',
        },
      ],
    },
    links: [],
  },
]
