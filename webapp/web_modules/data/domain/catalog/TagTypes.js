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
import { ENTITY_TYPES_ENUM } from '../dam/EntityTypes'

/**
 * Possible entities tag types: a simple word or any entity type
 * @author Raphaël Mechali
 */
export const TAG_TYPES_ENUM = {
  WORD: 'tag.word',
  UNRESOLVED: 'tag.unresolved', // specific unresolved case
  ...ENTITY_TYPES_ENUM,
}

export const TAG_TYPES = values(TAG_TYPES_ENUM)
