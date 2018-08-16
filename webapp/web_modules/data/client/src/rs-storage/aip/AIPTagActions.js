/*
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
 */
import { BasicSignalsActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle AIP tags from backend server.
 * @author Léo Mieulet
 */
export default class AIPTagActions extends BasicSignalsActions {
  /** Root endpoints for order state actions */
  static ROOT_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.STORAGE}/aips`

  static ADD_TAG_ACTIONS = 'addTagEndpoint'

  static REMOVE_TAG_ACTIONS = 'removeTagEndpoint'

  static SEARCH_TAG_ACTIONS = 'searchTagEndpoint'

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      [AIPTagActions.ADD_TAG_ACTIONS]: {
        entityEndpoint: `${AIPTagActions.ROOT_ENDPOINT}/tags`,
        namespace: `${namespace}/resume`,
      },
      [AIPTagActions.REMOVE_TAG_ACTIONS]: {
        entityEndpoint: `${AIPTagActions.ROOT_ENDPOINT}/tags/delete`,
        namespace: `${namespace}/resume`,
      },
      [AIPTagActions.SEARCH_TAG_ACTIONS]: {
        entityEndpoint: `${AIPTagActions.ROOT_ENDPOINT}/tags/search`,
        namespace: `${namespace}/resume`,
      },
    })
  }

  /**
   * Build an action that adds some tags to a set of aips
   */
  addTags(payload) {
    return this.getSubAction(AIPTagActions.ADD_TAG_ACTIONS).sendSignal('POST', payload)
  }

  /**
   * Build an action that removes some tags to a set of aips
   */
  removeTags(payload) {
    return this.getSubAction(AIPTagActions.REMOVE_TAG_ACTIONS).sendSignal('POST', payload)
  }

  /**
   * Build an action that search all tags used by aips
   */
  fetchCommonTags(params) {
    return this.getSubAction(AIPTagActions.SEARCH_TAG_ACTIONS).sendSignal('POST', params)
  }
}
