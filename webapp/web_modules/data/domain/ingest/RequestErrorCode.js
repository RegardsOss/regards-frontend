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

/**
 * request error codes
 * @author Théo Lasserre
 */
import values from 'lodash/values'

/** Possible request error codes */
export const REQUEST_ERROR_CODE_ENUM = {
  INITIAL: 'INITIAL',
  INITIAL_CHECKSUM: 'INITIAL_CHECKSUM',
  INITIAL_SIP_ALREADY_EXISTS: 'INITIAL_SIP_ALREADY_EXISTS',
  INITIAL_NOT_FIRST_VERSION_IGNORE: 'INITIAL_NOT_FIRST_VERSION_IGNORE',
  INITIAL_NOT_FIRST_VERSION_MANUAL: 'INITIAL_NOT_FIRST_VERSION_MANUAL',
  INITIAL_UNKNOWN_VERSIONING: 'INITIAL_UNKNOWN_VERSIONING',
  PREPROCESSING: 'PREPROCESSING',
  VALIDATION: 'VALIDATION',
  GENERATION: 'GENERATION',
  METADATA: 'METADATA',
  TAGGING: 'TAGGING',
  POST_PROCESSING: 'POSTPROCESSING',
  FINAL: 'FINAL',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  AIP_DUMP: 'AIP_DUMP',
  NOTIFICATION: 'NOTIFICATION',
  UNEXPECTED: 'UNEXPECTED',
}

export const REQUEST_ERROR_CODES = values(REQUEST_ERROR_CODE_ENUM)
