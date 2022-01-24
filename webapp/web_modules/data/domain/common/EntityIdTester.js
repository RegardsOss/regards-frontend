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
/**
 * Each id provides the type of entity
 * @author Léo Mieulet
 */
import { ENTITY_TYPES_ENUM } from '../dam/EntityTypes'

function isDatasetURN(id) { return id.match(/URN:AIP:DATASET:.*/) }

function isCollectionURN(id) { return id.match(/URN:AIP:COLLECTION:.*/) }

function isDataURN(id) { return id.match(/URN:AIP:DATA:.*/) }

function getTypeForURN(id) {
  if (isCollectionURN(id)) {
    return ENTITY_TYPES_ENUM.COLLECTION
  }
  if (isDatasetURN(id)) {
    return ENTITY_TYPES_ENUM.DATASET
  }
  if (isDataURN(id)) {
    return ENTITY_TYPES_ENUM.DATA
  }
  throw new Error(`Unknow id type received: ${id}`)
}
export default {
  isDatasetURN,
  isCollectionURN,
  isDataURN,
  getTypeForURN,
}
