/*
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicSignalsActions } from '@regardsoss/store-utils'

/**
 * Redux actions to create fem requests
 * @author Léo Mieulet
 */
export default class RequestsActions extends BasicSignalsActions {
  /** Root endpoints for features microservice actions */
  static ROOT_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.FEM}`

  static NOTIFY = 'NOTIFY'

  static DELETE = 'DELETE'

  static UPDATE = 'UPDATE'

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      [RequestsActions.NOTIFY]: {
        entityEndpoint: `${RequestsActions.ROOT_ENDPOINT}/requests/notify`,
        namespace: `${namespace}/notify`,
      },
      [RequestsActions.DELETE]: {
        entityEndpoint: `${RequestsActions.ROOT_ENDPOINT}/requests/delete`,
        namespace: `${namespace}/DELETE`,
      },
      [RequestsActions.UPDATE]: {
        entityEndpoint: `${RequestsActions.ROOT_ENDPOINT}/requests/update`,
        namespace: `${namespace}/UPDATE`,
      },
    })
  }

  /**
   * Build an action that (re)notify features using the provided search context
   */
  notify(searchContext) {
    return this.getSubAction(RequestsActions.NOTIFY).sendSignal('POST', null, searchContext)
  }

  /**
   * Build an action that delete features using the provided search context
   */
  delete(searchContext) {
    return this.getSubAction(RequestsActions.DELETE).sendSignal('POST', null, searchContext)
  }

  /**
   * Build an action that update features using formValues
   */
  update(formValues) {
    return this.getSubAction(RequestsActions.UPDATE).sendSignal('POST', null, formValues)
  }
}
