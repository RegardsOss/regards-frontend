/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/** URN tag pattern */
const URN_PATTERN = /^URN:/

/** Is an URN tag?
 * @param tag tag
 * @return true if tag is an URN, false otherwise
 */
export function isURNTag(tag) {
  return URN_PATTERN.test(tag)
}

/**
 * Locally defined tag types: a simple word or any entity type
 */
export const TAG_TYPES_ENUM = {
  WORD: 'tag.word',
  ...ENTITY_TYPES_ENUM,
}

export const TAG_TYPES = values(TAG_TYPES_ENUM)
