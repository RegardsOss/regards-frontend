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
import get from 'lodash/get'
import values from 'lodash/values'
import { ENTITY_TYPES_ENUM } from '../dam/EntityTypes'

/**
 * Lists pseudo entity types for UI: all available data management types plus document, allowing configuration for that
 * pseudo type
 * @author Raphaël Mechali
 */
/**
 * List of possible types for entities
 */
export const PSEUDO_TYPES_ENUM = {
  ...ENTITY_TYPES_ENUM,
  DOCUMENT: 'DOCUMENT',
}

/**
 * Return an array of Entity types
 */
export const PSEUDO_TYPES = values(PSEUDO_TYPES_ENUM)

/**
 * Helper function that computes if model as parameter should be handled as document model
 * @param {*} uiSettings matching UIShapes.UISettings (mandatory)
 * @param {string} model name
 * @return {boolean} true when model should be handled as document model, false otherwise
 */
export function isDocumentModel(uiSettings, model) {
  return uiSettings.documentModels.includes(model)
}

/**
 * Helper function that computes if an entity should be handled as document, according with UI settings
 * @param {*} uiSettings matching UIShapes.UISettings
 * @param {*} entity matching CatalogShapes.Entity
 * @return {boolean} true when entity should be handled as a document, false otherwise
 */
export function isDocumentEntity(uiSettings, entity) {
  return isDocumentModel(uiSettings, get(entity, 'content.model'))
}
