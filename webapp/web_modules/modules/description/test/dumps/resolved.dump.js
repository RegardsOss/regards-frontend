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
import { getTypeRender } from '@regardsoss/attributes-common'
import { DamDomain } from '@regardsoss/domain'

/**
 * Dump holding entities as resolved by DescriptionEntityHelper
 * @author Raphaël Mechali
 */

export const resolvedDataEntity = {
  entity: {
    content: {
      providerId: 'Toulouse_France',
      entityType: 'DATA',
      label: 'Toulouse France',
      model: 'VALIDATION_DATA_MODEL_1',
      files: {
        QUICKLOOK_MD: [{
          dataType: 'QUICKLOOK_MD', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/bacb2b82421c116728e03566188e2ff3', mimeType: 'image/jpeg', imageWidth: 700, imageHeight: 584, online: true, checksum: 'bacb2b82421c116728e03566188e2ff3', digestAlgorithm: 'MD5', filesize: 348631, filename: 'Toulouse_France_node_full_image_2.jpg',
        }],
        QUICKLOOK_HD: [{
          dataType: 'QUICKLOOK_HD', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/7b9aa3a7288e5d3cca2623139617cc75', mimeType: 'image/jpeg', imageWidth: 1920, imageHeight: 1601, online: true, checksum: '7b9aa3a7288e5d3cca2623139617cc75', digestAlgorithm: 'MD5', filesize: 5844791, filename: 'Toulouse_France.jpg',
        }],
        QUICKLOOK_SD: [{
          dataType: 'QUICKLOOK_SD', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/8432df3b3928ba7601cda6d3254c3f02', mimeType: 'image/jpeg', imageWidth: 105, imageHeight: 88, online: true, checksum: '8432df3b3928ba7601cda6d3254c3f02', digestAlgorithm: 'MD5', filesize: 13453, filename: 'Toulouse_France_small.jpg',
        }],
        RAWDATA: [{
          dataType: 'RAWDATA', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/aef21e8c5d28de881f2d39f4b36f4199', mimeType: 'application/octet-stream', online: true, checksum: 'aef21e8c5d28de881f2d39f4b36f4199', digestAlgorithm: 'MD5', filesize: 100000, filename: 'simple_sip_01.dat',
        }],
      },
      tags: ['HELLO_REGARDS', 'DATASET_CHRIS_2', 'QUICKLOOKS', 'URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1'],
      id: 'URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1',
      geometry: null,
      normalizedGeometry: null,
      properties: {
        value_l1: 102, data_size: 100000, date: '2017-09-09T19:00:00Z', value_d1: 89.56, DATASET_VALIDATION_TYPE: 'chris_harvest_simple_model',
      },
      type: 'Feature',
      crs: 'WGS_84',
    },
    links: [{ rel: 'self', href: 'http://localhost:3000/api/v1/rs-catalog/engines/legacy/dataobjects/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1' }],
  },
  loading: false,
  modelRetrievalFailed: false,
  invalid: false,
  selectedTreeEntry: { section: 'PARAMETERS', child: null },
  displayModel: {
    thumbnail: null,
    attributesGroups: [{
      key: 'group.0',
      showTitle: false,
      title: { en: '', fr: '' },
      elements: [{
        key: 'element.0',
        label: { en: 'Label', fr: 'Label' },
        displayedAttributes: [{
          key: 'label',
          renderValue: 'Toulouse France',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
        }],
      }, {
        key: 'element.1',
        label: { en: 'Model', fr: 'Model' },
        displayedAttributes: [{
          key: 'model',
          renderValue: 'VALIDATION_DATA_MODEL_1',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
        }],
      }],
    }, {
      key: 'group.1',
      showTitle: true,
      title: { en: 'Internal references', fr: 'Références internes' },
      elements: [{
        key: 'element.0',
        label: { en: 'Internal identifier', fr: 'Identifiant interne' },
        displayedAttributes: [{
          key: 'id',
          renderValue: 'URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
        }],
      }, {
        key: 'element.1',
        label: { en: 'Provider identifier', fr: 'Identifiant fournisseur' },
        displayedAttributes: [{
          key: 'providerId',
          renderValue: 'Toulouse_France',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
        }],
      }],
    }, {
      key: 'group.3',
      showTitle: true,
      title: { en: 'Some values', fr: 'Quelques valeurs' },
      elements: [{
        key: 'element.0',
        label: { en: 'long value', fr: 'long value' },
        displayedAttributes: [{
          key: 'properties.value_l1',
          renderValue: 102,
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.LONG),
          renderUnit: 'unitless',
        }],
      }, {
        key: 'element.1',
        label: { en: 'double value', fr: 'double value' },
        displayedAttributes: [{
          key: 'properties.value_d1',
          renderValue: 89.56,
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.DOUBLE),
          renderUnit: 'unitless',
        }],
      }],
    }, {
      key: 'group.4',
      showTitle: true,
      title: { en: 'Dates', fr: 'Dates' },
      elements: [{
        key: 'element.1',
        label: { en: 'date UTC', fr: 'date UTC' },
        displayedAttributes: [{
          key: 'properties.date',
          renderValue: '2017-09-09T19:00:00Z',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
          renderUnit: 'unitless',
        }],
      }],
    }, {
      key: 'group.6',
      showTitle: true,
      title: { en: 'Everything', fr: 'Tout' },
      elements: [{
        key: 'element.0',
        label: {
          en: "fragment1 - activated, cloudCover, Code, Caracteristique, Collection, completionDate, Coordinates, Creation date, CYCLE_RANGE - Cycle maximum, CYCLE_RANGE - Cycle minimum, cycleNumber, data end date, data start date, fragment1 - data state, Dataset Access, Date de creation, TIME_PERIOD - Date et temps début, TIME_PERIOD - Date et temps fin, date UTC, description, dhusIngestDate, Domain, double value, File size, fileSize - File Size, Geo coverage, Geometry, Identifier, Index, Instr Contributors, Instr Descr URL, Instr Description, instrument, measurement - Instrument, Instrument Full Name, Instrument(s), Internal ID, isNrt, Keywords, Label, Label, Last update, GEO_CORDINATES - Latitude Nord, GEO_CORDINATES - Latitude Sud, long value, GEO_CORDINATES - Longitude Est, GEO_CORDINATES - Longitude Ouest, Mission, missionTakeId, Model, name attribute, Numero de version, orbitRange - Orbit max, orbitRange - Orbit min, orbitDirection, ORBIT_RANGE - Orbite maximum, ORBIT_RANGE - Orbite minimum, orbitNumber, organisationName, Parameter, parentIdentifier, PF Contributors, phase, platform, Platform Descr, Platform Descr URL, Platform End Date, Platform Full Name, Platform Start Date, Platform(s), polarisation, processingLevel, Product, productIdentifier, productType, Provider ID, published, quicklook, Radical, realtime, relativeOrbitNumber, measurement - Resolution, resourceChecksum, resourceSize, measurement - Sensor mode, Sensor type, sensorMode, Series, SIPAD DATASET Name, Spectrum Range, staf_node, date_interval - start date/end date, startDate, frag_string_array - string table, Sub-Domain, swath, Tags, Taille, taille de l'objet, title, Type, Type de jeu, updated, Valeurs (multiple), visible, weight",
          fr: "fragment1 - activated, cloudCover, Code, Caracteristique, Collection, completionDate, Coordinates, Creation date, CYCLE_RANGE - Cycle maximum, CYCLE_RANGE - Cycle minimum, cycleNumber, data end date, data start date, fragment1 - data state, Dataset Access, Date de creation, TIME_PERIOD - Date et temps début, TIME_PERIOD - Date et temps fin, date UTC, description, dhusIngestDate, Domain, double value, File size, fileSize - File Size, Geo coverage, Geometry, Identifier, Index, Instr Contributors, Instr Descr URL, Instr Description, instrument, measurement - Instrument, Instrument Full Name, Instrument(s), Internal ID, isNrt, Keywords, Label, Label, Last update, GEO_CORDINATES - Latitude Nord, GEO_CORDINATES - Latitude Sud, long value, GEO_CORDINATES - Longitude Est, GEO_CORDINATES - Longitude Ouest, Mission, missionTakeId, Model, name attribute, Numero de version, orbitRange - Orbit max, orbitRange - Orbit min, orbitDirection, ORBIT_RANGE - Orbite maximum, ORBIT_RANGE - Orbite minimum, orbitNumber, organisationName, Parameter, parentIdentifier, PF Contributors, phase, platform, Platform Descr, Platform Descr URL, Platform End Date, Platform Full Name, Platform Start Date, Platform(s), polarisation, processingLevel, Product, productIdentifier, productType, Provider ID, published, quicklook, Radical, realtime, relativeOrbitNumber, measurement - Resolution, resourceChecksum, resourceSize, measurement - Sensor mode, Sensor type, sensorMode, Series, SIPAD DATASET Name, Spectrum Range, staf_node, date_interval - start date/end date, startDate, frag_string_array - string table, Sub-Domain, swath, Tags, Taille, taille de l'objet, title, Type, Type de jeu, updated, Valeurs (multiple), visible, weight",
        },
        displayedAttributes: [{
          key: 'properties.date',
          renderValue: '2017-09-09T19:00:00Z',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
          renderUnit: 'unitless',
        }, {
          key: 'properties.description',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
          renderUnit: 'unitless',
        }, {
          key: 'properties.value_d1',
          renderValue: 89.56,
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.DOUBLE),
          renderUnit: 'unitless',
        }, {
          key: 'geometry',
          renderValue: null,
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
        }, {
          key: 'id',
          renderValue: 'URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
        }, {
          key: 'label',
          renderValue: 'Toulouse France',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
        }, {
          key: 'properties.value_l1',
          renderValue: 102,
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.LONG),
          renderUnit: 'unitless',
        }, {
          key: 'model',
          renderValue: 'VALIDATION_DATA_MODEL_1',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
        }, {
          key: 'providerId',
          renderValue: 'Toulouse_France',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
        }, {
          key: 'tags',
          renderValue: ['HELLO_REGARDS', 'DATASET_CHRIS_2', 'QUICKLOOKS', 'URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1'],
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING_ARRAY),
        }, {
          key: 'properties.data_size',
          renderValue: 100000,
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.LONG),
          renderUnit: 'kb',
        }, {
          key: 'properties.DATASET_VALIDATION_TYPE',
          renderValue: 'chris_harvest_simple_model',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
          renderUnit: 'unitless',
        }],
      }],
    }],
    descriptionFiles: [],
    quicklookFiles: [{

      label: 'main',
      primary: true,
      QUICKLOOK_SD: {
        dataType: 'QUICKLOOK_SD', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/8432df3b3928ba7601cda6d3254c3f02?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyYXBoYWVsLm1lY2hhbGlAYy1zLmZyIiwiYXVkIjpbInJzLWF1dGhlbnRpY2F0aW9uIl0sInJvbGUiOiJQUk9KRUNUX0FETUlOIiwidXNlcl9uYW1lIjoiZnIuY25lcy5yZWdhcmRzLmZyYW1ld29yay5zZWN1cml0eS51dGlscy5qd3QuVXNlckRldGFpbHNANTg5ZWM4NDUiLCJzY29wZSI6WyJwcm9qZWN0MSJdLCJleHAiOjE1Njk5MjI3MTYsImF1dGhvcml0aWVzIjpbIlBST0pFQ1RfQURNSU4iXSwianRpIjoiYjk5YjZhYzctM2FiMS00YjZlLWEwNzgtNDY4MTViZGU5MGExIiwidGVuYW50IjoicHJvamVjdDEiLCJlbWFpbCI6InJhcGhhZWwubWVjaGFsaUBjLXMuZnIiLCJjbGllbnRfaWQiOiJjbGllbnQifQ._Z8hPqJ_3md_y_1JEFqmvf4nKyfRvfSAKuOl6gaiwe4', mimeType: 'image/jpeg', imageWidth: 105, imageHeight: 88, online: true, checksum: '8432df3b3928ba7601cda6d3254c3f02', digestAlgorithm: 'MD5', filesize: 13453, filename: 'Toulouse_France_small.jpg',
      },
      QUICKLOOK_MD: {
        dataType: 'QUICKLOOK_MD', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/bacb2b82421c116728e03566188e2ff3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyYXBoYWVsLm1lY2hhbGlAYy1zLmZyIiwiYXVkIjpbInJzLWF1dGhlbnRpY2F0aW9uIl0sInJvbGUiOiJQUk9KRUNUX0FETUlOIiwidXNlcl9uYW1lIjoiZnIuY25lcy5yZWdhcmRzLmZyYW1ld29yay5zZWN1cml0eS51dGlscy5qd3QuVXNlckRldGFpbHNANTg5ZWM4NDUiLCJzY29wZSI6WyJwcm9qZWN0MSJdLCJleHAiOjE1Njk5MjI3MTYsImF1dGhvcml0aWVzIjpbIlBST0pFQ1RfQURNSU4iXSwianRpIjoiYjk5YjZhYzctM2FiMS00YjZlLWEwNzgtNDY4MTViZGU5MGExIiwidGVuYW50IjoicHJvamVjdDEiLCJlbWFpbCI6InJhcGhhZWwubWVjaGFsaUBjLXMuZnIiLCJjbGllbnRfaWQiOiJjbGllbnQifQ._Z8hPqJ_3md_y_1JEFqmvf4nKyfRvfSAKuOl6gaiwe4', mimeType: 'image/jpeg', imageWidth: 700, imageHeight: 584, online: true, checksum: 'bacb2b82421c116728e03566188e2ff3', digestAlgorithm: 'MD5', filesize: 348631, filename: 'Toulouse_France_node_full_image_2.jpg',
      },
      QUICKLOOK_HD: {
        dataType: 'QUICKLOOK_HD', reference: false, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/7b9aa3a7288e5d3cca2623139617cc75?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyYXBoYWVsLm1lY2hhbGlAYy1zLmZyIiwiYXVkIjpbInJzLWF1dGhlbnRpY2F0aW9uIl0sInJvbGUiOiJQUk9KRUNUX0FETUlOIiwidXNlcl9uYW1lIjoiZnIuY25lcy5yZWdhcmRzLmZyYW1ld29yay5zZWN1cml0eS51dGlscy5qd3QuVXNlckRldGFpbHNANTg5ZWM4NDUiLCJzY29wZSI6WyJwcm9qZWN0MSJdLCJleHAiOjE1Njk5MjI3MTYsImF1dGhvcml0aWVzIjpbIlBST0pFQ1RfQURNSU4iXSwianRpIjoiYjk5YjZhYzctM2FiMS00YjZlLWEwNzgtNDY4MTViZGU5MGExIiwidGVuYW50IjoicHJvamVjdDEiLCJlbWFpbCI6InJhcGhhZWwubWVjaGFsaUBjLXMuZnIiLCJjbGllbnRfaWQiOiJjbGllbnQifQ._Z8hPqJ_3md_y_1JEFqmvf4nKyfRvfSAKuOl6gaiwe4', mimeType: 'image/jpeg', imageWidth: 1920, imageHeight: 1601, online: true, checksum: '7b9aa3a7288e5d3cca2623139617cc75', digestAlgorithm: 'MD5', filesize: 5844791, filename: 'Toulouse_France.jpg',
      },
    }],
    otherFiles: [{ label: 'simple_sip_01.dat', available: true, uri: 'http://172.26.47.107//api/v1/rs-storage/aips/URN:AIP:DATA:project1:4ce00dd9-1861-3cbe-977b-70966226a434:V1/files/aef21e8c5d28de881f2d39f4b36f4199?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyYXBoYWVsLm1lY2hhbGlAYy1zLmZyIiwiYXVkIjpbInJzLWF1dGhlbnRpY2F0aW9uIl0sInJvbGUiOiJQUk9KRUNUX0FETUlOIiwidXNlcl9uYW1lIjoiZnIuY25lcy5yZWdhcmRzLmZyYW1ld29yay5zZWN1cml0eS51dGlscy5qd3QuVXNlckRldGFpbHNANTg5ZWM4NDUiLCJzY29wZSI6WyJwcm9qZWN0MSJdLCJleHAiOjE1Njk5MjI3MTYsImF1dGhvcml0aWVzIjpbIlBST0pFQ1RfQURNSU4iXSwianRpIjoiYjk5YjZhYzctM2FiMS00YjZlLWEwNzgtNDY4MTViZGU5MGExIiwidGVuYW50IjoicHJvamVjdDEiLCJlbWFpbCI6InJhcGhhZWwubWVjaGFsaUBjLXMuZnIiLCJjbGllbnRfaWQiOiJjbGllbnQifQ._Z8hPqJ_3md_y_1JEFqmvf4nKyfRvfSAKuOl6gaiwe4&origin=http://localhost:3333' }],
    wordTags: ['DATASET_CHRIS_2', 'HELLO_REGARDS', 'QUICKLOOKS'],
    couplingTags: ['coupling:ref1:Couple 1', 'coupling:ref1:Couple 2'],
    linkedEntities: [{
      content: {
        providerId: 'DATASET_CHRIS_2',
        entityType: 'DATASET',
        label: 'DATASET_CHRIS_2',
        model: 'VALIDATION_DATASET_MODEL_1',
        files: {
          DESCRIPTION: [{
            dataType: 'DESCRIPTION',
            reference: false,
            uri: 'http://172.26.47.107/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/files/0c82a0bf189e2db9ba5985dbd73bbc4a',
            mimeType: 'text/markdown',
            online: true,
            checksum: '0c82a0bf189e2db9ba5985dbd73bbc4a',
            digestAlgorithm: 'MD5',
            filesize: 11804,
            filename: 'dynamic-modules.md',
          }, {
            dataType: 'DESCRIPTION',
            reference: false,
            uri: 'http://172.26.47.107/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/files/c3d9eb51ab4f64433827a34caf57af5f',
            mimeType: 'application/pdf',
            online: true,
            checksum: 'c3d9eb51ab4f64433827a34caf57af5f',
            digestAlgorithm: 'MD5',
            filesize: 277486,
            filename: 'S1.pdf',
          }, {
            dataType: 'DESCRIPTION',
            reference: false,
            uri: 'http://172.26.47.107/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/files/734d7be763a369e8a8d939e1848238b6',
            mimeType: 'application/pdf',
            online: true,
            checksum: '734d7be763a369e8a8d939e1848238b6',
            digestAlgorithm: 'MD5',
            filesize: 776825,
            filename: '06-042_OpenGIS_Web_Map_Service_WMS_Implementation_Specification.pdf',
          }],
        },
        tags: ['URN:AIP:COLLECTION:project1:ab6e382f-c66a-454a-8861-1e5c027f151f:V1', 'URN:AIP:COLLECTION:project1:1b539b9e-f0c6-4578-b702-3fe492532600:V1', 'URN:AIP:DATA:project1:dc834647-5392-3521-8442-c4f681d9d7bd:V1'],
        id: 'URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1',
        properties: {
          name: 'DATASET_CHRIS_2', Missions: ['None'], TestDescFile1: 'http://172.26.47.107/public/MD-TEST.md', TestDescFile2: 'http://172.26.47.107/public/PDF-TEST.pdf', count: 12, values_l1_sum: 1350000,
        },
        type: 'Feature',
      },
      links: [{ rel: 'self', href: 'http://localhost:3000/api/v1/rs-catalog/engines/legacy/datasets/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1' }, { rel: 'dataobjects', href: 'http://localhost:3000/api/v1/rs-catalog/engines/legacy/datasets/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/dataobjects/search' }],
    }],
    linkedDocuments: [],
  },
}

export const resolvedDatasetEntity = {
  entity: {
    content: {
      providerId: 'DATASET_CHRIS_2',
      entityType: 'DATASET',
      label: 'DATASET_CHRIS_2',
      model: 'VALIDATION_DATASET_MODEL_1',
      files: {
        DESCRIPTION: [{
          dataType: 'DESCRIPTION', reference: false, uri: 'http://172.26.47.107/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/files/0c82a0bf189e2db9ba5985dbd73bbc4a', mimeType: 'text/markdown', online: true, checksum: '0c82a0bf189e2db9ba5985dbd73bbc4a', digestAlgorithm: 'MD5', filesize: 11804, filename: 'dynamic-modules.md',
        }, {
          dataType: 'DESCRIPTION', reference: false, uri: 'http://172.26.47.107/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/files/c3d9eb51ab4f64433827a34caf57af5f', mimeType: 'application/pdf', online: true, checksum: 'c3d9eb51ab4f64433827a34caf57af5f', digestAlgorithm: 'MD5', filesize: 277486, filename: 'S1.pdf',
        }, {
          dataType: 'DESCRIPTION', reference: false, uri: 'http://172.26.47.107/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/files/734d7be763a369e8a8d939e1848238b6', mimeType: 'application/pdf', online: true, checksum: '734d7be763a369e8a8d939e1848238b6', digestAlgorithm: 'MD5', filesize: 776825, filename: '06-042_OpenGIS_Web_Map_Service_WMS_Implementation_Specification.pdf',
        }],
      },
      tags: ['URN:AIP:COLLECTION:project1:ab6e382f-c66a-454a-8861-1e5c027f151f:V1', 'URN:AIP:COLLECTION:project1:1b539b9e-f0c6-4578-b702-3fe492532600:V1', 'URN:AIP:DATA:project1:dc834647-5392-3521-8442-c4f681d9d7bd:V1'],
      id: 'URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1',
      properties: {
        name: 'DATASET_CHRIS_2', Missions: ['None'], TestDescFile1: 'http://172.26.47.107/public/MD-TEST.md', TestDescFile2: 'http://172.26.47.107/public/PDF-TEST.pdf', count: 12, values_l1_sum: 1350000,
      },
      type: 'Feature',
    },
    links: [{ rel: 'self', href: 'http://localhost:3000/api/v1/rs-catalog/engines/legacy/datasets/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1' }, { rel: 'dataobjects', href: 'http://localhost:3000/api/v1/rs-catalog/engines/legacy/datasets/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/dataobjects/search' }],
  },
  loading: false,
  modelRetrievalFailed: false,
  invalid: false,
  selectedTreeEntry: { section: 'PARAMETERS', child: null },
  displayModel: {
    thumbnail: null,
    attributesGroups: [{
      key: 'group.0',
      showTitle: false,
      title: { en: 'Misc', fr: '' },
      elements: [{
        key: 'element.0',
        label: { en: 'Internal ID', fr: 'Internal ID' },
        displayedAttributes: [{
          key: 'id',
          renderValue: 'URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1',
          Renderer: getTypeRender(DamDomain.MODEL_ATTR_TYPES.STRING),
        }],
      }],
    }],
    descriptionFiles: [{
      label: 'http://172.26.47.107/public/MD-TEST.md',
      available: true,
      uri: 'http://172.26.47.107/public/MD-TEST.md',
    }, {
      label: 'http://172.26.47.107/public/PDF-TEST.pdf',
      available: true,
      uri: 'http://172.26.47.107/public/PDF-TEST.pdf',
    }, {
      label: 'dynamic-modules.md',
      available: true,
      uri: 'http://172.26.47.107/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/files/0c82a0bf189e2db9ba5985dbd73bbc4a?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyYXBoYWVsLm1lY2hhbGlAYy1zLmZyIiwiYXVkIjpbInJzLWF1dGhlbnRpY2F0aW9uIl0sInJvbGUiOiJQUk9KRUNUX0FETUlOIiwidXNlcl9uYW1lIjoiZnIuY25lcy5yZWdhcmRzLmZyYW1ld29yay5zZWN1cml0eS51dGlscy5qd3QuVXNlckRldGFpbHNANTg5ZWM4NDUiLCJzY29wZSI6WyJwcm9qZWN0MSJdLCJleHAiOjE1Njk5MjI3MTYsImF1dGhvcml0aWVzIjpbIlBST0pFQ1RfQURNSU4iXSwianRpIjoiYjk5YjZhYzctM2FiMS00YjZlLWEwNzgtNDY4MTViZGU5MGExIiwidGVuYW50IjoicHJvamVjdDEiLCJlbWFpbCI6InJhcGhhZWwubWVjaGFsaUBjLXMuZnIiLCJjbGllbnRfaWQiOiJjbGllbnQifQ._Z8hPqJ_3md_y_1JEFqmvf4nKyfRvfSAKuOl6gaiwe4&origin=http://localhost:3333',
    }, {
      label: 'S1.pdf',
      available: true,
      uri: 'http://172.26.47.107/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/files/c3d9eb51ab4f64433827a34caf57af5f?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyYXBoYWVsLm1lY2hhbGlAYy1zLmZyIiwiYXVkIjpbInJzLWF1dGhlbnRpY2F0aW9uIl0sInJvbGUiOiJQUk9KRUNUX0FETUlOIiwidXNlcl9uYW1lIjoiZnIuY25lcy5yZWdhcmRzLmZyYW1ld29yay5zZWN1cml0eS51dGlscy5qd3QuVXNlckRldGFpbHNANTg5ZWM4NDUiLCJzY29wZSI6WyJwcm9qZWN0MSJdLCJleHAiOjE1Njk5MjI3MTYsImF1dGhvcml0aWVzIjpbIlBST0pFQ1RfQURNSU4iXSwianRpIjoiYjk5YjZhYzctM2FiMS00YjZlLWEwNzgtNDY4MTViZGU5MGExIiwidGVuYW50IjoicHJvamVjdDEiLCJlbWFpbCI6InJhcGhhZWwubWVjaGFsaUBjLXMuZnIiLCJjbGllbnRfaWQiOiJjbGllbnQifQ._Z8hPqJ_3md_y_1JEFqmvf4nKyfRvfSAKuOl6gaiwe4&origin=http://localhost:3333',
    }, {
      label: '06-042_OpenGIS_Web_Map_Service_WMS_Implementation_Specification.pdf',
      available: true,
      uri: 'http://172.26.47.107/api/v1/rs-dam/entities/URN:AIP:DATASET:project1:f0219476-341d-4fa4-bbf8-7f856c774e87:V1/files/734d7be763a369e8a8d939e1848238b6?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyYXBoYWVsLm1lY2hhbGlAYy1zLmZyIiwiYXVkIjpbInJzLWF1dGhlbnRpY2F0aW9uIl0sInJvbGUiOiJQUk9KRUNUX0FETUlOIiwidXNlcl9uYW1lIjoiZnIuY25lcy5yZWdhcmRzLmZyYW1ld29yay5zZWN1cml0eS51dGlscy5qd3QuVXNlckRldGFpbHNANTg5ZWM4NDUiLCJzY29wZSI6WyJwcm9qZWN0MSJdLCJleHAiOjE1Njk5MjI3MTYsImF1dGhvcml0aWVzIjpbIlBST0pFQ1RfQURNSU4iXSwianRpIjoiYjk5YjZhYzctM2FiMS00YjZlLWEwNzgtNDY4MTViZGU5MGExIiwidGVuYW50IjoicHJvamVjdDEiLCJlbWFpbCI6InJhcGhhZWwubWVjaGFsaUBjLXMuZnIiLCJjbGllbnRfaWQiOiJjbGllbnQifQ._Z8hPqJ_3md_y_1JEFqmvf4nKyfRvfSAKuOl6gaiwe4&origin=http://localhost:3333',
    }],
    quicklookFiles: [],
    otherFiles: [],
    wordTags: [],
    couplingTags: [],
    linkedEntities: [{
      content: {
        providerId: 'Collection 2269', entityType: 'COLLECTION', label: 'Collection #2269', model: 'model_collection1', files: {}, tags: [], id: 'URN:AIP:COLLECTION:project1:1b539b9e-f0c6-4578-b702-3fe492532600:V1', properties: { coll_attr_1: '#plop' }, type: 'Feature',
      },
      links: [{ rel: 'self', href: 'http://localhost:3000/api/v1/rs-catalog/engines/legacy/collections/URN:AIP:COLLECTION:project1:1b539b9e-f0c6-4578-b702-3fe492532600:V1' }],
    }, {
      content: {
        providerId: 'Collection1-1',
        entityType: 'COLLECTION',
        label: 'Collection1-1',
        model: 'VALIDATION_COLLECTION_MODEL_2',
        files: {},
        tags: [],
        id: 'URN:AIP:COLLECTION:project1:ab6e382f-c66a-454a-8861-1e5c027f151f:V1',
        properties: {
          type: 'TYPE_2', INSTRUMENT: 'Piano', INSTRUMENT_TYPE: 'MONOPOLE', MEASUREMENT_TYPE: 'ION_COMPOSITION',
        },
        type: 'Feature',
      },
      links: [{ rel: 'self', href: 'http://localhost:3000/api/v1/rs-catalog/engines/legacy/collections/URN:AIP:COLLECTION:project1:ab6e382f-c66a-454a-8861-1e5c027f151f:V1' }],
    }],
    linkedDocuments: [{
      content: {
        providerId: '1', entityType: 'DATA', label: 'Data n°1', model: 'CRAWL_DATA_MODEL', files: {}, tags: ['URN:AIP:DATASET:project1:74a58e9c-4a23-44be-b75b-0577ba6d88ce:V1', 'URN:AIP:DATASET:project1:b496c034-6ca2-432e-9b00-0e5a310edd0c:V1', 'URN:AIP:DATASET:project1:5fe6c795-1d8d-4384-8cd9-4930aa127393:V1', 'URN:AIP:DATASET:project1:d2860dd1-8621-46b3-b18f-c9242e3d9c69:V1', 'URN:AIP:DATASET:project1:184bdbcc-4404-4e2e-bd82-632eb8ddbb0d:V1', 'URN:AIP:DATASET:project1:7695189e-91c2-4e4a-afbb-7da1e33f544a:V1'], id: 'URN:AIP:DATA:project1:dc834647-5392-3521-8442-c4f681d9d7bd:V1', geometry: null, properties: { IDENTIFIER: 1, CREATION_DATE: '2018-01-01T00:00:00Z', LABEL: 'Data n°1' }, type: 'Feature', crs: 'WGS_84',
      },
      links: [{ rel: 'self', href: 'http://localhost:3000/api/v1/rs-catalog/engines/legacy/dataobjects/URN:AIP:DATA:project1:dc834647-5392-3521-8442-c4f681d9d7bd:V1' }],
    }],
  },
}
