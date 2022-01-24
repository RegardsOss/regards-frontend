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

export const STORAGE_REQUESTS_PROPERTIES_ENUM = {
  REFERENCE_REQUESTS: 'referenceRequests',
  STORE_REQUESTS: 'storeRequests',
  COPY_REQUESTS: 'copyRequests',
  DELETE_REQUESTS: 'deleteRequests',
  REQUESTS_REFUSED: 'requestsRefused',
  REQUESTS_ERRORS: 'requestsErrors',
}

export const STORAGE_REQUESTS_PROPERTIES = values(STORAGE_REQUESTS_PROPERTIES_ENUM)

export const STORAGE_FILES_PROPERTIES_ENUM = {
  STORED_FILES: 'storedFiles',
  REFERENCED_FILES: 'referencedFiles',
  DELETED_FILES: 'deletedFiles',
}

export const STORAGE_FILES_PROPERTIES = values(STORAGE_FILES_PROPERTIES_ENUM)
