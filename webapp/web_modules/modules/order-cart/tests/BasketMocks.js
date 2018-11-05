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
 * Holds some baskets mocks for tests
 * @author Raphaël Mechali
 */

/**
 * A basket with two datasets and doubles:
 * - 3 selections in first dataset
 * - 1 selection in second dataset
 */
export const mockBasket1 = {
  id: 0,
  email: 'test@mail.com',
  datasetSelections: [
    {
      id: 0,
      datasetIpid: 'TEST-DATASET:URN:1',
      objectsCount: 2,
      filesCount: 0,
      filesSize: 27730,
      datasetLabel: 'Fake dataset 1',
      openSearchRequest: null,
      itemsSelections: [{
        id: 0,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T15:59:57.664Z',
        selectionRequest: {
          engineType: 'bing',
          datasetUrn: null,
          entityIdsToInclude: ['URN:DATA:COUCOU1'],
          entityIdsToExclude: null,
          searchParameters: {},
          selectionDate: '2017-09-08T15:59:57.664Z',
        },
      }, {
        id: 1,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:37.467Z',
        selectionRequest: {
          engineType: 'bing',
          datasetUrn: null,
          entityIdsToInclude: ['URN:DATA:COUCOU2'],
          entityIdsToExclude: null,
          searchParameters: {},
          selectionDate: '2017-09-08T16:00:37.467Z',
        },
      },
      {
        id: 2,
        objectsCount: 1,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:37.545Z',
        selectionRequest: {
          engineType: 'yahoo',
          datasetUrn: null,
          entityIdsToInclude: null,
          entityIdsToExclude: null,
          searchParameters: {
            q: '"tag:fake-tag-index18"',
          },
          selectionDate: '2017-09-08T16:00:37.545Z',
        },
      }],
    }, {
      id: 1,
      datasetIpid: 'TEST-DATASET:URN:2',
      objectsCount: 25,
      filesCount: 306,
      filesSize: 5048,
      datasetLabel: 'Fake dataset 2',
      openSearchRequest: null,
      itemsSelections: [{
        id: 3,
        objectsCount: 25,
        filesCount: 306,
        filesSize: 5048,
        date: '2017-09-08T16:00:02.625Z',
        selectionRequest: {
          engineType: 'qwoment',
          datasetUrn: 'TEST-DATASET:URN:2',
          entityIdsToInclude: null,
          entityIdsToExclude: null,
          searchParameters: {},
          selectionDate: '2017-09-08T16:00:02.625Z',
        },
      }],
    }],
}
/**
 * A basket with two datasets and no doubles:
 * - 1 selections in first dataset
 * - 2 selection in second dataset
 */
export const mockBasket2 = {
  id: 0,
  email: 'test@mail.com',
  datasetSelections: [
    {
      id: 0,
      datasetIpid: 'TEST-DATASET:URN:1',
      objectsCount: 5,
      filesCount: 0,
      filesSize: 27730,
      datasetLabel: 'Fake dataset 1',
      openSearchRequest: null,
      itemsSelections: [{
        id: 0,
        objectsCount: 5,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T15:59:57.664Z',
        selectionRequest: {
          engineType: 'quanard',
          datasetUrn: null,
          entityIdsToInclude: null,
          entityIdsToExclude: null,
          searchParameters: {
            q: '"tag:fake-tag-index0"',
          },
          selectionDate: '2017-09-08T15:59:57.664Z',
        },
      }],
    }, {
      id: 1,
      datasetIpid: 'TEST-DATASET:URN:2',
      objectsCount: 18,
      filesCount: 306,
      filesSize: 5048,
      datasetLabel: 'Fake dataset 2',
      openSearchRequest: null,
      itemsSelections: [{
        id: 3,
        objectsCount: 15,
        filesCount: 306,
        filesSize: 5048,
        date: '2017-09-08T16:00:02.625Z',
        selectionRequest: {
          engineType: 'quanard',
          datasetUrn: null,
          entityIdsToInclude: null,
          entityIdsToExclude: ['URN:DATA:COUCOU2'],
          searchParameters: {
            q: '"tag:fake-tag-index1"',
          },
          selectionDate: '2017-09-08T16:00:02.625Z',
        },
      }, {
        id: 2,
        objectsCount: 3,
        filesCount: 0,
        filesSize: 1440,
        date: '2017-09-08T16:00:37.545Z',
        selectionRequest: {
          engineType: 'quanard',
          datasetUrn: null,
          entityIdsToInclude: ['URN:DATA:COUCOU1', 'URN:DATA:COUCOU2', 'URN:DATA:COUCOU3'],
          entityIdsToExclude: null,
          searchParameters: {},
          selectionDate: '2017-09-08T16:00:37.545Z',
        },
      }],
    }],
}
/**
 * Empty basket
 */
export const emptyBasket = {
  id: 0,
  email: 'test@mail.com',
  datasetSelections: [],
}
