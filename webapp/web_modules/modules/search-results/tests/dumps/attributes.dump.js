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

export const attributes = {
  1: {
    content: {
      id: 1,
      name: 'attr1',
      label: 'attribute 1',
      jsonPath: 'my.attr.1',
      description: 'The attribute 1',
      type: 'STRING',
      fragment: 'my.attr',
      queryable: true,
      facetable: true,
      alterable: true,
      optional: true,
    },
  },
  2: {
    content: {
      id: 2,
      name: 'attr2',
      label: 'attribute 2',
      jsonPath: 'my.attr.2',
      description: 'The attribute 2',
      type: 'STRING',
      fragment: 'my.attr',
      queryable: true,
      facetable: true,
      alterable: true,
      optional: true,
    },
  },
}
