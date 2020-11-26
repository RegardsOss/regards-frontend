/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Files dumps (as saved in store)
 */
export const SOME_FILES = {
  content: {
    0: {
      content: {
        id: 0,
        orderId: 0,
        state: 'PENDING',
        filename: 'pending_file.png',
        filesize: 25654,
        checksum: 'ABC10D1',
        online: true,
        uri: 'http://menthealeau.com/pending_file.png',
        mimeType: 'image/png',
        dataType: 'THUMBNAIL',
        reference: false,
        imageWidth: 200,
        imageHeight: 200,
        digestAlgorithm: 'leo method',
        source: 'Traitement1',
      },
      links: [],
    },
    1: {
      content: {
        id: 1,
        orderId: 0,
        state: 'AVAILABLE',
        filename: 'available_file.tif',
        filesize: 2565401,
        checksum: 'ABC10D2',
        online: false,
        uri: 'http://menthealeau.com/available_file.tif',
        mimeType: 'image/tiff',
        dataType: 'THUMBNAIL',
        reference: false,
        imageWidth: 200,
        imageHeight: 200,
        digestAlgorithm: 'leo method',
        source: 'Traitement1',
      },
      links: [],
    },
  },
  metadata: {
    number: 0,
    size: 20,
    totalElements: 2,
  },
}
