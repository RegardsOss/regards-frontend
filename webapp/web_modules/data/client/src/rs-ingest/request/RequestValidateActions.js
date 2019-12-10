/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Actions to send a signal to validate a request
 */
export default class RequestValidateActions extends BasicSignalActions {
  constructor(namespace, instance = false) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${instance ? STATIC_CONF.IMSERVICES.INGEST_INSTANCE : STATIC_CONF.MSERVICES.INGEST}/requests/validate`,
      namespace,
      bypassErrorMiddleware: false,
    })
  }
}
