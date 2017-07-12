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
 * Fetches UI services (ie: UI plugin configurations that have been indicated as results services)
 */
export default class UIServiceActions extends BasicListActions {

  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/services/{dataset_id}`,
      schemaTypes: {
        ENTITY: Schemas.UI_PLUGIN_CONFIGURATION,
        ENTITY_ARRAY: Schemas.UI_PLUGIN_CONFIGURATION_ARRAY,
      },
    })
  }

  fetchServices(datasetId) {
    if (datasetId) {
      return this.fetchEntityList({ dataset_id: datasetId })
    }
    return null
  }

}
