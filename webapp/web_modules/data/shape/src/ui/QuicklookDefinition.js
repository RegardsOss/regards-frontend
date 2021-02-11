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
import { CommonDomain } from '@regardsoss/domain'
import { DataFile } from '../rs-dam/DataFile'

/**
 * A quiclook definition, as compiled and used by UI
 * @author Raphaël Mechali
 */
export const QuicklookDefinition = PropTypes.shape({
  label: PropTypes.string, // when missing, it is an unknown group
  primary: PropTypes.bool.isRequired,
  // each file is not required separately, but one file is granted to be provided
  [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD]: DataFile,
  [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD]: DataFile,
  [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD]: DataFile,
})
