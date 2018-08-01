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
import { Locales } from '@regardsoss/form-utils'

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
  'module.description.breadcrumb.root': 'Description: {entityLabel}',
  'module.description.properties.tabs': 'Properties',
  'module.description.description.tabs': 'Description',
  'module.description.files.tabs': 'Files',
  'module.description.quicklook.tabs': 'Quicklook',
  'module.description.file.subheader': 'Click on a file to download it',
  'module.description.close.button': 'Close',
  'module.description.properties.attributes': 'Attributes',
  'module.description.properties.loading.attributes': 'Loading attributes information',
  'module.description.properties.no.attribute': 'No attribute to dislay',
  'module.description.properties.tags.entities': 'Related tags',
  'module.description.properties.documents.entities': 'Related documents',
  'module.description.properties.document.entities': 'Related documents',
  'module.description.properties.loading.tags': 'Loading tags information',
  'module.description.properties.loading.document': 'Loading documents information',
  'module.description.properties.no.tag': 'This entity has no tag',
  'module.description.properties.no.document': 'This entity has no document',
  'module.description.properties.tag.search.tooltip': 'Search for entities with that tag',
  'module.description.properties.tag.show.description.tooltip': 'Show entity detail',
  'module.description.properties.thumbnail.alt.text': 'thumbnail',

  'module.description.description.loading': 'Loading description information',
  'module.description.description.no.value.title': 'No description',
  'module.description.description.no.value.message': 'This entity has no description',
  'module.description.document.files.no.value.title': 'No files',
  'module.description.document.files.no.value.message': 'This document has no files',

  // Forms i18n messages for admin
  ...Locales.en,
}

export default messages