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
 * Each id provides the type of entity
 * @author Léo Mieulet
 */
import { ENTITY_TYPES_ENUM } from '../dam/EntityTypes'

export function isDatasetURN(id) { return id.match(/URN:AIP:DATASET:.*/) }

export function isCollectionURN(id) { return id.match(/URN:AIP:COLLECTION:.*/) }

export function isDocumentURN(id) { return id.match(/URN:AIP:DOCUMENT:.*/) }

export function isDataURN(id) { return id.match(/URN:AIP:DATA:.*/) }

export function getTypeForURN(id) {
  if (isCollectionURN(id)) {
    return ENTITY_TYPES_ENUM.COLLECTION
  } else if (isDatasetURN(id)) {
    return ENTITY_TYPES_ENUM.DATASET
  } else if (isDataURN(id)) {
    return ENTITY_TYPES_ENUM.DATA
  } else if (isDocumentURN(id)) {
    return ENTITY_TYPES_ENUM.DOCUMENT
  }
  throw new Error(`Unknow id type received: ${id}`)
}

export default {
  isDatasetURN,
  isCollectionURN,
  isDocumentURN,
  isDataURN,
  getTypeForURN,
}
