/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

export const HOME_ICON_TYPES_ENUM = {
  NONE: 'NONE',
  DEFAULT_HOME_ICON: 'DEFAULT_HOME_ICON',
  MODULE_ICON: 'MODULE_ICON',
  CUSTOM_URL_ICON: 'CUSTOM_URL_ICON',
}

export const HOME_ICON_TYPES = values(HOME_ICON_TYPES_ENUM)