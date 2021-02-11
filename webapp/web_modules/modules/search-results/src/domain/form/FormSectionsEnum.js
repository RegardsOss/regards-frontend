/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain } from '@regardsoss/domain'

/**
 * Holds constants defining the sections in form
 * @author Raphaël Mechali
 */

export const FORM_SECTIONS_ENUM = {
  MAIN: 'MAIN', // main section
  SEARCH: 'SEARCH', // search configuration section
  FILTERS: 'FILTERS', // filters section
  RESTRICTIONS: 'RESTRICTIONS', // restrictions section
  [DamDomain.ENTITY_TYPES_ENUM.DATA]: DamDomain.ENTITY_TYPES_ENUM.DATA,
  [DamDomain.ENTITY_TYPES_ENUM.DATASET]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
}

export const FORM_SECTIONS = values(FORM_SECTIONS_ENUM)
