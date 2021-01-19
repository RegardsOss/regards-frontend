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
/**
 * Possible selection modes on map
 * @author Raphaël Mechali
 */
export const MAP_SELECTION_MODES_ENUM = {
  PICK_ON_CLICK: 'PICK_ON_CLICK',
  DRAW_RECTANGLE: 'DRAW_RECTANGLE',
}

export const MAP_SELECTION_MODES = values(MAP_SELECTION_MODES_ENUM)
