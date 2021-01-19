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
import { CatalogDomain, UIDomain } from '@regardsoss/domain'

/**
 * Holds helpers to build attributes for crieria tests
 * @author Raphaël Mechali
 */

/**
 * Test suite helpers : initialize test suite and clears after run. Provides tools for tests
 */
export default {

  /**
   * @return {{en: string, fr: string}} a minimal label dictionary for tests
   */
  getLabelStub() {
    return {
      [UIDomain.LOCALES_ENUM.en]: 'Test label',
      [UIDomain.LOCALES_ENUM.fr]: 'Libellé de test',
    }
  },

  /**
   * @return {{engineType: string, searchParameters: *}} a minimal search context for tests
   */
  getSearchContextStub() {
    return {
      engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
      searchParameters: {
        geo: 'aCube',
        q: ['id:"myId"'],
      },
    }
  },

  /**
   * @return minimal attribute stub for tests
   */
  getAttributeStub(type, unit = null, boundsInformation = { exists: false, loading: false, error: false }) {
    return {
      label: 'test',
      name: 'test',
      jsonPath: 'testFrag.test',
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
