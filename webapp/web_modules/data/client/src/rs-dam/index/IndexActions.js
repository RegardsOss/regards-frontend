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
import { BasicSignalsActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle index reset.
 *
 * @author Sébastien Binda
 */
export default class IndexActions extends BasicSignalsActions {
  static ROOT_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/index`

  static RESET_INDEX_ACTION = 'resetIndexAction'

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      [IndexActions.RESET_INDEX_ACTION]: {
        entityEndpoint: `${IndexActions.ROOT_ENDPOINT}`,
        namespace: `${namespace}/reset`,
      },
    })
  }

  resetIndex() {
    return this.getSubAction(IndexActions.RESET_INDEX_ACTION).sendSignal('DELETE', null, {})
  }
}
