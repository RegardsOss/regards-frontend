/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { TargetHelper } from '@regardsoss/entities-common/src/definitions/TargetHelper'

/**
 * Provides some tools for UI plugins services test
 * @author Raphaël Mechali
 */

/**
 * Builds a plugin configuration
 * @param staticProperties {*} static properties
 * @param dynamicProperties {*} dynamic properties
 * @return configuration for UI plugin service tests
 */
function buildConfiguration(staticProperties = {}, dynamicProperties = {}) {
  return {
    static: staticProperties,
    dynamic: dynamicProperties,
  }
}
function getFakeEntity(ipID, type, providerId = 'PROVIDER ID #1', model = 'VALIDATION_DATA_MODEL_1', label = 'Toulouse France') {
  return {
    content: {
      id: ipID,
      version: 1,
      last: true,
      model,
      providerId,
      label,
      entityType: type,
      files: {
        QUICKLOOK_MD: [{
          dataType: 'QUICKLOOK_MD', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/bacb2b82421c116728e03566188e2ff3', mimeType: 'image/jpeg', imageWidth: 700, imageHeight: 584, online: true, checksum: 'bacb2b82421c116728e03566188e2ff3', digestAlgorithm: 'MD5', filesize: 348631, filename: 'Toulouse_France_node_full_image_2.jpg',
        }],
        QUICKLOOK_HD: [{
          dataType: 'QUICKLOOK_HD', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/7b9aa3a7288e5d3cca2623139617cc75', mimeType: 'image/jpeg', imageWidth: 1920, imageHeight: 1601, online: true, checksum: '7b9aa3a7288e5d3cca2623139617cc75', digestAlgorithm: 'MD5', filesize: 5844791, filename: 'Toulouse_France.jpg',
        }],
        QUICKLOOK_SD: [{
          dataType: 'QUICKLOOK_SD', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/8432df3b3928ba7601cda6d3254c3f02', mimeType: 'image/jpeg', imageWidth: 105, imageHeight: 88, online: true, checksum: '8432df3b3928ba7601cda6d3254c3f02', digestAlgorithm: 'MD5', filesize: 13453, filename: 'Toulouse_France_small.jpg',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/aef21e8c5d28de881f2d39f4b36f4199', mimeType: 'application/octet-stream', online: true, checksum: 'aef21e8c5d28de881f2d39f4b36f4199', digestAlgorithm: 'MD5', filesize: 100000, filename: 'simple_sip_01.dat',
        }],
      },
      tags: ['HELLO_REGARDS', 'DATASET_CHRIS_2', 'QUICKLOOKS', 'URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1'],
      geometry: null,
      normalizedGeometry: null,
      properties: {
        // eslint-disable-next-line camelcase
        value_l1: 102, // eslint wont fix: external format, not controlled locally
        // eslint-disable-next-line camelcase
        data_size: 100000,
        date: '2017-09-09T19:00:00Z',
        // eslint-disable-next-line camelcase
        value_d1: 89.56,
        DATASET_VALIDATION_TYPE: 'chris_harvest_simple_model',
      },
      type: 'Feature',
      crs: 'WGS_84',
    },
    links: [{ rel: 'self', href: 'http://localhost:3000/api/v1/rs-catalog/engines/legacy/dataobjects/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1' }],
  }
}
function getFakeEntitities(ipIDs, type) {
  return map(ipIDs, (ipID) => getFakeEntity(ipID, type))
}
function buildOneElementTarget(ipID = 'a.test.IPID', type = ENTITY_TYPES_ENUM.DATA) {
  return TargetHelper.buildOneElementTarget(getFakeEntity(ipID, type))
}

function buildManyElementsTarget(ipIDs = ['test.IPID.1', 'test.IPID.2'], type = ENTITY_TYPES_ENUM.DATA) {
  return TargetHelper.buildManyElementsTarget(getFakeEntitities(ipIDs, type))
}

function buildQueryTarget(query = 'test=true', count = 5, type = ENTITY_TYPES_ENUM.DATA, excludedIpIDs = []) {
  return TargetHelper.buildQueryTarget({ q: query }, type, count, excludedIpIDs)
}

export default {
  buildConfiguration,
  buildOneElementTarget,
  buildManyElementsTarget,
  buildQueryTarget,
}
