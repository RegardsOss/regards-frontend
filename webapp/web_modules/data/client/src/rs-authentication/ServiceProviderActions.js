/**
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
import replace from 'lodash/replace'
import { SERVICE_PROVIDER, SERVICE_PROVIDER_ARRAY } from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Actions for service provider
 * @author Théo Lasserre
 */
class ServiceProviderActions extends BasicPageableActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.AUTHENTICATION}/serviceproviders`,
      entityPathVariable: 'businessId',
      schemaTypes: {
        ENTITY: SERVICE_PROVIDER,
        ENTITY_ARRAY: SERVICE_PROVIDER_ARRAY,
      },
    })
  }

  getMsDependency = (verb, microserviceName) => replace(this.getDependency(verb), '{microserviceName}', microserviceName)
}

export default ServiceProviderActions
