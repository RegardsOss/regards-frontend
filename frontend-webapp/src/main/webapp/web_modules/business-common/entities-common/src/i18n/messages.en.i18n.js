/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Module message for EN local
 * @author Raphaël Mechali
 */
const messages = {
  // description
  'description.breadcrumb.root': 'Description: {entityLabel}',
  'entities.common.properties.tabs': 'Properties',
  'entities.common.description.tabs': 'Description',
  'entities.common.files.tabs': 'Files',
  'entities.common.quicklook.tabs': 'Quicklook',
  'entities.common.file.subheader': 'Click on a file to download it',
  'entities.common.close.button': 'Close',
  'entities.common.properties.attributes': 'Attributes',
  'entities.common.properties.loading.attributes': 'Loading attributes information',
  'entities.common.properties.no.attribute': 'This entity has no attribute',
  'entities.common.properties.tags.entities': 'Related tags',
  'entities.common.properties.documents.entities': 'Related documents',
  'entities.common.properties.document.entities': 'Related documents',
  'entities.common.properties.loading.tags': 'Loading tags information',
  'entities.common.properties.loading.document': 'Loading documents information',
  'entities.common.properties.no.tag': 'This entity has no tag',
  'entities.common.properties.no.document': 'This entity has no document',
  'entities.common.properties.tag.search.tooltip': 'Search for entities with that tag',
  'entities.common.properties.tag.show.description.tooltip': 'Show entity detail',

  'entities.common.description.loading': 'Loading description information',
  'entities.common.description.no.value.title': 'No description',
  'entities.common.description.no.value.message': 'This entity has no description',
  'entities.common.document.files.no.value.title': 'No files',
  'entities.common.document.files.no.value.message': 'This document has no files',

  // services
  'entities.common.services.error.title': 'Service error',
  'entities.common.services.notice.title': 'Service done',
  'entities.common.services.loading.plugin.information': 'Loading service',
  'entities.common.services.loading.plugin.failed': 'Failed loading service',
  'entities.common.services.plugin.parameters.error': 'Service configuration contains errors',
  'entities.common.services.loading.results': 'Service processing',
  'entities.common.services.parameter.required': '{label} (*)',
  'entities.common.services.plugin.run.failed': 'Service processing failed',
  'entities.common.services.plugin.run.empty': 'Service processing is successful. It produced no file',
  'entities.common.services.submit.parameters': 'Next',
  'entities.common.services.change.parameters': 'Previous',
  'entities.common.services.close.service': 'Close',
  'entities.common.services.download.service.result': 'Download',
  'entities.common.services.ui.plugin.running.error': 'Error during service execution',

  ...Locales.en,
}

export default messages
