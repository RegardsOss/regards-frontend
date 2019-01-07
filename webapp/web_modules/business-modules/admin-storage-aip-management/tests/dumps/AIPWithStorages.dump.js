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

/**
 * Exports some ingest processing chain dump
 * @author Raphaël Mechali
 */

export const storedAIP = {
  content: {
    aip: {
      providerId: 'stored-aip',
      sipId: 'URN:SIP:DATA:test_raph:e5ebd3d5-2ae7-36e7-ab06-5cb81d799ca9:V1',
      state: 'STORED',
      ipType: 'DATA',
      id: 'URN:AIP:DATA:test_raph:e5ebd3d5-2ae7-36e7-ab06-5cb81d799ca9:V1',
      geometry: null,
      normalizedGeometry: null,
      properties: {
        contentInformations: [{
          representationInformation: { syntax: { mimeType: 'text/plain', name: 'TEXT' } },
          dataObject: {
            regardsDataType: 'RAWDATA', reference: false, urls: ['file:/regards-input/raph/storage-A//storage4/storage4/7fc6388aaf4a507c88309936881adac4', 'file:/regards-input/raph/storage-C//storage4/storage4/7fc6388aaf4a507c88309936881adac4', 'file:/regards-input/raph/storage-B//storage4/storage4/7fc6388aaf4a507c88309936881adac4'], filename: 'sip_10.dat', algorithm: 'MD5', checksum: '7fc6388aaf4a507c88309936881adac4', fileSize: 38000,
          },
        }],
        pdi: {
          contextInformation: {}, referenceInformation: {}, provenanceInformation: { history: [{ type: 'SUBMISSION', comment: 'Submission to REGARDS', date: '2018-12-21T10:55:06.714Z' }, { type: 'STORAGE', comment: 'File sip_10.dat has been successfully stored', date: '2018-12-21T10:55:35.87Z' }, { type: 'STORAGE', comment: 'AIP metadata has been successfully stored into REGARDS', date: '2018-12-21T10:55:45.046Z' }], session: 'session test (2)' }, fixityInformation: {}, accessRightInformation: {},
        },
        descriptiveInformation: { storage: 'storage4' },
      },
      type: 'Feature',
    },
    dataStorageIds: [1, 2],
  },
  links: [{ rel: 'list', href: 'http://172.26.47.52/api/v1/rs-storage/aips' }, { rel: 'list-with-datastorages', href: 'http://172.26.47.52/api/v1/rs-storage/aips/search' }, { rel: 'self', href: 'http://172.26.47.52/api/v1/rs-storage/aips/URN:AIP:DATA:test_raph:e5ebd3d5-2ae7-36e7-ab06-5cb81d799ca9:V1' }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-storage/aips/URN:AIP:DATA:test_raph:e5ebd3d5-2ae7-36e7-ab06-5cb81d799ca9:V1' }, { rel: 'deleteByQuery', href: 'http://172.26.47.52/api/v1/rs-storage/aips/search/delete' }, { rel: 'deleteByQueryOnSpecificDataStorages', href: 'http://172.26.47.52/api/v1/rs-storage/aips/files/delete' }],
}

export const deletedAIP = {
  content: {
    aip: {
      providerId: 'deleted-aip',
      sipId: 'URN:SIP:DATA:test_raph:f018e60f-1389-3f92-b790-e964297d0a15:V1',
      state: 'DELETED',
      ipType: 'DATA',
      id: 'URN:AIP:DATA:test_raph:f018e60f-1389-3f92-b790-e964297d0a15:V1',
      geometry: null,
      normalizedGeometry: null,
      properties: {
        contentInformations: [],
        pdi: {
          contextInformation: {}, referenceInformation: {}, provenanceInformation: { history: [{ type: 'SUBMISSION', comment: 'Submission to REGARDS', date: '2018-12-21T10:55:06.683Z' }, { type: 'STORAGE', comment: 'File sip_01.dat has been successfully stored', date: '2018-12-21T10:55:35.081Z' }, { type: 'STORAGE', comment: 'AIP metadata has been successfully stored into REGARDS', date: '2018-12-21T10:55:43Z' }, { type: 'DELETION', comment: 'AIP deletion was requested, AIP is considered deleted until its removal from archives', date: '2019-01-02T08:18:59.688Z' }, { type: 'DELETION', comment: 'File sip_01.dat has been successfully deleted', date: '2019-01-02T08:18:59.715Z' }], session: 'session test (2)' }, fixityInformation: {}, accessRightInformation: {},
        },
        descriptiveInformation: { storage: 'storage1' },
        miscInformation: {},
      },
      type: 'Feature',
    },
    dataStorageIds: [1],
  },
  links: [{ rel: 'list', href: 'http://172.26.47.52/api/v1/rs-storage/aips' }, { rel: 'list-with-datastorages', href: 'http://172.26.47.52/api/v1/rs-storage/aips/search' }, { rel: 'self', href: 'http://172.26.47.52/api/v1/rs-storage/aips/URN:AIP:DATA:test_raph:f018e60f-1389-3f92-b790-e964297d0a15:V1' }, { rel: 'delete', href: 'http://172.26.47.52/api/v1/rs-storage/aips/URN:AIP:DATA:test_raph:f018e60f-1389-3f92-b790-e964297d0a15:V1' }, { rel: 'deleteByQuery', href: 'http://172.26.47.52/api/v1/rs-storage/aips/search/delete' }, { rel: 'deleteByQueryOnSpecificDataStorages', href: 'http://172.26.47.52/api/v1/rs-storage/aips/files/delete' }],
}
