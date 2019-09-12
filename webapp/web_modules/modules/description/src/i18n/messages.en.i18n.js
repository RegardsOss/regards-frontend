/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Locales } from '@regardsoss/form-utils'
import { storage } from '@regardsoss/units'

/**
 * Module english messages
 * @author Raphaël Mechali
 */
const messages = {
  // admin
  'module.description.configuration.type.COLLECTION': 'Collections',
  'module.description.configuration.type.DATASET': 'Datasets',
  'module.description.configuration.type.DOCUMENT': 'Documents',
  'module.description.configuration.type.DATA': 'Data objects',
  'module.description.configuration.allow.tag.search': 'Allow searching data by tag',

  'module.description.configuration.general': 'Main configuration',
  'module.description.configuration.show.description': 'Allow description for that objects type',
  'module.description.configuration.show.tags': 'Display linked tags',
  'module.description.configuration.show.linked.documents': 'Display linked documents',
  'module.description.configuration.show.thumbnail': 'Display thumbnail',
  'module.description.configuration.add.group': 'Add display groups',
  'module.description.configuration.group.title': 'Group #{number}',
  'module.description.configuration.group.show.title': 'Show group title',
  'module.description.configuration.group.title.en.field': 'English title',
  'module.description.configuration.group.title.fr.field': 'French title',
  'module.description.configuration.group.title.required.error': 'Title is required as show title options is selected',
  'module.description.configuration.group.elements.hint': 'Add here attributes to show in this group',
  'module.description.configuration.group.move.action.label': 'Move',
  'module.description.configuration.group.move.action.tooltip': 'Move this group',
  'module.description.configuration.group.move.group.first': 'First',
  'module.description.configuration.group.move.group.after': 'After group #{number}',
  'module.description.configuration.group.remove.action.label': 'Remove',
  'module.description.configuration.group.remove.action.tooltip': 'Remove this group',

  // user
  'module.description.invalid.entity.title': 'Invalid data',
  'module.description.invalid.entity.message': 'The requested data cannot be displayed as it has no description configuration. Was website configuration recently updated? Please contact the administrator.',
  'module.description.model.retrieval.failed.title': 'Loading error',
  'module.description.model.retrieval.failed.message': 'The requested data cannot be displayed as its model could not be retrieved.',
  'module.description.no.parameter.title': 'No parameter',
  'module.description.no.parameter.message': 'There is no parameter to show for that data',
  'module.description.common.search.simple.tag.tooltip': 'Search results for that tag',
  'module.description.common.search.coupling.tag.tooltip': 'Search coupled data',
  'module.description.common.search.entity.tooltip': 'Search data linked to that one',
  'module.description.common.download.file.tooltip': 'Download file',
  'module.description.header.toggle.tree.visible.tooltip': 'Show / hide description browsing tree',
  'module.description.header.search.entity.label': 'Search related data',
  'module.description.header.search.entity.tooltip': 'Search data related with the one currenly displayed',
  'module.description.tree.section.PARAMETERS.label': 'Parameters',
  'module.description.tree.section.PARAMETERS.tooltip': 'Display parameters',
  'module.description.tree.section.INFORMATION.label': 'Information',
  'module.description.tree.section.INFORMATION.tooltip': 'Display information files',
  'module.description.tree.section.QUICKLOOKS.label': 'Quicklooks',
  'module.description.tree.section.QUICKLOOKS.tooltip': 'Display quicklooks preview',
  'module.description.tree.section.SIMPLE_TAGS.label': 'Tags',
  'module.description.tree.section.SIMPLE_TAGS.tooltip': 'Display tags list',
  'module.description.tree.section.LINKED_ENTITIES.label': 'Related data',
  'module.description.tree.section.LINKED_ENTITIES.tooltip': 'Display linked data list',
  'module.description.tree.section.COUPLED_TAGS.label': 'Coupling',
  'module.description.tree.section.COUPLED_TAGS.tooltip': 'Display coupling list',
  'module.description.tree.section.LINKED_DOCUMENTS.label': 'Related documents',
  'module.description.tree.section.LINKED_DOCUMENTS.tooltip': 'Display linked documents list',
  'module.description.tree.section.FILES.label': 'Files',
  'module.description.tree.section.FILES.tooltip': 'Files',
  'module.description.tree.section.file.tooltip': 'Show file preview',
  'module.description.tree.show.entity.description.tooltip': 'Show data description',
  'module.description.content.parameters.thumbnail.alt.text': 'Thumbnail: {label}',
  'module.description.content.quicklook.alt.message': 'Quicklook picture',
  // TODO old: delete or move
  'module.description.breadcrumb.root': 'Description: {entityLabel}',
  'module.description.file.subheader': 'Click on a file to download it',
  'module.description.close.button': 'Close',
  'module.description.properties.attributes': 'Attributes',
  'module.description.properties.loading.attributes': 'Loading attributes information',
  'module.description.properties.no.attribute': 'No attribute to display',
  'module.description.properties.tags.entities': 'Related tags',
  'module.description.properties.documents.entities': 'Related documents',
  'module.description.properties.document.entities': 'Related documents',
  'module.description.properties.loading.tags': 'Loading tags information',
  'module.description.properties.loading.document': 'Loading documents information',
  'module.description.properties.no.tag': 'This entity has no tag',
  'module.description.properties.no.document': 'This entity has no document',
  'module.description.properties.tag.search.tooltip': 'Search for entities with that tag',
  'module.description.properties.tag.show.description.tooltip': 'Show entity detail',

  'module.description.file.selector.file.label': '{filename} ({sizeMessage})',
  'module.description.file.selector.file.unkown.size': 'unknown size',
  'module.description.files.download.button': 'Download',
  'module.description.file.loading': 'Loading file',

  // Forms i18n messages for admin
  ...Locales.en,
  // Storage units messages
  ...storage.messages.en,
}

export default messages
