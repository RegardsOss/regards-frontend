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
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { ProcessingShapes } from '@regardsoss/shape'

import ProcessingMonitoringActions from '../../src/rs-processing/monitoring/ProcessingMonitoringActions'
import getProcessingMonitoringReducer from '../../src/rs-processing/monitoring/ProcessingMonitoringReducers'
import getProcessingMonitoringSelectors from '../../src/rs-processing/monitoring/ProcessingMonitoringSelectors'
import dump from './ProcessingMonitoring.dump'

/**
 * Test ProcessingMonitoringClient
 * @author Théo Lasserre
 */
const options = {
}

const actions = new ProcessingMonitoringActions('test/action')
const reducer = getProcessingMonitoringReducer('test/action')
const selectors = getProcessingMonitoringSelectors(['test', 'files'])

const entityTester = new ReduxEntityTester(actions, reducer, selectors, ProcessingShapes.ProcessingMonitoringList.isRequired, dump, options)

describe('[ADMIN CLIENT] Test client ProcessingMonitoring', () => {
  before(() => {
    entityTester.beforeAll()
  })
  after(() => {
    entityTester.afterAll()
  })
  it('should retrieve the list of items, reduce it, and store it on the store.', (done) => {
    entityTester.runTests(done)
  })
})
