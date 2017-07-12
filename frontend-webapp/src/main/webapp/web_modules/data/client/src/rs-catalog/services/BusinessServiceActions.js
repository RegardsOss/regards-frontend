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
 */
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Fetches bussiness service.
 * Note that those actions should be instantiated once for each serviceScope to fetch (because backend cannot return ALL)
 */
export default class BusinessServiceActions extends BasicListActions {

  /**
   * Possible service scopes
   */
  static ServiceScopes = {
    ONE_DATAOBJECT: 'ONE',
    MANY_DATAOBJECTS: 'MANY',
    ONE_DATASET: 'QUERY',
  }

  constructor(namespace, serviceScope) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/services/{dataset_id}`,
      schemaTypes: {
        ENTITY: Schemas.BUSINESS_PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.BUSINESS_PLUGIN_CONFIGURATION_ARRAY,
      },
    })
    if (!serviceScope) {
      throw new Error('Service scope must be defined at constructor!')
    }
    this.serviceScope = serviceScope
  }

  fetchServices(datasetId) {
    if (datasetId) {
      return this.fetchEntityList({ dataset_id: datasetId }, { service_scope: this.serviceScope })
    }
    return null
  }

}
