/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { messages as attrMsg } from '@regardsoss/attributes-common'

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
  'module.description.configuration.allow.searching': 'Show search option in description view',

  'module.description.configuration.general': 'Main configuration',
  'module.description.configuration.show.description': 'Allow description',
  'module.description.configuration.hide.empty.attributes': 'Hide attributes with undefined or empty value',
  'module.description.configuration.show.tags': 'Display related tags',
  'module.description.configuration.show.coupling': 'Display related coupling',
  'module.description.configuration.show.linked.documents': 'Display linked documents',
  'module.description.configuration.show.linked.entities': 'Display linked entities',
  'module.description.configuration.show.other.versions': 'Display other entity versions',
  'module.description.configuration.show.thumbnail': 'Display thumbnail',
  'module.description.configuration.show.quicklooks': 'Display quicklooks',
  'module.description.configuration.description.files.title': 'Description files',
  'module.description.configuration.description.files.hint': 'Enter here URL attributes to use as description files',
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
  'module.description.common.search.simple.tag.tooltip': 'Search results for tag {tag}',
  'module.description.common.search.coupling.tag.tooltip': 'Search data coupled by {tag}',
  'module.description.common.show.entity.description.tootlip': 'Show {entityLabel} description ',
  'module.description.common.search.entity.tooltip': 'Search data linked to {entityLabel}',
  'module.description.common.download.file.tooltip': 'Download file {fileName}',
  'module.description.common.open.file.tooltip': 'Open the file {fileName} in a new tab',
  'module.description.common.file.preview.tooltip': 'Show preview of {fileName}',
  'module.description.common.version.link.label': 'Version {version}',
  'module.description.common.version.link.tooltip': 'Show version description',
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
  'module.description.tree.section.OTHER_VERSIONS.label': 'Other versions',
  'module.description.tree.section.OTHER_VERSIONS.tooltip': 'Other entity versions',
  'module.description.tree.show.entity.description.tooltip': 'Show data description',
  'module.description.content.parameters.thumbnail.alt.text': 'Thumbnail: {label}',
  'module.description.content.quicklook.group.unknown': 'Unnamed group',
  'module.description.content.quicklook.alt.message': 'Quicklook picture',
  // Forms i18n messages for admin
  ...Locales.en,
  // Storage units messages
  ...storage.messages.en,
  // Attributes messages
  ...attrMsg.en,
}

export default messages
