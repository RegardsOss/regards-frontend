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
import { AccessShapes, UIShapes } from '@regardsoss/shape'

/**
 * Describes module configuration shape
 * @author Raphaël Mechali
 */

export const DescriptionGroup = PropTypes.shape({
  showTitle: PropTypes.bool.isRequired,
  title: UIShapes.IntlMessage.isRequired,
  elements: AccessShapes.AttributeListConfigurationModel.isRequired, // attributes elements (groups or single), with labels
})

/**
 * Configuration for a given type description: it holds basic options and a list of groups that
 * theirselves hold a list of attributes / groups to show
 */
export const DescriptionConfiguration = PropTypes.shape({
  showDescription: PropTypes.bool.isRequired,
  hideEmptyAttributes: PropTypes.bool.isRequired, // when true, attributes are hidden when empty, even if they are part of the data model
  showTags: PropTypes.bool.isRequired,
  showCoupling: PropTypes.bool.isRequired,
  showLinkedDocuments: PropTypes.bool.isRequired,
  showLinkedEntities: PropTypes.bool.isRequired,
  showOtherVersions: PropTypes.bool.isRequired,
  showThumbnail: PropTypes.bool.isRequired,
  showQuicklooks: PropTypes.bool.isRequired,
  groups: PropTypes.arrayOf(DescriptionGroup).isRequired,
  // list of attribute to be displayed as description file (single attribute configuration, no label)
  attributeToDescriptionFiles: AccessShapes.AttributeListConfigurationModel.isRequired,
})

/** Runtime description data and callbacks */
export const DescriptionRuntime = PropTypes.shape({
  // Selected index in description path
  selectedIndex: PropTypes.number.isRequired,
  // breacrumb entities, where last entity is the one currently shown (empty array to show no data)
  descriptionPath: PropTypes.arrayOf(UIShapes.EntityWithTreeEntry).isRequired,
  // Callback to change description path: newPath:[CatalogShapes.Entity], selectedIndex:number => ()
  setDescriptionPath: PropTypes.func.isRequired,
  // Callback search a word tag: word:string => ()
  onSearchWord: PropTypes.func.isRequired,
  // Callback search an entity tag: entity:CatalogShapes.Entity => ()
  onSearchEntity: PropTypes.func.isRequired,
})

export const TabTitlesConfiguration = PropTypes.shape({
  [UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS]: PropTypes.shape({
    [UIDomain.LOCALES_ENUM.en]: PropTypes.string,
    [UIDomain.LOCALES_ENUM.fr]: PropTypes.string,
  }),
  [UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION]: PropTypes.shape({
    [UIDomain.LOCALES_ENUM.en]: PropTypes.string,
    [UIDomain.LOCALES_ENUM.fr]: PropTypes.string,
  }),
})

/**
 * Module configuration: description pane configuration by entity type
 */
export const ModuleConfiguration = PropTypes.shape({
  allowSearching: PropTypes.bool,
  // optional tabs title
  tabTitles: TabTitlesConfiguration,
  // configuration by entity type
  [DamDomain.ENTITY_TYPES_ENUM.COLLECTION]: DescriptionConfiguration,
  [DamDomain.ENTITY_TYPES_ENUM.DATASET]: DescriptionConfiguration,
  [UIDomain.PSEUDO_TYPES_ENUM.DOCUMENT]: DescriptionConfiguration,
  [DamDomain.ENTITY_TYPES_ENUM.DATA]: DescriptionConfiguration,
  // runtime data
  runtime: DescriptionRuntime,
})
