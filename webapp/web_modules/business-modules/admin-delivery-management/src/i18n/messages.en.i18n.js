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
import { Locales } from '@regardsoss/form-utils'

/**
 * @author Théo Lasserre
 */
const messages = {
  ...Locales.en,
  // Settings
  'delivery.settings.card.title': 'Delivery settings',
  'delivery.settings.card.subtitle': 'Manage delivery configuration parameters',
  'delivery.settings.field.request_ttl': 'Maximum retention time of a delivery request in hours',
  'delivery.settings.field.build_bucket': 'Temporary bucket on which available files will be transferred before building final zips',
  'delivery.settings.field.delivery_bucket': 'Bucket on which the ZIP archives will be dropped once orders have been completed',
  'delivery.settings.field.s3_server': 'S3 Server',
  'delivery.settings.field.s3_server.host': 'S3 server to place orders',
  'delivery.settings.field.s3_server.port': 'S3 server access port',
  'delivery.settings.field.s3_server.key': 'S3 server connection key',
  'delivery.settings.field.s3_server.secret': 'S3 server login password',
  'delivery.settings.field.s3_server.region': 'Region',
  'delivery.settings.field.s3_server.scheme': 'URI Scheme',
  'delivery.settings.action.confirm': 'Confirm',
  'delivery.settings.action.cancel': 'Cancel',
}

export default messages
