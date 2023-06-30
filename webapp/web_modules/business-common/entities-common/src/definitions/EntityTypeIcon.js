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
import get from 'lodash/get'
import DatasetIcon from 'mdi-material-ui/Archive'
import DataIcon from 'mdi-material-ui/FileDocument'
import CollectionIcon from 'mdi-material-ui/FolderMultiple'
import DocumentIcon from 'mdi-material-ui/BookOpenPageVariant'
import { DamDomain, UIDomain } from '@regardsoss/domain'

export class EntityTypeIcon {
  /** Map of entity type / pseudo type to icon constructor */
  static ICON_CONSTRUCTOR_BY_TYPE = {
    [DamDomain.ENTITY_TYPES_ENUM.DATA]: DataIcon,
    [DamDomain.ENTITY_TYPES_ENUM.DATASET]: DatasetIcon,
    [DamDomain.ENTITY_TYPES_ENUM.COLLECTION]: CollectionIcon,
    [UIDomain.PSEUDO_TYPES_ENUM.DOCUMENT]: DocumentIcon,
  }

  /**
   * Returns icon constructor to use for entity as parameter
   * @param {*} entity entity matching CatalogShapes.Entity shape
   * @param {boolean} isDocument should entity as parameter be considered as a document?
   * @return {function} found constructor for entity
   */
  static getIconConstructor(entity, isDocument) {
    if (isDocument) {
      return EntityTypeIcon.ICON_CONSTRUCTOR_BY_TYPE[UIDomain.PSEUDO_TYPES_ENUM.DOCUMENT]
    }
    return EntityTypeIcon.ICON_CONSTRUCTOR_BY_TYPE[get(entity, 'content.entityType')] || null
  }
}
