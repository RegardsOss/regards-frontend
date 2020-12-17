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
import replace from 'lodash/replace'
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Redux actions to clear plugins cache for a microservice
 * @author Raphaël Mechali
 */
export default class ClearPluginCacheActions extends BasicSignalActions {
  /**
   * Construtor
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microserviceName}/plugins/cache`,
    })
  }

  /**
   * Builds action to dispatch in order to send server the clear cache signal
   * @param {string} microserviceName microservice name, like 'rs-dam', 'rs-catalog', ...
   *@return redux action to dispatch
   */
  clearCache = (microserviceName) => this.sendSignal('DELETE', null, { microserviceName })

  getMsDependency = (verb, microserviceName) => replace(this.getDependency(verb), '{microserviceName}', microserviceName)
}
