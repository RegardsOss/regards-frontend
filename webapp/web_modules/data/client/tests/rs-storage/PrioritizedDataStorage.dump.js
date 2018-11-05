/**
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
 **/
export default [{
  content: {
    id: 1,
    dataStorageConfiguration: {
      id: 1,
      pluginId: 'LocalDataStorage',
      label: 'Disk storage 1',
      version: '1.0',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'className',
      parameters: [],
    },
    dataStorageType: 'ONLINE',
    priority: 1,
  },
  links: [],
}, {
  content: {
    id: 2,
    dataStorageConfiguration: {
      id: 2,
      pluginId: 'LocalDataStorage',
      label: 'Disk storage 2',
      version: '1.0',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'className',
      parameters: [],
    },
    dataStorageType: 'ONLINE',
    priority: 2,
  },
  links: [],
}, {
  content: {
    id: 3,
    dataStorageConfiguration: {
      id: 3,
      pluginId: 'StafDataStorage',
      label: 'STAF storage 1',
      version: '1.0',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'className2',
      parameters: [],
    },
    dataStorageType: 'NEARLINE',
    priority: 3,
  },
  links: [],
}, {
  content: {
    id: 4,
    dataStorageConfiguration: {
      id: 4,
      pluginId: 'StafDataStorage',
      label: 'STAF storage 2',
      version: '1.0',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'className2',
      parameters: [],
    },
    dataStorageType: 'NEARLINE',
    priority: 4,
  },
  links: [],
}]
