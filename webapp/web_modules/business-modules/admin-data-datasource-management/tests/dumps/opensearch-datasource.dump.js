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
 * OpenSearch datasource dump for tests
 * @author Raphaël Mechali
 */
export const datasourceDump = {
  content: {
    associatedDatasets: 1,
    id: 1,
    pluginId: 'webservice-datasource',
    label: 'Test Theia 1',
    version: '0.4.0',
    priorityOrder: 0,
    active: true,
    pluginClassName: 'fr.cnes.regards.modules.dam.plugins.datasources.webservice.WebserviceDatasourcePlugin',
    interfaceNames: ['fr.cnes.regards.modules.dam.domain.datasources.plugins.IDataSourcePlugin'],
    parameters: [{
      id: 102,
      name: 'refreshRate',
      value: 55555,
      dynamic: false,
      dynamicsValues: [],
      onlyDynamic: false,
    }, {
      id: 103,
      name: 'webserviceConfiguration',
      value: {
        opensearchDescriptorURL: 'https://theia.cnes.fr/atdistrib/resto2/api/collections/LANDSAT/describe.xml',
        webserviceURL: 'https://theia.cnes.fr/atdistrib/resto2/api/collections/LANDSAT/search.json',
        pageIndexParam: 'page',
        pageSizeParam: 'maxRecords',
        startPageIndex: 1,
        lastUpdateParam: 'updated',
        pagesSize: 500,
        webserviceParameters: { lang: 'en' },
      },
      dynamic: false,
      dynamicsValues: [],
      onlyDynamic: false,
    }, {
      id: 104,
      name: 'conversionConfiguration',
      value: {
        attributeToJSonField: {
          label: 'productIdentifier', providerId: 'productIdentifier', 'properties.start_date': 'startDate', 'properties.end_date': 'completionDate', 'properties.product': 'productType', 'properties.coordinates': 'centroid.coordinates', 'properties.mission': 'collection', 'properties.measurement.instrument': 'instrument', 'properties.measurement.resolution': 'resolution', 'properties.measurement.sensor_mode': 'sensorMode',
        },
        modelName: 'theia_model',
        totalResultsField: 'totalResults',
        pageSizeField: 'itemsPerPage',
        quicklookURLPath: 'quicklook',
        thumbnailURLPath: 'thumbnail',
        rawDataURLPath: 'services.download.url',
      },
      dynamic: false,
      dynamicsValues: [],
      onlyDynamic: false,
    }],
  },
  links: [{ rel: 'self', href: 'http://vm-pre-prod.cloud-espace.si.c-s.fr:9030/api/v1/rs-dam/datasources/102' }, { rel: 'update', href: 'http://vm-pre-prod.cloud-espace.si.c-s.fr:9030/api/v1/rs-dam/datasources/102' }, { rel: 'list', href: 'http://vm-pre-prod.cloud-espace.si.c-s.fr:9030/api/v1/rs-dam/datasources' }],
}
