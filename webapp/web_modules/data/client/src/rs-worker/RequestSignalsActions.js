/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicSignalsActions } from '@regardsoss/store-utils'

/**
 * Specific signal actions used by admin to delete or retry worker requests
 * @author Théo Lasserre
 */
export default class RequestSignalsActions extends BasicSignalsActions {
  static ROOT_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.WORKER_MANAGER}`

  static DELETE = 'DELETE'

  static RETRY = 'RETRY'

  constructor(namespace) {
    super({
      [RequestSignalsActions.DELETE]: {
        entityEndpoint: `${RequestSignalsActions.ROOT_ENDPOINT}/delete`,
        namespace: `${namespace}/${RequestSignalsActions.DELETE}`,
      },
      [RequestSignalsActions.RETRY]: {
        entityEndpoint: `${RequestSignalsActions.ROOT_ENDPOINT}/retry`,
        namespace: `${namespace}/${RequestSignalsActions.RETRY}`,
      },
    })
  }

  delete(requestBodyParameters) {
    return this.getSubAction(RequestSignalsActions.DELETE).sendSignal('DELETE', requestBodyParameters)
  }

  retry(requestBodyParameters) {
    return this.getSubAction(RequestSignalsActions.RETRY).sendSignal('POST', requestBodyParameters)
  }
}
