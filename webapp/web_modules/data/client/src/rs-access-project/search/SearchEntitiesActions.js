/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicFacetsPageableActions } from '@regardsoss/store-utils'
import { ENTITY, ENTITY_ARRAY } from '@regardsoss/api'

/**
 * Direct research entities actions
 */
export default class CatalogSearchEntitiesActions extends BasicFacetsPageableActions {
  /**
   * Constructor
   * @param {*} namespace namespace for actions
   * @param {*} endpoint endpoint (optional, default to generic search catalog endpoint)
   */
  constructor(namespace, endpoint = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/search`) {
    super({
      namespace,
      entityEndpoint: endpoint,
      schemaTypes: {
        ENTITY,
        ENTITY_ARRAY,
      },
    })
  }
}
