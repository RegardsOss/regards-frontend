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
import { CommonDomain } from '@regardsoss/domain'

/**
 * Holds some files for tests
 * @author Raphaël Mechali
 */

// note downloadable (wrong type)
export const notDownloadableFile = {
  dataType: CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD,
  reference: false,
  uri: 'test:quicklook.png',
  mimeType: 'image/png',
  imageWidth: 10,
  imageHeight: 10,
  online: true,
  filename: 'quicklook.png',
}

// downloadable but offline
export const offlineRawData = {
  dataType: CommonDomain.DATA_TYPES_ENUM.RAWDATA,
  reference: false,
  uri: 'test:offline-rawdata.css',
  mimeType: 'text/css',
  online: false,
  filename: 'offline-rawdata.css',
}

// downloadable, from storage
export const onlineRawData = {
  dataType: CommonDomain.DATA_TYPES_ENUM.RAWDATA,
  reference: false,
  uri: 'test:online-rawdata.css',
  mimeType: 'text/css',
  online: true,
  filename: 'online-rawdata.css',
}

// downloadable, external
export const onlineDocRef = {
  dataType: CommonDomain.DATA_TYPES_ENUM.DOCUMENT,
  reference: true,
  uri: 'test:external-dpcument.css',
  mimeType: 'text/css',
  online: true,
  filename: 'online-document.css',
}
