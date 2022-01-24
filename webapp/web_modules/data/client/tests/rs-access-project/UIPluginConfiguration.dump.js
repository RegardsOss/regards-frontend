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

/**
 * Mock server response for UIPluginConfiguration entities
 * @author Léo Mieulet
 */
export default {
  content: [
    {
      content: {
        id: 1,
        active: true,
        pluginInstanceId: '1',
        pluginDefinition: {
          id: 2,
        },
        label: 'Some label',
        conf: '{"label":"Configuration de service","static":{"static1":"V1","static2":"CV3"},"dynamic":{"dynamic1":"V2"}}',
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
    number: 1,
    size: 1,
    totalElements: 1,
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
