/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Possible AIP request status
 * @author Raphaël Mechali
 */
export const AIP_REQUEST_STATUS_ENUM = {
  TO_SCHEDULE: 'TO_SCHEDULE',
  CREATED: 'CREATED',
  BLOCKED: 'BLOCKED',
  WAITING_VERSIONING_MODE: 'WAITING_VERSIONING_MODE',
  IGNORED: 'IGNORED',
  RUNNING: 'RUNNING',
  ERROR: 'ERROR',
  ABORTED: 'ABORTED',
  WAITING_REMOTE_STORAGE: 'WAITING_REMOTE_STORAGE',
}

export const AIP_REQUEST_STATUS = values(AIP_REQUEST_STATUS_ENUM)
