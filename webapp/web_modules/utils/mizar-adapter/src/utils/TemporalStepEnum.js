/**
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/
import values from 'lodash/values'

export const TEMPORAL_STEP_ENUM = {
  UNSPECIFIED: 'UNSPECIFIED',
  SIX_HOURS: 'SIX_HOURS',
  DAY: 'DAY',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
}
export const TEMPORAL_STEP_ENUM_VALUES = values(TEMPORAL_STEP_ENUM)

// Theses approximations helps us to reconize the period independly on how the server sent it
export const TEMPORAL_STEP_ENUM_TO_SECONDS = {
  SIX_HOURS: 21600,
  DAY: 86400,
  MONTH: 2592000,
  YEAR: 31536000,
}
