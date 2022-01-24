/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ATTRIBUTE_MODEL, ATTRIBUTE_MODEL_ARRAY } from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Retrieve DataObjects attributes for given datasets or dataset models
 * Query params :
 * - datasetIds : List of dataset identifier to retrieve dataobject attributes for.
 * - modelNames : Same as before but using model names.
 * @author Sébastien Binda
 */
export default class DatasetAttributesActions extends BasicPageableActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/datasets/attributes`,
      schemaTypes: {
        ENTITY: ATTRIBUTE_MODEL,
        ENTITY_ARRAY: ATTRIBUTE_MODEL_ARRAY,
      },
    })
  }
}
