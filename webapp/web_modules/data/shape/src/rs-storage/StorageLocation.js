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
import { StorageDomain } from '@regardsoss/domain'
import { PluginConfigurationContent } from '../rs-common'

export const StorageLocationConfiguration = PropTypes.shape({
  id: PropTypes.number, // not mandatory due to emulated "internal-cache" configuration, that has no ID
  priority: PropTypes.number, // not mandatory due to emulated "internal-cache"
  name: PropTypes.string.isRequired,
  pluginConfiguration: PluginConfigurationContent,
  storageType: PropTypes.oneOf(StorageDomain.DataStorageTypeEnumValues).isRequired,
  allocatedSizeInKo: PropTypes.number,
})

export const StorageLocationContent = PropTypes.shape({
  name: PropTypes.string.isRequired,
  nbFilesStored: PropTypes.number,
  totalStoredFilesSizeKo: PropTypes.number,
  nbStorageError: PropTypes.number,
  nbDeletionError: PropTypes.number,
  allowsPhysicalDeletion: PropTypes.bool.isRequired,
  configuration: StorageLocationConfiguration,
}).isRequired

export const StorageLocation = PropTypes.shape({
  content: StorageLocationContent,
})

export const StorageLocationList = PropTypes.objectOf(StorageLocation)
export const StorageLocationArray = PropTypes.arrayOf(StorageLocation)
