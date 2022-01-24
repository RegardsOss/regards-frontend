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
import { DataManagementShapes } from '@regardsoss/shape'
import ModelActions from '../../src/rs-dam/model/ModelActions'
import ModelReducer from '../../src/rs-dam/model/ModelReducer'
import ModelSelectors from '../../src/rs-dam/model/ModelSelectors'
import ModelDump from './Model.dump'

const modelActions = new ModelActions('test/action')
const modelReducer = ModelReducer('test/action')
const modelSelectors = ModelSelectors(['test', 'modules'])
const backendServerResultList = ModelDump

const options = {
  pathParams: { type: 'COLLECTION' },
}

const entityTester = new ReduxEntityTester(modelActions, modelReducer, modelSelectors, DataManagementShapes.ModelList.isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing client Testing model Modele', () => {
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
