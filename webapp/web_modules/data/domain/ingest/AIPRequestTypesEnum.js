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

import values from 'lodash/values'

/**
 * Possible AIP request types
 * @author Raphaël Mechali
 */
export const AIP_REQUEST_TYPES_ENUM = {
  STORAGE_DELETION: 'STORAGE_DELETION',
  STORE_METADATA: 'STORE_METADATA',
  UPDATE: 'UPDATE',
  AIP_UPDATES_CREATOR: 'AIP_UPDATES_CREATOR',
  INGEST: 'INGEST',
  OAIS_DELETION_CREATOR: 'OAIS_DELETION_CREATOR',
  OAIS_DELETION: 'OAIS_DELETION',
}

export const AIP_REQUEST_TYPES = values(AIP_REQUEST_TYPES_ENUM)
