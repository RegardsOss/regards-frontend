/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Possible state for SIP entities
 * @author Sébastien Binda
 */
export const SIPStateEnum = {
  VALID: 'VALID',
  QUEUED: 'QUEUED',
  CREATED: 'CREATED',
  DELETED: 'DELETED',
  AIP_CREATED: 'AIP_CREATED',
  AIP_SUBMITTED: 'AIP_SUBMITTED',
  STORED: 'STORED',
  INDEXED: 'INDEXED',
  TO_BE_DELETED: 'TO_BE_DELETED',
  INCOMPLETE: 'INCOMPLETE',
  REJECTED: 'REJECTED',
  INVALID: 'INVALID',
  AIP_GEN_ERROR: 'AIP_GEN_ERROR',
  STORE_ERROR: 'STORE_ERROR',
  INDEX_ERROR: 'INDEX_ERROR',
}
export const SIPStateValues = values(SIPStateEnum)
