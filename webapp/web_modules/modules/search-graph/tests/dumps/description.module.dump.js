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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { modulesManager } from '@regardsoss/modules'

/**
 * Holds validation configuration for description module
 * @author Raphaël Mechali
 */
export const modulesDumpWithDescription = {
  8: { // a module that is not description
    content: {
      id: 8,
      applicationId: 'test',
      type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
      active: true,
      container: 'test-static-container',
      conf: {
        allowSearching: true,
        [DamDomain.ENTITY_TYPES_ENUM.COLLECTION]: {
          showDescription: false,
          showTags: false,
          showCoupling: false,
          showLinkedDocuments: false,
          showLinkedEntities: false,
          showThumbnail: false,
          groups: [],
          attributeToDescriptionFiles: [],
        },
        [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
          showDescription: false,
          showTags: false,
          showCoupling: false,
          showLinkedDocuments: false,
          showLinkedEntities: false,
          showThumbnail: false,
          groups: [],
          attributeToDescriptionFiles: [],
        },
        [UIDomain.PSEUDO_TYPES_ENUM.DOCUMENT]: {
          showDescription: true,
          showTags: false,
          showCoupling: false,
          showLinkedDocuments: false,
          showLinkedEntities: false,
          showThumbnail: true,
          groups: [],
          attributeToDescriptionFiles: [],
        },
        [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
          showDescription: true,
          showTags: false,
          showCoupling: false,
          showLinkedDocuments: false,
          showLinkedEntities: false,
          showThumbnail: true,
          groups: [],
          attributeToDescriptionFiles: [],
        },
      },
    },
  },
}
