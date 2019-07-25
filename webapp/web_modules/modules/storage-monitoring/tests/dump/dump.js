/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { StoragePluginContainer } from '../../src/containers/user/StoragePluginContainer'

export const dump = {
  1: {
    content: {
      confId: 1,
      label: 'ServerHDD',
      description: 'Main server hard drives',
      totalSize: '25To',
      usedSize: '0.9To',
    },
  },
  2: {
    content: {
      confId: 1,
      label: 'ServerHDD',
      description: 'Main server hard drives',
      totalSize: '25Txxxx',
    },
  },
}

// some plugins sampes, as they are parsed an converted by corresponding container

export const convertedParsablePlugin = {
  confId: 1,
  label: 'Quantic drive ZqO+',
  description: 'Ultimate storage technology',
  totalSize: StoragePluginContainer.parseAndConvert('100To', storage.StorageUnitScale.bytesScale),
  usedSize: StoragePluginContainer.parseAndConvert('10To', storage.StorageUnitScale.bytesScale),
  unusedSize: StoragePluginContainer.parseAndConvert('90To', storage.StorageUnitScale.bytesScale),
  usedPercent: 10,
  unusedPercent: 90,
}


export const convertedPartiallyParsablePlugin = {
  confId: 2,
  label: 'Quantic potatoes of the death',
  description: 'Really cool, ain\'t it?',
  totalSize: StoragePluginContainer.parseAndConvert('50MB', storage.StorageUnitScale.bytesScale),
}

export const convertedNonParsablePlugin = {
  confId: 5555555,
  label: 'Boring plugin',
  description: 'Really cool, ain\'t it?',
}
