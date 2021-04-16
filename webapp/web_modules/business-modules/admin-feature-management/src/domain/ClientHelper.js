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
import { creationRequestActions, creationRequestSelectors } from '../clients/CreationRequestsClient'
import { creationRequestsTableActions, creationRequestsTableSelectors } from '../clients/CreationRequestsTableClient'
import { deleteRequestActions, deleteRequestSelectors } from '../clients/DeleteRequestsClient'
import { deleteRequestsTableActions, deleteRequestsTableSelectors } from '../clients/DeleteRequestsTableClient'
import { extractionRequestActions, extractionRequestSelectors } from '../clients/ExtractionRequestsClient'
import { extractionRequestsTableActions, extractionRequestsTableSelectors } from '../clients/ExtractionRequestsTableClient'
import { notificationRequestActions, notificationRequestSelectors } from '../clients/NotificationRequestsClient'
import { notificationRequestsTableActions, notificationRequestsTableSelectors } from '../clients/NotificationRequestsTableClient'
import { updateRequestActions, updateRequestSelectors } from '../clients/UpdateRequestsClient'
import { updateRequestsTableActions, updateRequestsTableSelectors } from '../clients/UpdateRequestsTableClient'
import { PANE_TYPES_ENUM } from './PaneTypes'

export const getClient = (paneType) => {
  let actions
  let selectors
  let tableActions
  let tableSelectors
  switch (paneType) {
    case PANE_TYPES_ENUM.EXTRACTION:
      actions = extractionRequestActions
      selectors = extractionRequestSelectors
      tableActions = extractionRequestsTableActions
      tableSelectors = extractionRequestsTableSelectors
      break
    case PANE_TYPES_ENUM.CREATION:
      actions = creationRequestActions
      selectors = creationRequestSelectors
      tableActions = creationRequestsTableActions
      tableSelectors = creationRequestsTableSelectors
      break
    case PANE_TYPES_ENUM.UPDATE:
      actions = updateRequestActions
      selectors = updateRequestSelectors
      tableActions = updateRequestsTableActions
      tableSelectors = updateRequestsTableSelectors
      break
    case PANE_TYPES_ENUM.DELETE:
      actions = deleteRequestActions
      selectors = deleteRequestSelectors
      tableActions = deleteRequestsTableActions
      tableSelectors = deleteRequestsTableSelectors
      break
    case PANE_TYPES_ENUM.NOTIFICATION:
      actions = notificationRequestActions
      selectors = notificationRequestSelectors
      tableActions = notificationRequestsTableActions
      tableSelectors = notificationRequestsTableSelectors
      break
    default:
  }
  return {
    actions, selectors, tableActions, tableSelectors,
  }
}
