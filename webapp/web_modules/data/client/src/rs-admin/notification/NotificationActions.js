/*
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
 */
import { NOTIFICATION, NOTIFICATION_ARRAY } from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle projects entities from backend server.
 *
 * To use this actions, you need to pass a parameter : <namespace>.
 *
 * namespace : String, exemple :  'module/projects'. Must be the same as the namespace
 * used with the associated Reducer.
 *
 * The namespace is used by redux to understand what to do with the action.
 * If you want to manage two different list of projects. You have to define two
 * NotificationActions with two different namespace.
 *
 * @author Maxime Bouveron
 */
export default class NotificationActions extends BasicPageableActions {
  constructor(namespace, instance = false) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${
        instance ? STATIC_CONF.MSERVICES_PUBLIC.ADMIN_INSTANCE : STATIC_CONF.MSERVICES_PUBLIC.ADMIN
      }/notifications`,
      // Resource endpoint is not the accessed one. it is the secured one, not the public one.
      resourcesEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${
        instance ? STATIC_CONF.MSERVICES.ADMIN_INSTANCE : STATIC_CONF.MSERVICES.ADMIN
      }/notifications`,
      schemaTypes: {
        ENTITY: NOTIFICATION,
        ENTITY_ARRAY: NOTIFICATION_ARRAY,
      },
    })
  }
}
