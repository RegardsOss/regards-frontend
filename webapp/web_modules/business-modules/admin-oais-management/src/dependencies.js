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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { aipActions } from './clients/AIPClient'
import { aipUpdateActions } from './clients/AIPUpdateClient'
import { sipImportActions } from './clients/SIPImportClient'
import { requestSelectVersionModeActions } from './clients/RequestSelectVersionModeClient'
import { requestRetryActions } from './clients/RequestRetryClient'
import { requestDeleteActions } from './clients/RequestDeleteClient'
import { requestAbortActions } from './clients/RequestAbortClient'
import { aipDeleteActions } from './clients/AIPDeleteClient'
import { settingsActions } from './clients/SettingsClient'

/**
 * Module hateoas depencies
 * @author Simon MILHAU
 * @author Théo Lasserre
 */
/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const listDependencies = [
  // sipActions.getDependency(RequestVerbEnum.POST),
  aipActions.getDependency(RequestVerbEnum.POST),
]

const settingDependencies = [
  settingsActions.getDependency(RequestVerbEnum.GET),
]

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const addDependencies = [
  sipImportActions.getDependency(RequestVerbEnum.POST),
]

const deleteDependency = [
  aipDeleteActions.getDependency(RequestVerbEnum.POST),
]

const updateDependency = aipUpdateActions.getDependency(RequestVerbEnum.POST)

const selectVersionModeDependency = requestSelectVersionModeActions.getDependency(RequestVerbEnum.PUT)
const retryRequestDependency = requestRetryActions.getDependency(RequestVerbEnum.POST)
const deleteRequestDependency = requestDeleteActions.getDependency(RequestVerbEnum.POST)

const abortRequestsDependency = requestAbortActions.getDependency(RequestVerbEnum.PUT)

export default {
  listDependencies,
  addDependencies,
  updateDependency,
  deleteDependency,
  selectVersionModeDependency,
  retryRequestDependency,
  deleteRequestDependency,
  abortRequestsDependency,
  settingDependencies,
}
