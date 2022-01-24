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

export const dataset1 = {
  content: {
    id: 1,
    ipId: 'URN:DATASET:1',
    creationDate: '25/12/1504',
    type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    groups: [],
    tags: [],
    model: {
      id: 1,
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      description: 'Model dataset 1',
      name: 'ModelDataset1',
    },
    dataModel: '1d',
    feature: {
      id: 'URN:DATASET:1',
      entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      files: {},
      properties: {},
      model: '1ds',
      label: 'My dataset 1',
      providerId: 'My provider dataset 1',
      tags: [],
    },
  },
}

export const dataset2 = {
  content: {
    id: 2,
    ipId: 'URN:DATASET:2',
    creationDate: '25/12/1504',
    type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    groups: [],
    tags: [],
    model: {
      id: 2,
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      description: 'Model dataset 2',
      name: 'ModelDataset2',
    },
    dataModel: '2d',
    feature: {
      id: 'URN:DATASET:2',
      entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      files: {},
      properties: {},
      model: '2ds',
      label: 'My dataset 2',
      providerId: 'My provider dataset 2',
      tags: [],
    },
  },
}

export const dataset3 = {
  content: {
    id: 3,
    ipId: 'URN:DATASET:3',
    creationDate: '25/12/1504',
    type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    groups: [],
    tags: [],
    model: {
      id: 3,
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      description: 'Model dataset 3',
      name: 'ModelDataset3',
    },
    dataModel: '3d',
    feature: {
      id: 'URN:DATASET:3',
      entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      files: {},
      properties: {},
      model: '3ds',
      label: 'My dataset 3',
      providerId: 'My provider dataset 3',
      tags: [],
    },
  },
}

export const damDatasetsDump = {
  [dataset1.content.id]: dataset1,
  [dataset2.content.id]: dataset2,
  [dataset3.content.id]: dataset3,

}
