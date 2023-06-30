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

/**
 * Holds some entities dumps for tests, as CatalogShapes.Entity
 * @author Raphaël Mechali
 */
export const entity1 = {
  content: {
    id: 'URN:DATA:V1',
    version: 1,
    last: false,
    model: 'model1',
    providerId: 'providerData1',
    label: 'Data 1',
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    files: {},
    properties: {},
    tags: [],
  },
}
export const entity2 = {
  content: {
    id: 'URN:DATA:V2',
    version: 2,
    last: true,
    model: 'model2',
    providerId: 'providerData2',
    label: 'Data 2',
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    files: {},
    properties: {},
    tags: [],
  },
}
export const entity3 = {
  content: {
    id: 'URN:DATA:V3',
    version: 3,
    last: true,
    model: 'model3',
    providerId: 'providerData3',
    label: 'Data 3',
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    files: {},
    properties: {},
    tags: [],
  },
}
