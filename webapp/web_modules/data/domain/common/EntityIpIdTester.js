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
/**
 * Each IpId provides the type of entity
 * @author Léo Mieulet
 */
import { ENTITY_TYPES_ENUM } from '../dam/EntityTypes'

function isIpIdADataset(ipId) { return ipId.match(/URN:AIP:DATASET:.*/) }

function isIpIdACollection(ipId) { return ipId.match(/URN:AIP:COLLECTION:.*/) }

function isIpIdADocument(ipId) { return ipId.match(/URN:AIP:DOCUMENT:.*/) }

function isIpIdAData(ipId) { return ipId.match(/URN:AIP:DATA:.*/) }

function getIpIdType(ipId) {
  if (isIpIdACollection(ipId)) {
    return ENTITY_TYPES_ENUM.COLLECTION
  } else if (isIpIdADataset(ipId)) {
    return ENTITY_TYPES_ENUM.DATASET
  } else if (isIpIdAData(ipId)) {
    return ENTITY_TYPES_ENUM.DATA
  } else if (isIpIdADocument(ipId)) {
    return ENTITY_TYPES_ENUM.DOCUMENT
  }
  throw new Error(`Unknow IpId received: ${ipId}`)
}

module.exports = {
  isIpIdADataset,
  isIpIdACollection,
  isIpIdADocument,
  isIpIdAData,
  getIpIdType,
}
