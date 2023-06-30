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

/**
 * Order file status definitions
 * @author Raphaël Mechali
 */

export const ORDER_FILE_STATUS_ENUM = {
  /** Not yet available for download */
  PENDING: 'PENDING',
  /** Available for download (on rs-storage) */
  AVAILABLE: 'AVAILABLE',
  /** Available for download (on external) */
  ONLINE: 'ONLINE',
  /** Downloaded */
  DOWNLOADED: 'DOWNLOADED',
  /** Error during download */
  DOWNLOAD_ERROR: 'DOWNLOAD_ERROR',
  /** Error during processing */
  PROCESSING_ERROR: 'PROCESSING_ERROR',
  /** Error during order (or any error) */
  ERROR: 'ERROR',
}

export const ORDER_FILE_STATUS = values(ORDER_FILE_STATUS_ENUM)
