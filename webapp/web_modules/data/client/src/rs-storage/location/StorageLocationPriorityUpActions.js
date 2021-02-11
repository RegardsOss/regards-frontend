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
 */
import { STORAGE_LOCATION, STORAGE_LOCATION_ARRAY } from '@regardsoss/api'
import { BasicSignalActions, RequestVerbEnum } from '@regardsoss/store-utils'

/**
 * Actions to get PrioritizedDataStorage information
 * @author Raphaël Mechali
 */
class StorageLocationPriorityUpActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.STORAGE}/storages/{id}/up`,
      schemaTypes: {
        ENTITY: STORAGE_LOCATION,
        ENTITY_ARRAY: STORAGE_LOCATION_ARRAY,
      },
    })
  }

  upPriority = (prioritizedDataStorageId, prioritizedDataStorage) => this.sendSignal(RequestVerbEnum.PUT, prioritizedDataStorage, { id: prioritizedDataStorageId }, {})
}

export default StorageLocationPriorityUpActions
