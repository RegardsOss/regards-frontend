/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Data file related shapes
 * @author Raphaël Mechali
 */

/** only fields (for extending files to re-use) */
export const dataFileFields = {
  uri: PropTypes.string,
  checksum: PropTypes.string,
  digestAlgorithm: PropTypes.string,
  size: PropTypes.number,
  name: PropTypes.string,
  online: PropTypes.bool,
  mimeType: PropTypes.string,
}

/** complete object */
export const DataFile = PropTypes.shape(dataFileFields)
