import { CommonDomain } from '@regardsoss/domain'

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

/**
 * Holds quicklooks definition builder for tests. Returns groups as resolved for runtime
 * @author Raphaël Mechali
 */

export function buildQuicklookGroupFor(groupName, primary) {
  return [
    CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD,
    CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD,
    CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD].reduce((acc, dataType) => ({
    ...acc,
    [dataType]: {
      dataType,
      reference: false,
      uri: `http://test/${dataType}.jpg`,
      mimeType: 'image/jpeg',
      imageWidth: 105,
      imageHeight: 88,
      online: true,
      checksum: 'IDKIDKIDK',
      digestAlgorithm: 'MD5',
      filesize: 13453,
      filename: `${dataType}.jpg`,
    },
  }), { label: groupName, primary })
}
