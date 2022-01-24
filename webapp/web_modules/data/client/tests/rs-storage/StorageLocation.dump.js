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
export default [{
  content: {
    name: 'Disk storage 1',
    nbDeletionError: 0,
    nbStorageError: 0,
    nbFilesStored: 0,
    totalStoredFilesSize: 0,
    allowsPhysicalDeletion: true,
    configuration: {
      id: 1,
      name: 'Disk storage 1',
      storageConfiguration: {
        id: 1,
        pluginId: 'LocalDataStorage',
        label: 'Disk storage 1',
        version: '1.0',
        priorityOrder: 1,
        active: true,
        pluginClassName: 'className',
        parameters: [],
      },
      storageType: 'ONLINE',
      priority: 1,
    },
  },
  links: [],
}, {
  content: {
    name: 'Disk storage 2',
    nbDeletionError: 0,
    nbStorageError: 0,
    nbFilesStored: 0,
    allowsPhysicalDeletion: true,
    configuration: {
      name: 'Disk storage 2',
      id: 2,
      storageConfiguration: {
        id: 2,
        pluginId: 'LocalDataStorage',
        label: 'Disk storage 2',
        version: '1.0',
        priorityOrder: 1,
        active: true,
        pluginClassName: 'className',
        parameters: [],
      },
      storageType: 'ONLINE',
      priority: 2,
    },
  },
  links: [],
}, {
  content: {
    name: 'STAF storage 1',
    nbDeletionError: 0,
    nbStorageError: 0,
    nbFilesStored: 0,
    allowsPhysicalDeletion: false,
    configuration: {
      name: 'STAF storage 1',
      id: 3,
      storageConfiguration: {
        id: 3,
        pluginId: 'StafDataStorage',
        label: 'STAF storage 1',
        version: '1.0',
        priorityOrder: 1,
        active: true,
        pluginClassName: 'className2',
        parameters: [],
      },
      storageType: 'NEARLINE',
      priority: 3,
    },
  },
  links: [],
}, {
  content: {
    name: 'STAF storage 2',
    nbDeletionError: 0,
    nbStorageError: 0,
    nbFilesStored: 0,
    allowsPhysicalDeletion: false,
    configuration: {
      id: 4,
      name: 'STAF storage 2',
      storageConfiguration: {
        id: 4,
        pluginId: 'StafDataStorage',
        label: 'STAF storage 2',
        version: '1.0',
        priorityOrder: 1,
        active: true,
        pluginClassName: 'className2',
        parameters: [],
      },
      storageType: 'NEARLINE',
      priority: 4,
    },
  },
  links: [],
}]
