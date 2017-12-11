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
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Redux store action for association model to attribute model
 */
export default class ModelAttributesActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/models/{pModelId}/attributes`,
      entityPathVariable: 'pAttributeId',
      schemaTypes: {
        ENTITY: Schemas.MODEL_ATTRIBUTE,
        ENTITY_ARRAY: Schemas.MODEL_ATTRIBUTE_ARRAY,
      },
    })
  }
  fetchModelAttributes(id) {
    return this.fetchEntityList({ pModelId: id })
  }
}
