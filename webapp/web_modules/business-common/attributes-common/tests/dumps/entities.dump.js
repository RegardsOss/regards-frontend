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
import { DamDomain } from '@regardsoss/domain'

/**
  * Holds some entities dumps for test
  * @author Raphaël Mechali
  */
export const data = {
  content: {
    id: 'URN:DATA:TEST:V2',
    version: 2,
    last: false,
    model: 'aModel',
    providerId: 'Data test V2',
    label: 'Data test V2',
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    tags: [],
  },
}

export const dataset = {
  content: {
    id: 'URN:DATASET:TEST:V4',
    version: 4,
    last: true,
    model: 'aModel',
    providerId: 'Dataset test V4',
    label: 'Dataset test V4',
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    tags: [],
  },
}

export const collection = {
  content: {
    id: 'URN:COLLECTION:TEST:V3',
    version: 2,
    last: true,
    model: 'aModel',
    providerId: 'Collection test V2',
    label: 'Collection test V2',
    entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
    tags: [],
  },
}
