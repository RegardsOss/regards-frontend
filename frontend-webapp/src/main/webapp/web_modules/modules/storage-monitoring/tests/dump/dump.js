/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { storage } from '@regardsoss/units'
import { StoragePluginContainer } from '../../src/containers/StoragePluginContainer'

const dump = {
  1: {
    content: {
      confId: 1,
      label: 'Test plugin',
      description: 'This is a test plugin',
      storageInfo: [{
        storagePhysicalId: 'Quantic drive ZqO+',
        totalSize: '80To',
        usedSize: '10To',
      },
      {
        storagePhysicalId: 'Non parsable data plugin',
        totalSize: '80Txxo',
        usedSize: '10biomen',
      }],
    },
  },
}

// devices as converted by the Storage plugin container

const convertedParsableDevice = {
  storagePhysicalId: 'Quantic drive ZqO+',
  totalSize: StoragePluginContainer.parseAndConvert('100To', storage.StorageUnitScale.bytesScale),
  usedSize: StoragePluginContainer.parseAndConvert('10To', storage.StorageUnitScale.bytesScale),
  usedPercent: 10,
  unusedPercent: 90,
}
const convertedPartiallyParsableDevice = {
  storagePhysicalId: 'Quantic potatoes of the death',
  totalSize: StoragePluginContainer.parseAndConvert('50MB', storage.StorageUnitScale.bytesScale),
  usedSize: null,
  usedPercent: null,
  unusedPercent: null,
}

const convertedNonParsableDevice = {
  storagePhysicalId: 'Non parsable data plugin',
  totalSize: null,
  usedSize: null,
  usedPercent: null,
  unusedPercent: null,
}

export default {
  dump,
  convertedParsableDevice,
  convertedPartiallyParsableDevice,
  convertedNonParsableDevice,
}
