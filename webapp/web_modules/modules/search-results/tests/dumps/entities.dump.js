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
import { DamDomain, AccessDomain, CommonDomain } from '@regardsoss/domain'

/**
 * Holds some entities for tests
 * @author Raphaël Mechali
 */
export const datasetEntity = {
  content: {
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    id: 'URN:AIP:DATASET:project1:3aeed1bc-3c14-4100-bcd1-c4f370e679a2:V1',
    version: 1,
    last: false,
    providerId: 'Provider1dataset',
    label: 'my dataset',
    model: '1',
    files: {},
    tags: [],
  },
}

export const anotherDatasetEntity = {
  content: {
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    id: 'URN:AIP:DATASET:project1:XXXX2:V2',
    version: 2,
    last: true,
    providerId: 'Provider2dataset',
    label: 'my dataset2',
    model: '1',
    files: {},
    tags: [],
  },
}

export const dataEntity = {
  content: {
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    id: 'URN:AIP:DATA:project1:9bcec7er-3c14-4100-bcd1-c4f370e679a2:V1',
    version: 1,
    last: false,
    providerId: 'Provider1',
    label: 'my data',
    model: '1',
    files: {
      [CommonDomain.DATA_TYPES_ENUM.THUMBNAIL]: [{
        dataType: CommonDomain.DATA_TYPES_ENUM.THUMBNAIL,
        reference: false,
        uri: 'https://thumbnail.wide.com/willpaper.png',
        mimeType: 'image/png',
        imageWidth: 600,
        imageHeight: 600,
        online: true,
        checksum: 'UUUU',
        digestAlgorithm: 'very-wrongers',
        filesize: 564564564,
        filename: 'willpaper.png',
      }],
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD]: [{
        dataType: CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD,
        reference: true,
        uri: 'http://russia.clearly.ru/one-more-forbidden-file.png',
        mimeType: 'image/png',
        imageWidth: 500,
        imageHeight: 500,
        online: true,
        checksum: 'ABCDEFG',
        digestAlgorithm: 'thieves-digest',
        filesize: 8500056,
        filename: 'one-more-forbidden-file.png',
      }],
    },
    my: {
      attr: {
        1: 'someValue',
        2: 'someOtherValue',
      },
    },
    tags: ['test-tag'],
  },
}
export const dataEntityWithGeometry = {
  content: {
    ...dataEntity.content,
    geometry: {
      coordinates: [[
        [-62.059650800618, 17.182800844202],
        [-61.02747654737, 17.175349719566],
        [-61.0376242204, 16.183364927609],
        [-62.064491371862, 16.190362063231],
        [-62.059650800618, 17.182800844202]]],
      type: 'Polygon',
    },
  },
}

export const dataEntityWithServices = {
  content: {
    ...dataEntity.content,
    services: [{
      content: {
        configId: '1',
        label: 'service1',
        icon: 'any.png',
        applicationModes: [AccessDomain.applicationModes.ONE],
        entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
        type: AccessDomain.pluginTypes.UI,
      },
    }, {
      content: {
        configId: '2',
        label: 'service2',
        icon: 'any2.png',
        applicationModes: [AccessDomain.applicationModes.ONE],
        entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
        type: AccessDomain.pluginTypes.CATALOG,
      },
    }],
  },
}

export const anotherDataEntity = {
  content: {
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    id: 'URN:AIP:DATA:project1:XXX:V2',
    version: 2,
    last: true,
    providerId: 'Provider2',
    label: 'my data2',
    model: '1',
    files: { },
    my: {
      attr: {
        1: 'someValue',
        2: 'someOtherValue',
      },
    },
    tags: ['test-tag2'],
  },
}

export const allEntities = [
  dataEntity,
  anotherDataEntity,
  datasetEntity,
  anotherDatasetEntity,
]
