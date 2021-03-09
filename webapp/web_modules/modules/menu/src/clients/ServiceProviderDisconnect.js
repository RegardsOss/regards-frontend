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
import { BasicSignalActions, RequestVerbEnum } from '@regardsoss/store-utils'

/**
 * Disconnect a service provider
 * @author Théo Lasserre
 */
class ServiceProviderDisconnect extends BasicSignalActions {
  /**
   * Constructor
   */
  constructor() {
    super({
      namespace: 'deauthenticate-service-provider',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.AUTHENTICATION}/serviceproviders/{name}/deauthenticate`,
    })
  }

  disconnectServiceProvider = (serviceProviderName) => this.sendSignal(RequestVerbEnum.POST, {}, { name: serviceProviderName })
}

export const disconnectServiceProviderAction = new ServiceProviderDisconnect()
