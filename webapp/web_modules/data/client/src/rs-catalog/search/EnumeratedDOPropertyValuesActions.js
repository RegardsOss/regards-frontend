/*
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
 */
import { CatalogDomain } from '@regardsoss/domain'
import { BasicArrayActions } from '@regardsoss/store-utils'

/**
 * Redux actions builder to fetch enumerated dataobjects values
 * @author Raphaël Mechali
 */
export default class EnumeratedDOPropertyValuesActions extends BasicArrayActions {
  /**
   * Constructor
   * @param {*} namespace action namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/engines/${CatalogDomain.LEGACY_SEARCH_ENGINE}/dataobjects/search/properties/{propertyName}/values`,
    })
  }

  /**
   * Returns the action to dispatch in order to fetch
   * @param {string} propertyName property name
   * @param {string} partialText values list filter as text
   * @param {number} maxCount max expected results ccount
   * @param {*} parameters other request parameters (q, ...)
   */
  fetchValues = (propertyName, partialText, maxCount, parameters = {}) => this.fetchEntityList({ propertyName }, { partialText, maxCount, ...parameters })
}
