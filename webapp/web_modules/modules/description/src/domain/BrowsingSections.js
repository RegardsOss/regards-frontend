/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Available sections for browsing in description
 * @author Raphaël Mechali
 */
export const BROWSING_SECTIONS_ENUM = {
  PARAMETERS: 'PARAMETERS',
  INFORMATION: 'INFORMATION',
  QUICKLOOKS: 'QUICKLOOKS',
  SIMPLE_TAGS: 'SIMPLE_TAGS',
  LINKED_ENTITIES: 'LINKED_ENTITIES',
  COUPLED_TAGS: 'COUPLED_TAGS',
  LINKED_DOCUMENTS: 'LINKED_DOCUMENTS',
  FILES: 'FILES',
  OTHER_VERSIONS: 'OTHER_VERSIONS',
}

/** All possible value */
export const BROWSING_SECTIONS = values(BROWSING_SECTIONS_ENUM)
