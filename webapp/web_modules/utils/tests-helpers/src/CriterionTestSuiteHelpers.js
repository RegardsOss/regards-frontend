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

/**
 * Holds helpers to build attributes for crieria tests
 * @author Raphaël Mechali
 */

/**
 * Test suite helpers : initialize test suite and clears after run. Provides tools for tests
 */
export default {


  /**
   * @return minimal attribute stub for tests
   */
  getAttributeStub(type, unit = null, boundsInformation = { exists: false, loading: false, error: false }) {
    return {
      label: 'test',
      name: 'test',
      jsonPath: 'test',
      type,
      unit,
      boundsInformation,
    }
  },

  /**
   * @return built bounds information
   */
  getBoundsInformationStub(exists = false, loading = false, error = false, lowerBound, upperBound) {
    return {
      exists,
      loading,
      error,
      lowerBound,
      upperBound,
    }
  },

}
