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
 * Possible navigation item visibility mode
 * @author Raphaël Mechali
 */

export const VISIBILITY_MODES_ENUM = {
  /** Such item is always visible */
  ALWAYS: 'ALWAYS',
  /** Such item is never visible */
  NEVER: 'NEVER',
  /** Such item is visible when profile is greater than or equal to */
  FOR_ROLE: 'FOR_ROLE',
}

export const VISIBILITY_MODES = values(VISIBILITY_MODES_ENUM)
