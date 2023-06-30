/*
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
 */
import { PROJECT_CONNECTION, PROJECT_CONNECTION_ARRAY } from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle ProjectConnection entities from backend server.
 *
 * To use this actions, you need to pass a parameter : <namespace>.
 *
 * namespace : String, example :  'module/ProjectConnection'.
 * Must be the same as the namespace used with the associated Reducer.
 *
 * The namespace is used by redux to understand what to do with the action.
 * If you want to manage two different list of ProjectConnection. You have to define two
 * ProjectConnectionActions with two different namespace.
 *
 * @author Sébastien Binda
 */
export default class ProjectConnectionActions extends BasicPageableActions {
  /**
   * Constructor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.IMSERVICES.ADMIN_INSTANCE}/projects/{projectName}/connections`,
      entityPathVariable: 'connectionId',
      schemaTypes: {
        ENTITY: PROJECT_CONNECTION,
        ENTITY_ARRAY: PROJECT_CONNECTION_ARRAY,
      },
    })
  }
}
