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

/**
  * @author Théo Lasserre
  */
export const settingsData = {
  0: {
    content: {
      name: 's3_server',
      description: 'S3 server to place orders.',
      value: {
        host: 'rs-s3-minio',
        port: 9000,
        region: 'fr-regards-1',
        key: 'default-key',
        password: 'default-password',
      },
      defaultValue: {
        host: 'rs-s3-minio',
        port: 9000,
        region: 'fr-regards-1',
        key: 'default-key',
        password: 'default-password',
      },
    },
    links: [],
  },
  1: {
    content: {
      name: 'delivery_bucket',
      description: 'Bucket on which the ZIP archives will be dropped once orders have been completed.',
      value: 'default-delivery-bucket',
      defaultValue: 'default-delivery-bucket',
    },
    links: [],
  },
  2: {
    content: {
      name: 'request_ttl',
      description: 'Maximum retention time of a delivery request in hours.',
      value: 12,
      defaultValue: 12,
    },
    links: [],
  },
  3: {
    content: {
      name: 'build_bucket',
      description: 'Temporary bucket on which available files will be transferred before building final zips.',
      value: 'default-build-bucket',
      defaultValue: 'default-build-bucket',
    },
    links: [],
  },
  4: {
    content: {
      name: 'order_size_limit_bytes',
      description: 'Maximum size in octets allowed for a delivery order. This value should not be greater than a suborder size in order microservice as delivery does not allow order with multiple suborders.',
      value: 0,
      defaultValue: 0,
    },
    links: [],
  },
}
