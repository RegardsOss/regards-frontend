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

const messages = {
  ...Locales.en, // append form messages

  'ui.admin.settings.title': 'User interface settings',
  'ui.admin.settings.subtitle': 'Common user interface configuration, applying to all modules',
  'ui.admin.settings.data.presentation.title': 'Data presentation',
  'ui.admin.settings.show.product.version.label': 'Show products version',
  'ui.admin.settings.main.quicklook.group.key.label': 'Main quicklook keyword',
  'ui.admin.settings.main.quicklook.group.key.help.message': `When the main quicklook keyword is found in "types" field of a Quicklook datafile, 
  it must be considered as part of the main quicklook group in data. The main quicklook group is displayed as default, for that data, in user application.`,
  'ui.admin.settings.quota.warning.title': 'Quota warnings',
  'ui.admin.settings.low.quota.warning.label': 'Low quota warning',
  'ui.admin.settings.low.quota.warning.help.message': `User max quota is the count of raw data files internally stored by REGARDS that he is allowed to download. 
  A low quota warning is displayed for user with a remaining quota lower than or equal to warning value.
  Input '0' to disable that functionality`,
  'ui.admin.settings.low.rate.warning.label': 'Low download rate warning',
  'ui.admin.settings.low.rate.warning.help.message': `User rate limit is the number of raw data files internally stored by REGARDS that he is allowed to download simultaneously.
  A low rate warning is display for a user with a remaining rate lower than or equal to warning value.
  Input '0' to disable that functionality`,
  'ui.admin.settings.models.title': 'Data and documents models',
  'ui.admin.settings.data.models.header': 'Data models: {count}',
  'ui.admin.settings.no.data.model.title': 'No data model',
  'ui.admin.settings.add.to.document.models.title': 'Add to document models',
  'ui.admin.settings.document.models.header': 'Selected document models: {count}',
  'ui.admin.settings.no.document.model.title': 'No selection',
  'ui.admin.settings.no.document.model.message': 'Add here models of entities that should be displayed as documents',
  'ui.admin.settings.add.to.data.models.title': 'Add to data models',
  'ui.admin.settings.action.confirm': 'Confirm',
  'ui.admin.settings.action.cancel': 'Cancel',
}

export default messages
