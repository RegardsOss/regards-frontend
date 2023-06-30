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
 * Available versioning modes
 * @author Léo Mieulet
 */
export const VERSIONING_MODES_ENUM = {
  /** Ignore a SIP that would create a new version */
  IGNORE: 'IGNORE',
  /** Increase product version when SIP creates a new version */
  INC_VERSION: 'INC_VERSION',
  /** Manual decision when a product creating a new is encountered */
  MANUAL: 'MANUAL',
  /** Replace previous product version when a new version is encountered */
  REPLACE: 'REPLACE',
}

export const VERSIONING_MODES = values(VERSIONING_MODES_ENUM)
