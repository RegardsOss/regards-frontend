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
import { Locales } from '@regardsoss/form-utils'

/**
 * Module message for EN local
 * @author Raphaël Mechali
 */
const messages = {
  // services
  'entities.common.services.error.title': 'Service error',
  'entities.common.services.notice.title': 'Service done',
  'entities.common.services.loading.plugin.failed': 'Failed loading service',
  'entities.common.services.plugin.parameters.error': 'Service configuration contains errors',
  'entities.common.services.parameter.required': '{label} (*)',
  'entities.common.services.parameter.description.dialog.title': '{parameter} description',
  'entities.common.services.parameter.description.dialog.close': 'Close',
  'entities.common.services.plugin.run.failed': 'Service processing failed',
  'entities.common.services.plugin.run.empty': 'Service processing is successful. It produced no file',
  'entities.common.services.submit.parameters': 'Next',
  'entities.common.services.change.parameters': 'Previous',
  'entities.common.services.close.service': 'Close',
  'entities.common.services.download.service.result': 'Download',
  'entities.common.services.ui.plugin.running.error': 'Error during service execution',

  // backend / pluginBack
  'entities.common.backend.pluginback.processing.dialog.title': 'Choose a processing',
  'entities.common.backend.pluginback.processing.dialog.select.label': 'Processing',
  'entities.common.backend.pluginback.processing.dialog.remove': 'Remove',
  'entities.common.backend.pluginback.processing.dialog.cancel': 'Cancel',
  'entities.common.backend.pluginback.processing.dialog.confirm': 'Confirm',
  'entities.common.backend.pluginback.processing.button.edit.label': '{label}',
  'entities.common.backend.pluginback.processing.button.add.label': 'Process',
  'entities.common.backend.pluginback.processing.button.edit.title': 'Edit selected process',
  'entities.common.backend.pluginback.processing.button.add.title': 'Add a new process',
  'entities.common.backend.pluginback.processing.dialog.remove.confirmation.title': 'Remove Processing',
  'entities.common.backend.pluginback.processing.dialog.remove.confirmation.message': 'This action will remove {processingLabel} processing from the dataset',
  'entities.common.backend.pluginback.processing.dialog.remove.tooltip': 'Remove Processing',

  ...Locales.en,
}

export default messages
