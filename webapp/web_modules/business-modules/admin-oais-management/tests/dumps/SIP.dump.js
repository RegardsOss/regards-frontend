/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Exports some SIP
 * @author Simon MILHAU
 */

export const SIP = {
  content: {
    id: 13002,
    aipId: 'URN:SIP:DATA:project1:2b11955d-383d-37b0-a555-0da59aab882d:V1',
    state: 'STORED',
    aip: {
      providerId: 'regards-2290-data-1-1',
      sipId: 'URN:SIP:DATA:project1:2b11955d-383d-37b0-a555-0da59aab882d:V1',
      version: 1,
      ipType: 'DATA',
      id: 'URN:SIP:DATA:project1:2b11955d-383d-37b0-a555-0da59aab882d:V1',
      geometry: null,
      normalizedGeometry: null,
      properties: {
        contentInformations: [
          {
            representationInformation: {
              syntax: {
                mimeType: 'text/plain',
                name: 'TEXT',
              },
            },
            dataObject: {
              regardsDataType: 'RAWDATA',
              locations: [
                {
                  storage: 'Local',
                  url: 'file:/regards-input/storages/local/validation/regards-2290/19c6c1832edeb324c91925c30c28400c',
                  storePath: '/validation/regards-2290',
                },
                {
                  storage: 'STAF',
                  url: 'staf://archive/validation/regards_2290_copy/19c6c1832edeb324c91925c30c28400c',
                  storePath: '/validation/regards_2290_copy',
                },
              ],
              filename: 'regards-2290-data-1-1.dat',
              algorithm: 'MD5',
              checksum: '19c6c1832edeb324c91925c30c28400c',
              fileSize: 12288,
            },
          },
        ],
        pdi: {
          contextInformation: {
            tags: [],
          },
          referenceInformation: {},
          provenanceInformation: {
            history: [
              {
                type: 'update',
                comment: 'File regards-2290-data-1-1.dat [19c6c1832edeb324c91925c30c28400c] is now stored on STAF.',
                date: '2019-12-20T16:24:56.229Z',
              },
            ],
          },
          fixityInformation: {},
          accessRightInformation: {},
        },
        descriptiveInformation: {
          creationdate: '2018-01-20T17:22:48Z',
          dataSetType: 'type_01',
          label: 'REGARDS 2290 generated data 1-1',
          doubleValue: 35.56598,
          longValue: 11056,
        },
      },
      type: 'Feature',
    },
    checksum: 'd4f25827d489567e09911bddec74d5f1',
    storages: [
      'Local',
      'STAF',
    ],
    sessionOwner: 'validation',
    session: 'REGARDS-2290',
    categories: [
      '2290',
    ],
    providerId: 'regards-2290-data-1-1',
    tags: [],
    creationDate: '2019-12-20T16:13:20.254Z',
    lastUpdate: '2019-12-20T16:24:56.735Z',
    ipType: 'DATA',
  },
  links: [],
}

export const deletedSIP = {
  content: {
    id: 13002,
    aipId: 'URN:SIP:DATA:project1:2b11955d-383d-37b0-a555-0da59aab882d:V1',
    state: 'STORED',
    aip: {
      providerId: 'regards-2290-data-1-1',
      sipId: 'URN:SIP:DATA:project1:2b11955d-383d-37b0-a555-0da59aab882d:V1',
      version: 1,
      ipType: 'DATA',
      id: 'URN:SIP:DATA:project1:2b11955d-383d-37b0-a555-0da59aab882d:V1',
      geometry: null,
      normalizedGeometry: null,
      properties: {
        contentInformations: [
          {
            representationInformation: {
              syntax: {
                mimeType: 'text/plain',
                name: 'TEXT',
              },
            },
            dataObject: {
              regardsDataType: 'RAWDATA',
              locations: [
                {
                  storage: 'Local',
                  url: 'file:/regards-input/storages/local/validation/regards-2290/19c6c1832edeb324c91925c30c28400c',
                  storePath: '/validation/regards-2290',
                },
                {
                  storage: 'STAF',
                  url: 'staf://archive/validation/regards_2290_copy/19c6c1832edeb324c91925c30c28400c',
                  storePath: '/validation/regards_2290_copy',
                },
              ],
              filename: 'regards-2290-data-1-1.dat',
              algorithm: 'MD5',
              checksum: '19c6c1832edeb324c91925c30c28400c',
              fileSize: 12288,
            },
          },
        ],
        pdi: {
          contextInformation: {
            tags: [],
          },
          referenceInformation: {},
          provenanceInformation: {
            history: [
              {
                type: 'update',
                comment: 'File regards-2290-data-1-1.dat [19c6c1832edeb324c91925c30c28400c] is now stored on STAF.',
                date: '2019-12-20T16:24:56.229Z',
              },
            ],
          },
          fixityInformation: {},
          accessRightInformation: {},
        },
        descriptiveInformation: {
          creationdate: '2018-01-20T17:22:48Z',
          dataSetType: 'type_01',
          label: 'REGARDS 2290 generated data 1-1',
          doubleValue: 35.56598,
          longValue: 11056,
        },
      },
      type: 'Feature',
    },
    checksum: 'd4f25827d489567e09911bddec74d5f1',
    storages: [
      'Local',
      'STAF',
    ],
    sessionOwner: 'validation',
    session: 'REGARDS-2290',
    categories: [
      '2290',
    ],
    providerId: 'regards-2290-data-1-1',
    tags: [],
    creationDate: '2019-12-20T16:13:20.254Z',
    lastUpdate: '2019-12-20T16:24:56.735Z',
    ipType: 'DATA',
  },
  links: [],
}
