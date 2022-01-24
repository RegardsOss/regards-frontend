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
import { CommonShapes } from '@regardsoss/shape'
import PluginMetaDataActions from '../../src/rs-common/pluginMetaData/PluginMetaDataActions'
import PluginMetaDataReducer from '../../src/rs-common/pluginMetaData/PluginMetaDataReducer'
import PluginMetaDataSelectors from '../../src/rs-common/pluginMetaData/PluginMetaDataSelectors'
import PluginMetaDataDump from './PluginMetaData.dump'

const backendServerResultList = PluginMetaDataDump
const options = {
  pathParams: { microserviceName: 'rs-dam' },
}

const pluginMetaDataActions = new PluginMetaDataActions('test/action')
const pluginMetaDataReducer = PluginMetaDataReducer('test/action')
const pluginMetaDataSelectors = PluginMetaDataSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(pluginMetaDataActions, pluginMetaDataReducer, pluginMetaDataSelectors, CommonShapes.PluginMetaDataList.isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing model PluginMetaData', () => {
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
