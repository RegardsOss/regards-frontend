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
 * Exposes Menu module domain, as menu module can be loaded by both admin and user interface
 * @author Raphaël Mechali
 */

export const MENU_DISPLAY_MODES_ENUM = {
  /** Show menu in admin instance interface */
  ADMIN_INSTANCE: 'ADMIN_INSTANCE',
  /** Show menu in admin project interface */
  ADMIN_PROJECT: 'ADMIN_PROJECT',
  /** Show menu as a user module */
  USER: 'USER',
  /** Show menu as user module edition preview */
  PREVIEW: 'PREVIEW',
}

export const MENU_DISPLAY_MODES = values(MENU_DISPLAY_MODES_ENUM)
