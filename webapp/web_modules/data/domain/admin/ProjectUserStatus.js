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
import values from 'lodash/values'

export const PROJECT_USER_STATUS_ENUM = {
  ACCESS_GRANTED: 'ACCESS_GRANTED',
  WAITING_ACCESS: 'WAITING_ACCESS',
  WAITING_EMAIL_VERIFICATION: 'WAITING_EMAIL_VERIFICATION',
  ACCESS_DENIED: 'ACCESS_DENIED',
  ACCESS_INACTIVE: 'ACCESS_INACTIVE',
  WAITING_ACCOUNT_ACTIVE: 'WAITING_ACCOUNT_ACTIVE',
}

export const PROJECT_USER_STATUS = values(PROJECT_USER_STATUS_ENUM)
