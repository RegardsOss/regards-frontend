/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FRAGMENT, FRAGMENT_ARRAY } from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle Fragment entities from backend server.
 *
 * To use this actions, you need to pass a parameter : <namespace>.
 *
 * namespace : String, example :  'module/themes'. Must be the same as the namespace
 * used with the associated Reducer.
 *
 * The namespace is used by redux to understand what to do with the action.
 * If you want to manage two different list of projects. You have to define two
 * ProjectActions with two different namespace.
 *
 * @author Léo Mieulet
 */
export default class FragmentActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/models/fragments`,
      entityPathVariable: 'pFragmentId',
      schemaTypes: {
        ENTITY: FRAGMENT,
        ENTITY_ARRAY: FRAGMENT_ARRAY,
      },
    })
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
