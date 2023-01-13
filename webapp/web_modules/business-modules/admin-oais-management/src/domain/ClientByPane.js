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

import { IngestDomain } from '@regardsoss/domain'
import { aipSelectors, aipActions } from '../clients/AIPClient'
import { aipTableActions, aipTableSelectors } from '../clients/AIPTableClient'
import { aipDeleteActions } from '../clients/AIPDeleteClient'
import { aipUpdateActions } from '../clients/AIPUpdateClient'
import { aipStorageSearchSelectors, aipStorageSearchActions } from '../clients/AIPStorageSearchClient'
import { requestSelectors, requestActions } from '../clients/RequestClient'
import { requestTableActions, requestTableSelectors } from '../clients/RequestTableClient'
import { requestDeleteActions } from '../clients/RequestDeleteClient'
import { requestRetryActions } from '../clients/RequestRetryClient'
import { requestAbortActions } from '../clients/RequestAbortClient'
import { requestSelectVersionModeActions } from '../clients/RequestSelectVersionModeClient'

export default {
  [IngestDomain.REQUEST_TYPES_ENUM.AIP]: {
    actions: aipActions,
    selectors: aipSelectors,
    tableActions: aipTableActions,
    tableSelectors: aipTableSelectors,
    deleteActions: aipDeleteActions,
    updateActions: aipUpdateActions,
    storageActions: aipStorageSearchActions,
    storageSelectors: aipStorageSearchSelectors,
  },
  [IngestDomain.REQUEST_TYPES_ENUM.REQUEST]: {
    actions: requestActions,
    selectors: requestSelectors,
    tableActions: requestTableActions,
    tableSelectors: requestTableSelectors,
    deleteActions: requestDeleteActions,
    retryActions: requestRetryActions,
    abortActions: requestAbortActions,
    selectVersionActions: requestSelectVersionModeActions,
  },
}
