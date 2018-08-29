/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import URLAuthInjector from '../common/URLAuthInjector'

/**
 * Controller / helper for DAM data files
 * @author Raphaël Mechali
 */

/**
 * Computes a file URI for a given DAM DataFile with authentication state as next parameters
 * @param {DataFile} dataFile data file, optional
 * @param {string} accessToken access token if used is logged, optional
 * @param {string} projectName project name (that will be used as scope when used is not logged)
 * @return {string} file URI, null if no file
 */
function getFileURI(dataFile, accessToken, projectName) {
  if (!dataFile) {
    return null
  }
  if (dataFile.reference) {
    // when file is a reference, return URI unchanged
    return dataFile.uri
  }
  return URLAuthInjector(dataFile.uri, accessToken, projectName)
}

export default {
  getFileURI,
}