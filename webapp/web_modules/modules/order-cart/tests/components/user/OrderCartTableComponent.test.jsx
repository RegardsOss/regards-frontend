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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import { TreeTableRow } from '@regardsoss/components'
import { ProcessingClient, CommonClient } from '@regardsoss/client'
import { OrderCartTableComponent } from '../../../src/components/user/OrderCartTableComponent'
import styles from '../../../src/styles/styles'

import { emptyBasket, mockBasket1, mockBasket3 } from '../../BasketMocks'

const context = buildTestContext(styles)

/**
* Test OrderCartTableComponent
* @author Raphaël Mechali
* @author Théo Lasserre
*/
describe('[Order Cart] Testing OrderCartTableComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderCartTableComponent)
  })

  const testCases = [{
    caseLabel: 'when basket is empty (showing datasets)',
    props: {
      basket: undefined,
      quotaInfo: {},
      showDatasets: true,
    },
    expectedRows: [],
  }, {
    caseLabel: 'when basket is empty (hiding datasets)',
    props: {
      basket: emptyBasket,
      quotaInfo: {},
      showDatasets: false,
    },
    expectedRows: [],
  }, {
    caseLabel: 'when processing are applied (shwoing datasets)',
    props: {
      basket: mockBasket3,
      quotaInfo: {
        currentQuota: 250,
        maxQuota: -1,
        quotaState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
      },
      showDatasets: true,
    },
    expectedRows: [
      /* ds selection 1 */
      new TreeTableRow('dataset.selection.0', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetLabel: 'Fake dataset 1' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, effectiveObjectsCount: 2, totalObjectsCount: 3 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, capacity: OrderCartTableComponent.getStorageCapacity(27730) },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW,
          datasetSelectionId: 0,
          datasetSelectionIpId: 'TEST-DATASET:URN:1',
          process: {
            parameters: {
              param1: 'value1',
              param2: 'value2',
            },
            processBusinessId: '123-456-789-000',
          },
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 0 }], [
        /* dated selection 1.1 */
        new TreeTableRow('dated.item.selection.0-2017-09-08T15:59:57.664Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T15:59:57.664Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1440) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 1',
            date: '2017-09-08T15:59:57.664Z',
            selectionRequest: {
              engineType: 'bing',
              datasetUrn: null,
              entityIdsToInclude: ['URN:DATA:COUCOU1'],
              entityIdsToExclude: null,
              searchParameters: {},
              selectionDate: '2017-09-08T15:59:57.664Z',
            },
          },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T15:59:57.664Z' }]),
        /* dated selection 1.2 */
        new TreeTableRow('dated.item.selection.0-2017-09-08T16:00:37.467Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:37.467Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1804) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 1',
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
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T16:00:37.467Z' }]),
        /* dated selection 1.3 */
        new TreeTableRow('dated.item.selection.0-2017-09-08T16:00:37.545Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:37.545Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1280) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 1',
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
          },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T16:00:37.545Z' }]),
      ], true),
      new TreeTableRow('dataset.selection.1', [ // ds selection 2
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetLabel: 'Fake dataset 2' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, effectiveObjectsCount: 25, totalObjectsCount: 25 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, capacity: OrderCartTableComponent.getStorageCapacity(5048) },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 1, datasetSelectionIpId: 'TEST-DATASET:URN:2', process: null,
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 1 }], [
        /* dated selection 2.1 */
        new TreeTableRow('dated.item.selection.1-2017-09-08T16:00:02.625Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:02.625Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 25, totalObjectsCount: 25 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(5048) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 2',
            date: '2017-09-08T16:00:02.625Z',
            selectionRequest: {
              engineType: 'qwoment',
              datasetUrn: 'TEST-DATASET:URN:2',
              entityIdsToInclude: null,
              entityIdsToExclude: null,
              searchParameters: {},
              selectionDate: '2017-09-08T16:00:02.625Z',
            },
          },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 1, itemsSelectionDate: '2017-09-08T16:00:02.625Z' }]),
      ], true),
      /* Total row */
      new TreeTableRow('total.row', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW, effectiveObjectsCount: 27, totalObjectsCount: 28 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW, capacity: OrderCartTableComponent.getStorageCapacity(32778) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
      ]),
    ],
  }, {
    caseLabel: 'when hiding quota column (showing datasets)',
    props: {
      basket: mockBasket1,
      quotaInfo: {
        currentQuota: 250,
        maxQuota: -1,
        quotaState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
      },
      showDatasets: true,
    },
    expectedRows: [
      /* ds selection 1 */
      new TreeTableRow('dataset.selection.0', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetLabel: 'Fake dataset 1' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, effectiveObjectsCount: 2, totalObjectsCount: 3 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, capacity: OrderCartTableComponent.getStorageCapacity(27730) },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 0, datasetSelectionIpId: 'TEST-DATASET:URN:1', process: null,
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 0 }], [
        /* dated selection 1.1 */
        new TreeTableRow('dated.item.selection.0-2017-09-08T15:59:57.664Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T15:59:57.664Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1440) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 1',
            date: '2017-09-08T15:59:57.664Z',
            selectionRequest: {
              engineType: 'bing',
              datasetUrn: null,
              entityIdsToInclude: ['URN:DATA:COUCOU1'],
              entityIdsToExclude: null,
              searchParameters: {},
              selectionDate: '2017-09-08T15:59:57.664Z',
            },
          },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T15:59:57.664Z' }]),
        /* dated selection 1.2 */
        new TreeTableRow('dated.item.selection.0-2017-09-08T16:00:37.467Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:37.467Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1804) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 1',
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
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T16:00:37.467Z' }]),
        /* dated selection 1.3 */
        new TreeTableRow('dated.item.selection.0-2017-09-08T16:00:37.545Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:37.545Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1280) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 1',
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
          },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T16:00:37.545Z' }]),
      ], true),
      new TreeTableRow('dataset.selection.1', [ // ds selection 2
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetLabel: 'Fake dataset 2' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, effectiveObjectsCount: 25, totalObjectsCount: 25 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, capacity: OrderCartTableComponent.getStorageCapacity(5048) },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 1, datasetSelectionIpId: 'TEST-DATASET:URN:2', process: null,
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 1 }], [
        /* dated selection 2.1 */
        new TreeTableRow('dated.item.selection.1-2017-09-08T16:00:02.625Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:02.625Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 25, totalObjectsCount: 25 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(5048) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 2',
            date: '2017-09-08T16:00:02.625Z',
            selectionRequest: {
              engineType: 'qwoment',
              datasetUrn: 'TEST-DATASET:URN:2',
              entityIdsToInclude: null,
              entityIdsToExclude: null,
              searchParameters: {},
              selectionDate: '2017-09-08T16:00:02.625Z',
            },
          },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 1, itemsSelectionDate: '2017-09-08T16:00:02.625Z' }]),
      ], true),
      /* Total row */
      new TreeTableRow('total.row', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW, effectiveObjectsCount: 27, totalObjectsCount: 28 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW, capacity: OrderCartTableComponent.getStorageCapacity(32778) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
      ]),
    ],
  }, {
    caseLabel: 'when hiding quota column (hiding datasets)',
    props: {
      basket: mockBasket1,
      quotaInfo: {
        currentQuota: 250,
        maxQuota: -1,
        quotaState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
      },
      showDatasets: false,
    },
    expectedRows: [
      /* dated selection 1.1 */
      new TreeTableRow('dated.item.selection.0-2017-09-08T15:59:57.664Z', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T15:59:57.664Z' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1440) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
          datasetLabel: 'Fake dataset 1',
          date: '2017-09-08T15:59:57.664Z',
          selectionRequest: {
            engineType: 'bing',
            datasetUrn: null,
            entityIdsToInclude: ['URN:DATA:COUCOU1'],
            entityIdsToExclude: null,
            searchParameters: {},
            selectionDate: '2017-09-08T15:59:57.664Z',
          },
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T15:59:57.664Z' }]),
      /* dated selection 1.2 */
      new TreeTableRow('dated.item.selection.0-2017-09-08T16:00:37.467Z', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:37.467Z' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1804) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
          datasetLabel: 'Fake dataset 1',
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
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T16:00:37.467Z' }]),
      /* dated selection 1.3 */
      new TreeTableRow('dated.item.selection.0-2017-09-08T16:00:37.545Z', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:37.545Z' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1280) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
          datasetLabel: 'Fake dataset 1',
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
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T16:00:37.545Z' }]),
      /* dated selection 2.1 */
      new TreeTableRow('dated.item.selection.1-2017-09-08T16:00:02.625Z', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:02.625Z' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 25, totalObjectsCount: 25 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(5048) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
          datasetLabel: 'Fake dataset 2',
          date: '2017-09-08T16:00:02.625Z',
          selectionRequest: {
            engineType: 'qwoment',
            datasetUrn: 'TEST-DATASET:URN:2',
            entityIdsToInclude: null,
            entityIdsToExclude: null,
            searchParameters: {},
            selectionDate: '2017-09-08T16:00:02.625Z',
          },
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 1, itemsSelectionDate: '2017-09-08T16:00:02.625Z' }]),
      /* Total row */
      new TreeTableRow('total.row', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW, effectiveObjectsCount: 27, totalObjectsCount: 28 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW, capacity: OrderCartTableComponent.getStorageCapacity(32778) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
      ]),
    ],
  }, {
    caseLabel: 'when showing quota column (showing datasets)',
    props: {
      basket: mockBasket1,
      quotaInfo: {
        currentQuota: 505,
        maxQuota: 1000,
        quotaState: QUOTA_INFO_STATE_ENUM.IDLE,
        quotaWarningCount: 50,
      },
      showDatasets: true,
    },
    expectedRows: [
      /* ds selection 1 */
      new TreeTableRow('dataset.selection.0', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetLabel: 'Fake dataset 1' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, effectiveObjectsCount: 2, totalObjectsCount: 3 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, capacity: OrderCartTableComponent.getStorageCapacity(27730) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, quota: 3 },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 0, datasetSelectionIpId: 'TEST-DATASET:URN:1', process: null,
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 0 }], [
        /* dated selection 1.1 */
        new TreeTableRow('dated.item.selection.0-2017-09-08T15:59:57.664Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T15:59:57.664Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1440) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, quota: 2 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 1',
            date: '2017-09-08T15:59:57.664Z',
            selectionRequest: {
              engineType: 'bing',
              datasetUrn: null,
              entityIdsToInclude: ['URN:DATA:COUCOU1'],
              entityIdsToExclude: null,
              searchParameters: {},
              selectionDate: '2017-09-08T15:59:57.664Z',
            },
          },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T15:59:57.664Z' }]),
        /* dated selection 1.2 */
        new TreeTableRow('dated.item.selection.0-2017-09-08T16:00:37.467Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:37.467Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1804) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, quota: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 1',
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
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T16:00:37.467Z' }]),
        /* dated selection 1.3 */
        new TreeTableRow('dated.item.selection.0-2017-09-08T16:00:37.545Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:37.545Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1280) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, quota: 1 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 1',
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
          },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T16:00:37.545Z' }]),
      ], true),
      new TreeTableRow('dataset.selection.1', [ // ds selection 2
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetLabel: 'Fake dataset 2' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, effectiveObjectsCount: 25, totalObjectsCount: 25 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, capacity: OrderCartTableComponent.getStorageCapacity(5048) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, quota: 22 },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 1, datasetSelectionIpId: 'TEST-DATASET:URN:2', process: null,
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW, datasetSelectionId: 1 }], [
        /* dated selection 2.1 */
        new TreeTableRow('dated.item.selection.1-2017-09-08T16:00:02.625Z', [
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:02.625Z' },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 25, totalObjectsCount: 25 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(5048) },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, quota: 22 },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
          {
            type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
            datasetLabel: 'Fake dataset 2',
            date: '2017-09-08T16:00:02.625Z',
            selectionRequest: {
              engineType: 'qwoment',
              datasetUrn: 'TEST-DATASET:URN:2',
              entityIdsToInclude: null,
              entityIdsToExclude: null,
              searchParameters: {},
              selectionDate: '2017-09-08T16:00:02.625Z',
            },
          },
          { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 1, itemsSelectionDate: '2017-09-08T16:00:02.625Z' }]),
      ], true),
      /* Total row */
      new TreeTableRow('total.row', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW, effectiveObjectsCount: 27, totalObjectsCount: 28 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW, capacity: OrderCartTableComponent.getStorageCapacity(32778) },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW,
          totalQuota: 25,
          currentQuota: 505,
          maxQuota: 1000,
          quotaWarningCount: 50,
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
      ]),
    ],
  }, {
    caseLabel: 'when showing quota column (hiding datasets)',
    props: {
      basket: mockBasket1,
      quotaInfo: {
        currentQuota: 950,
        maxQuota: 1000,
        quotaState: QUOTA_INFO_STATE_ENUM.WARNING,
        quotaWarningCount: 100,
      },
      showDatasets: false,
    },
    expectedRows: [
      /* dated selection 1.1 */
      new TreeTableRow('dated.item.selection.0-2017-09-08T15:59:57.664Z', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T15:59:57.664Z' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1440) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, quota: 2 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
          datasetLabel: 'Fake dataset 1',
          date: '2017-09-08T15:59:57.664Z',
          selectionRequest: {
            engineType: 'bing',
            datasetUrn: null,
            entityIdsToInclude: ['URN:DATA:COUCOU1'],
            entityIdsToExclude: null,
            searchParameters: {},
            selectionDate: '2017-09-08T15:59:57.664Z',
          },
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T15:59:57.664Z' }]),
      /* dated selection 1.2 */
      new TreeTableRow('dated.item.selection.0-2017-09-08T16:00:37.467Z', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:37.467Z' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1804) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, quota: 1 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
          datasetLabel: 'Fake dataset 1',
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
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T16:00:37.467Z' }]),
      /* dated selection 1.3 */
      new TreeTableRow('dated.item.selection.0-2017-09-08T16:00:37.545Z', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:37.545Z' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 1, totalObjectsCount: 1 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(1280) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, quota: 1 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
          datasetLabel: 'Fake dataset 1',
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
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 0, itemsSelectionDate: '2017-09-08T16:00:37.545Z' }]),
      /* dated selection 2.1 */
      new TreeTableRow('dated.item.selection.1-2017-09-08T16:00:02.625Z', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, date: '2017-09-08T16:00:02.625Z' },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, effectiveObjectsCount: 25, totalObjectsCount: 25 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, capacity: OrderCartTableComponent.getStorageCapacity(5048) },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, quota: 22 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
          datasetLabel: 'Fake dataset 2',
          date: '2017-09-08T16:00:02.625Z',
          selectionRequest: {
            engineType: 'qwoment',
            datasetUrn: 'TEST-DATASET:URN:2',
            entityIdsToInclude: null,
            entityIdsToExclude: null,
            searchParameters: {},
            selectionDate: '2017-09-08T16:00:02.625Z',
          },
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW, datasetSelectionId: 1, itemsSelectionDate: '2017-09-08T16:00:02.625Z' }]),
      /* Total row */
      new TreeTableRow('total.row', [
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW, effectiveObjectsCount: 27, totalObjectsCount: 28 },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW, capacity: OrderCartTableComponent.getStorageCapacity(32778) },
        {
          type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW,
          totalQuota: 25,
          currentQuota: 950,
          maxQuota: 1000,
          quotaWarningCount: 100,
        },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
        { type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW },
      ]),
    ],
  }]

  testCases.forEach(({ caseLabel, props: { basket, quotaInfo, showDatasets }, expectedRows }) => it(`should render correctly ${caseLabel}`, () => {
    const props = {
      basket,
      refreshBasket: () => { },
      showDatasets,
      isFetching: false,
      isProcessingDependenciesExist: false,
      processingSelectors: ProcessingClient.getProcessingSelectors(),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(),
      linkProcessingDatasetActions: new ProcessingClient.LinkProcessingDatasetActions(),
      onShowDuplicatedMessage: () => { },
      quotaInfo: {
        currentQuota: 0,
        maxQuota: -1,
        quotaState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
        currentRate: 1,
        rateLimit: -1,
        rateState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
        downloadDisabled: false,
        inUserApp: true,
        quotaWarningCount: 100,
        ...quotaInfo,
      },
    }
    const enzymeWrapper = shallow(<OrderCartTableComponent {...props} />, { context })
    // table cannot be tested as is it in scroll area.
    // This test will check that generated rows match expectations, then that each cell is correctly rendered, in each row
    const wrapperInstance = enzymeWrapper.instance()

    // A - Check model is OK
    const modelRows = wrapperInstance.buildTableRows(enzymeWrapper.state().treeTableModel)
    function assertSameRows(actualRows = [], eRows = [], contextMsg = 'root model rows') {
      assert.lengthOf(actualRows, eRows.length, `Invalid rows count in ${contextMsg}`)
      actualRows.forEach((actualRow, index) => {
        const expectedRow = eRows[index]
        // 1 - Assert same key
        assert.equal(actualRow.key, expectedRow.key, `Invalid row key in ${contextMsg}`)
        // 2 - Assert cells
        assert.deepEqual(actualRow.rowCells, expectedRow.rowCells, `Invalid row cells in ${actualRow.key} (${contextMsg})`)
        // 3 - Assert expanded state
        assert.equal(actualRow.expanded, expectedRow.expanded, `Invalid expanded state in ${actualRow.key} (${contextMsg})`)
        // 4 - Assert same sub rows
        assertSameRows(actualRow.subRows, expectedRow.subRows, `${actualRow.key} sub rows`)
      })
    }
    assertSameRows(modelRows, expectedRows)

    // B - Check each row cell is correctly rendered (no error checking)
    function testTableCells(rows, level = 0) {
      rows.forEach((r) => {
        r.rowCells.forEach((cellValue, i) => {
          assert.doesNotThrow(() => wrapperInstance.buildTableCell(cellValue, level, i), `Cell at #${i} in row ${r.key} should render without error`)
        })
        testTableCells(r.subRows, level + 1)
      })
    }
    testTableCells(modelRows)
  }))
})
