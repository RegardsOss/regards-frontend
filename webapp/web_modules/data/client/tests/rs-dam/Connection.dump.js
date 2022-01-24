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
          type: 'STRING',
        },
        {
          name: 'password',
          value: 'admin',
          type: 'STRING',
        },
        {
          name: 'dbHost',
          value: 'localhost',
          type: 'STRING',
        },
        {
          name: 'dbPort',
          value: '1256',
          type: 'STRING',
        },
        {
          name: 'dbName',
          value: 'pierre',
          type: 'STRING',
        },
        {
          name: 'driver',
          type: 'STRING',
        },
        {
          name: 'maxPoolSize',
          value: '20',
          type: 'STRING',
        },
        {
          name: 'minPoolSize',
          value: '5',
          type: 'STRING',
        },
      ],
    },
    links: [],
  },
]
