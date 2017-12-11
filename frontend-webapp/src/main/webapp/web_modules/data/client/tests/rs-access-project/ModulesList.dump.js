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

/**
 * Mock server response for Modules entities
 * @author Sébastien binda
 */
export default {
  content: [
    {
      content: {
        id: 1,
        name: 'menu',
        description: 'Header menu module',
        applicationId: 'user',
        container: 'header',
        active: true,
        defaultDynamicModule: false,
        conf: '{"title":"Regards user interface","displayAuthentication":true,"displayLocaleSelector":true,"displayThemeSelector":true}',
      },
      links: [],
    },
    {
      content: {
        active: false,
        defaultDynamicModule: false,
        name: 'news',
        description: 'Flux atom',
        container: 'content',
        applicationId: 'user',
        id: 6,
      },
      links: [],
    },
  ],
  metadata: {
    number: 5,
    size: 5,
    totalElements: 5,
  },
  links: [],
}
