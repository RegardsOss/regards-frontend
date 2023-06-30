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
import { BasicSignalsActions } from '@regardsoss/store-utils'

/**
 * Redux actions to handle attribute model cache clear.
 *
 * @author Théo Lasserre
 */
export default class AttributesModelCacheActions extends BasicSignalsActions {
  static ROOT_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/attribute/cache`

  static CLEAR_CACHE_ACTION = 'clearCacheAction'

  constructor(namespace) {
    super({
      [AttributesModelCacheActions.CLEAR_CACHE_ACTION]: {
        entityEndpoint: `${AttributesModelCacheActions.ROOT_ENDPOINT}`,
        namespace: `${namespace}/clearCache`,
      },
    })
  }

  clearCache() {
    return this.getSubAction(AttributesModelCacheActions.CLEAR_CACHE_ACTION).sendSignal('DELETE', null, {})
  }
}
