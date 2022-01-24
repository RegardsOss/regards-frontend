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
 **/
import { StorageDomain } from '@regardsoss/domain'

/**
 * Exposes some data storages dumps
 * @author Raphaël Mechali
 */

export const storage1 = {
  id: 1,
  priority: 1,
  storageType: StorageDomain.DataStorageTypeEnum.NEARLINE,
  name: 'storage1',
  pluginConfiguration: {
    id: 1,
    pluginId: '1',
    label: 'storage1',
    version: '1.0',
    priorityOrder: 1,
    active: true,
    pluginClassName: 'JavaBeanUltraLongFactorySingleton.java',
    parameters: [],
  },
}
export const storage2 = {
  id: 2,
  priority: 2,
  storageType: StorageDomain.DataStorageTypeEnum.NEARLINE,
  name: 'storage2',
  pluginConfiguration: {
    id: 2,
    pluginId: '2',
    label: 'storage2',
    version: '2.0',
    priorityOrder: 2,
    active: true,
    pluginClassName: 'JavaBeanUltraLongFactorySingleton.java',
    parameters: [],
  },
}
