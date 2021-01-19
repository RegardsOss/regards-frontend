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
import { DamDomain } from '@regardsoss/domain'
import { FORM_PAGES_ENUM } from './FormPagesEnum'

/**
 * Defines available form pages for each entity type (as entity type is used as section)
 * @author Raphaël Mechali
 */
export const PAGES_BY_TYPE = {
  [DamDomain.ENTITY_TYPES_ENUM.DATA]: [
    FORM_PAGES_ENUM.MAIN, FORM_PAGES_ENUM.SORTING,
    FORM_PAGES_ENUM.LIST_AND_TABLE, FORM_PAGES_ENUM.QUICKLOOKS, FORM_PAGES_ENUM.MAP,
  ],
  [DamDomain.ENTITY_TYPES_ENUM.DATASET]: [FORM_PAGES_ENUM.MAIN, FORM_PAGES_ENUM.LIST_AND_TABLE],
}
