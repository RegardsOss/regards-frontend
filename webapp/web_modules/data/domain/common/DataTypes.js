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
 * Possible data types
 */
export const DATA_TYPES_ENUM = {
  RAWDATA: 'RAWDATA',
  QUICKLOOK_SD: 'QUICKLOOK_SD',
  QUICKLOOK_MD: 'QUICKLOOK_MD',
  QUICKLOOK_HD: 'QUICKLOOK_HD',
  DOCUMENT: 'DOCUMENT',
  THUMBNAIL: 'THUMBNAIL',
  OTHER: 'OTHER',
  AIP: 'AIP',
  DESCRIPTION: 'DESCRIPTION',
}
export const DATA_TYPES = values(DATA_TYPES_ENUM)

// OLD ones: DATA_TYPES_ENUM, DataTypes
// DATATYPE, DATATYPE_ENUM
// NEW ones: DATA_TYPES_ENUM, DATA_TYPES
