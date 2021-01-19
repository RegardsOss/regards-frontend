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

/**
 * Mock server response for UIPluginDefinition entities
 * @author Léo Mieulet
 */
export default {
  content: [
    {
      content: {
        id: 1,
        name: 'string-criteria',
        type: 'CRITERIA',
        sourcePath: '/plugins/criterion/string/plugin.js',
      },
      links: [
        {
          rel: 'self',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'delete',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'update',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'create',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'list',
          href: 'http://localhost:3333/unused',
        },
      ],
    },
    {
      content: {
        id: 2,
        name: 'numerical-criteria',
        type: 'CRITERIA',
        sourcePath: '/plugins/criterion/numerical/plugin.js',
      },
      links: [
        {
          rel: 'self',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'delete',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'update',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'create',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'list',
          href: 'http://localhost:3333/unused',
        },
      ],
    },
    {
      content: {
        id: 3,
        name: 'two-numerical-criteria',
        type: 'CRITERIA',
        sourcePath: '/plugins/criterion/two-numerical/plugin.js',
      },
      links: [
        {
          rel: 'self',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'delete',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'update',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'create',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'list',
          href: 'http://localhost:3333/unused',
        },
      ],
    },
    {
      content: {
        id: 4,
        name: 'temporal-criteria',
        type: 'CRITERIA',
        sourcePath: '/plugins/criterion/temporal/plugin.js',
      },
      links: [
        {
          rel: 'self',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'delete',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'update',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'create',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'list',
          href: 'http://localhost:3333/unused',
        },
      ],
    },
    {
      content: {
        id: 5,
        name: 'two-temporal-criteria',
        type: 'CRITERIA',
        sourcePath: '/plugins/criterion/two-temporal/plugin.js',
      },
      links: [
        {
          rel: 'self',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'delete',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'update',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'create',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'list',
          href: 'http://localhost:3333/unused',
        },
      ],
    },
    {
      content: {
        sourcePath: '/plugins/criterion/full-text/plugin.js',
        name: 'full-text-criteria',
        type: 'CRITERIA',
        id: 6,
      },
      links: [
        {
          rel: 'self',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'delete',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'update',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'create',
          href: 'http://localhost:3333/unused',
        },
        {
          rel: 'list',
          href: 'http://localhost:3333/unused',
        },
      ],
    },
  ],
  metadata: {
    number: 6,
    size: 6,
    totalElements: 6,
  },
  links: [
    {
      rel: 'self',
      href: 'http://localhost:3333/unused',
    },
    {
      rel: 'delete',
      href: 'http://localhost:3333/unused',
    },
    {
      rel: 'update',
      href: 'http://localhost:3333/unused',
    },
    {
      rel: 'create',
      href: 'http://localhost:3333/unused',
    },
    {
      rel: 'list',
      href: 'http://localhost:3333/unused',
    },
  ],
}
