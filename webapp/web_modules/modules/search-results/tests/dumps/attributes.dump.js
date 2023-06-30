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
import { DamDomain } from '@regardsoss/domain'

export const attributes = {
  1: {
    content: {
      id: 1,
      name: 'attr1',
      label: 'attribute 1',
      jsonPath: 'my.attr.1',
      description: 'The attribute 1',
      type: DamDomain.MODEL_ATTR_TYPES.STRING,
      fragment: {
        id: 1,
        name: 'my.attr',
        description: 'My attr',
      },
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
      type: DamDomain.MODEL_ATTR_TYPES.STRING,
      fragment: {
        id: 2,
        name: 'my.attr.2',
        description: 'My attr 2',
      },
      queryable: true,
      facetable: true,
      alterable: true,
      optional: true,
    },
  },
  3: {
    content: {
      id: 3,
      name: 'attr3',
      label: 'attribute 3',
      jsonPath: 'attr3',
      description: 'The attribute 3',
      type: DamDomain.MODEL_ATTR_TYPES.DOUBLE,
      queryable: true,
      facetable: true,
      alterable: true,
      optional: true,
    },
  },
  4: {
    content: {
      id: 4,
      name: 'attr4',
      label: 'attribute 4',
      jsonPath: 'my.attr.4',
      description: 'The attribute 4',
      type: DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601,
      fragment: {
        id: 4,
        name: 'my.attr.4',
        description: 'My attr 4',
      },
      queryable: true,
      facetable: true,
      alterable: true,
      optional: true,
    },
  },
}
