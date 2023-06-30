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
import { MODEL, MODEL_ARRAY } from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle Model entities from backend server.
 *
 * @author Léo Mieulet
 */
export default class ModelActions extends BasicListActions {
  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/models`,
      entityPathVariable: 'modelName',
      schemaTypes: {
        ENTITY: MODEL,
        ENTITY_ARRAY: MODEL_ARRAY,
      },
    })
  }

  /**
   * Alter the entityEndpoint before sending the request, then get back to initial entityEndpoint
   * @param modelName Model name you want to duplicate
   * @param values Model new name and new description
   * @param queryParams
   * @returns {{}|*}
   */
  duplicateModel(modelName, values, queryParams) {
    const savedEntityEndpoint = this.entityEndpoint
    this.entityEndpoint = `${this.entityEndpoint}/{modelName}/duplicate`
    const resultingAction = super.createEntity(values, {
      modelName,
    }, queryParams)
    this.entityEndpoint = savedEntityEndpoint
    return resultingAction
  }

  /**
   * Alter the entityEndpoint before sending the request, then get back to initial entityEndpoint
   * @param objectValues
   * @param files
   * @param pathParams
   * @param queryParams
   * @returns {{}}
   */
  createEntityUsingMultiPart(objectValues, files, pathParams, queryParams) {
    const savedEntityEndpoint = this.entityEndpoint
    this.entityEndpoint = `${this.entityEndpoint}/import`
    const resultingAction = super.createEntityUsingMultiPart(objectValues, files, pathParams, queryParams)
    this.entityEndpoint = savedEntityEndpoint
    return resultingAction
  }
}
