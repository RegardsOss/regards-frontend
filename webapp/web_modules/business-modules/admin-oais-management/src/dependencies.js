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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { aipActions } from './clients/AIPClient'
import { aipUpdateActions } from './clients/AIPUpdateClient'
import { sipImportActions } from './clients/SIPImportClient'

/**
 * Module hateoas depencies
 * @author Simon MILHAU
 */
/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const listDependencies = [
  // sipActions.getDependency(RequestVerbEnum.POST),
  aipActions.getDependency(RequestVerbEnum.POST),
]

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const addDependencies = [
  sipImportActions.getDependency(RequestVerbEnum.POST),
]

const deleteDependency = [
  aipActions.getDependency(RequestVerbEnum.DELETE),
]

const updateDependency = aipUpdateActions.getDependency(RequestVerbEnum.POST)

export default {
  listDependencies,
  addDependencies,
  updateDependency,
  deleteDependency,
}
