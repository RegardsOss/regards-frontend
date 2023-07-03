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
export default {
  metadata: {
    size: 20, totalElements: 3, totalPages: 1, number: 0,
  },
  content: [{
    content: {
      id: 97,
      sipId: 'test_chris_harvest_simple_sip_23',
      ipId: 'URN:SIP:DATA:project1:ab8cc77c-dab7-393e-911c-dd6d3cc69492:V1',
      owner: 'regards-admin@c-s.fr',
      version: 1,
      state: 'DELETED',
      processingErrors: [],
      checksum: 'c1480ff3bfe705f267556fca08af504e',
      sip: {
        ipType: 'DATA',
        id: 'test_chris_harvest_simple_sip_23',
        geometry: null,
        properties: {
          contentInformations: [{
            representationInformation: { syntax: { mimeType: 'application/octet-stream', name: 'application' } },
            dataObject: {
              regardsDataType: 'RAWDATA', url: 'file:/regards-input/chris/input/simple_sip_23.dat', algorithm: 'MD5', checksum: 'dd0a69cd02bac423d6b7d16c0c9269e6',
            },
          }],
          pdi: {
            contextInformation: { tags: ['VALIDATION_DATA_MODEL_1', 'SESSION_12', 'TAG_CHRIS'] }, referenceInformation: {}, provenanceInformation: { history: [] }, fixityInformation: {}, accessRightInformation: {},
          },
          descriptiveInformation: {
            creationdate: '2017-12-01T08:33:13Z', dataSetType: 'chris_harvest_simple_model', label: 'Simple Model Sip 23', doubleValue: 9.969696969, longValue: 11009,
          },
        },
        type: 'Feature',
      },
      ingestDate: '2018-02-19T14:04:16.285Z',
      lastUpdateDate: '2018-02-19T14:06:45.044Z',
      processing: 'DefaultProcessingChain',
      session: {
        id: 'session 12', lastActivationDate: '2018-02-19T14:06:45.045Z', sipsCount: 0, indexedSipsCount: 0, storedSipsCount: 0, generatedSipsCount: 0, errorSipsCount: 0,
      },
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-ingest/sips/URN:SIP:DATA:project1:ab8cc77c-dab7-393e-911c-dd6d3cc69492:V1', template: { variables: { variables: [] }, baseUri: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-ingest/sips/URN:SIP:DATA:project1:ab8cc77c-dab7-393e-911c-dd6d3cc69492:V1' } }],
  }, {
    content: {
      id: 96,
      sipId: 'test_chris_harvest_simple_sip_12',
      ipId: 'URN:SIP:DATA:project1:c001cb4d-2cf9-33cc-997b-0599c843dc9f:V2',
      owner: 'regards-admin@c-s.fr',
      version: 2,
      state: 'DELETED',
      processingErrors: [],
      checksum: 'ccbcbecd5b67e08b9b6d215746c7c7e3',
      sip: {
        ipType: 'DATA',
        id: 'test_chris_harvest_simple_sip_12',
        geometry: null,
        properties: {
          contentInformations: [{
            representationInformation: { syntax: { mimeType: 'application/octet-stream', name: 'application' } },
            dataObject: {
              regardsDataType: 'RAWDATA', url: 'file:/regards-input/chris/input/simple_sip_23.dat', algorithm: 'MD5', checksum: 'dd0a69cd02bac423d6b7d16c0c9269e6',
            },
          }],
          pdi: {
            contextInformation: { tags: ['VALIDATION_DATA_MODEL_1', 'SESSION_12', 'TAG_CHRIS'] }, referenceInformation: {}, provenanceInformation: { history: [] }, fixityInformation: {}, accessRightInformation: {},
          },
          descriptiveInformation: {
            creationdate: '2017-12-01T08:33:13Z', dataSetType: 'chris_harvest_simple_model', label: 'Simple Model Sip 12', doubleValue: 9.969696969, longValue: 11009,
          },
        },
        type: 'Feature',
      },
      ingestDate: '2018-02-19T10:27:18.886Z',
      lastUpdateDate: '2018-02-19T10:39:58.681Z',
      processing: 'DefaultProcessingChain',
      session: {
        id: 'session 12', lastActivationDate: '2018-02-19T14:06:45.045Z', sipsCount: 0, indexedSipsCount: 0, storedSipsCount: 0, generatedSipsCount: 0, errorSipsCount: 0,
      },
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-ingest/sips/URN:SIP:DATA:project1:c001cb4d-2cf9-33cc-997b-0599c843dc9f:V2', template: { variables: { variables: [] }, baseUri: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-ingest/sips/URN:SIP:DATA:project1:c001cb4d-2cf9-33cc-997b-0599c843dc9f:V2' } }],
  }, {
    content: {
      id: 95,
      sipId: 'test_chris_harvest_simple_sip_12',
      ipId: 'URN:SIP:DATA:project1:c001cb4d-2cf9-33cc-997b-0599c843dc9f:V1',
      owner: 'regards-admin@c-s.fr',
      version: 1,
      state: 'STORE_ERROR',
      processingErrors: [],
      checksum: 'c15220919b69d2babecd7cb802153d56',
      sip: {
        ipType: 'DATA',
        id: 'test_chris_harvest_simple_sip_12',
        geometry: null,
        properties: {
          contentInformations: [{
            representationInformation: { syntax: { mimeType: 'application/octet-stream', name: 'application' } },
            dataObject: {
              regardsDataType: 'RAWDATA', url: 'file:/regards-input/chris/input/simple_sip_12.dat', algorithm: 'MD5', checksum: '80abac96c3ef226c35577146d4853f3f',
            },
          }],
          pdi: {
            contextInformation: { tags: ['VALIDATION_DATA_MODEL_1', 'SESSION_12', 'TAG_CHRIS'] }, referenceInformation: {}, provenanceInformation: { history: [] }, fixityInformation: {}, accessRightInformation: {},
          },
          descriptiveInformation: {
            creationdate: '2017-12-01T08:33:13Z', dataSetType: 'chris_harvest_simple_model', label: 'Simple Model Sip 12', doubleValue: 9.969696969, longValue: 11009,
          },
        },
        type: 'Feature',
      },
      ingestDate: '2018-02-19T09:39:03.487Z',
      processing: 'DefaultProcessingChain',
      session: {
        id: 'session 12', lastActivationDate: '2018-02-19T14:06:45.045Z', sipsCount: 0, indexedSipsCount: 0, storedSipsCount: 0, generatedSipsCount: 0, errorSipsCount: 0,
      },
    },
    links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-ingest/sips/URN:SIP:DATA:project1:c001cb4d-2cf9-33cc-997b-0599c843dc9f:V1', template: { variables: { variables: [] }, baseUri: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-ingest/sips/URN:SIP:DATA:project1:c001cb4d-2cf9-33cc-997b-0599c843dc9f:V1' } }, { rel: 'delete', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-ingest/sips/URN:SIP:DATA:project1:c001cb4d-2cf9-33cc-997b-0599c843dc9f:V1', template: { variables: { variables: [] }, baseUri: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-ingest/sips/URN:SIP:DATA:project1:c001cb4d-2cf9-33cc-997b-0599c843dc9f:V1' } }],
  }],
  links: [{ rel: 'self', href: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-ingest/sips?page\u003d0\u0026size\u003d20', template: { variables: { variables: [] }, baseUri: 'http://vm-perf.cloud-espace.si.c-s.fr/api/v1/rs-ingest/sips?page\u003d0\u0026size\u003d20' } }],
}
