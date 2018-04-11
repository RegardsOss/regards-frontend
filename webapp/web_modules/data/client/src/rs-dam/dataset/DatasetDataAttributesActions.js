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
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Retrieve DataObjects attributes for given datasets or dataset models
 * Query params :
 * - datasetIds : List of dataset identifier to retrieve dataobject attributes for.
 * - modelIds : List of dataset models identifier to retrieve dataobject attrbutes for.
 * @author Sébastien Binda
 */
export default class DatasetDataAttributesActions extends BasicPageableActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/datasets/data/attributes`,
      schemaTypes: {
        ENTITY: Schemas.ATTRIBUTE_MODEL,
        ENTITY_ARRAY: Schemas.ATTRIBUTE_MODEL_ARRAY,
      },
    })
  }
}
