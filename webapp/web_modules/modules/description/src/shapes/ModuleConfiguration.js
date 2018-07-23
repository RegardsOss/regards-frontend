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
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'

/**
 * Describes module configuration shape
 * @author Raphaël Mechali
 */

export const DescriptionGroup = PropTypes.shape({
  showTitle: PropTypes.bool.isRequired,
  title: PropTypes.shape({
    en: PropTypes.string, // english group label, optional
    fr: PropTypes.string, // french group label, optional
  }).isRequired, // labels dictionnary, required
  elements: AccessShapes.AttributeListConfigurationModel.isRequired, // attributes elements (groups or single), with labels
})

/**
 * Configuration for a given type description: it holds basic options and a list of groups that
 * theirselves hold a list of attributes / groups to show
 */
export const DescriptionConfiguration = PropTypes.shape({
  showDescription: PropTypes.bool.isRequired,
  showTags: PropTypes.bool.isRequired,
  showLinkedDocuments: PropTypes.bool.isRequired,
  showThumbnail: PropTypes.bool.isRequired,
  groups: PropTypes.arrayOf(DescriptionGroup).isRequired,
})

/**
 * Module configuration: description pane configuration by entity type
 */
export const ModuleConfiguration = PropTypes.shape({
  allowTagSearch: PropTypes.bool,
  // configuration by entity type
  [DamDomain.ENTITY_TYPES_ENUM.COLLECTION]: DescriptionConfiguration,
  [DamDomain.ENTITY_TYPES_ENUM.DATASET]: DescriptionConfiguration,
  [DamDomain.ENTITY_TYPES_ENUM.DOCUMENT]: DescriptionConfiguration,
  [DamDomain.ENTITY_TYPES_ENUM.DATA]: DescriptionConfiguration,
})
