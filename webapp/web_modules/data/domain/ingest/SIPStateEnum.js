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
 * Possible acqisition processing chain
 * @author Sébastien Binda
 */
export const SIPStateEnum = {
  CREATED: 'CREATED',
  VALID: 'VALID',
  AIP_CREATED: 'AIP_CREATED',
  QUEUED: 'QUEUED',
  STORED: 'STORED',
  INDEXED: 'INDEXED',
  REJECTED: 'REJECTED',
  INVALID: 'INVALID',
  AIP_GEN_ERROR: 'AIP_GEN_ERROR',
  STORE_ERROR: 'STORE_ERROR',
  INCOMPLETE: 'INCOMPLETE',
  DELETED: 'DELETED',
}
export const SIPStateValues = values(SIPStateEnum)
