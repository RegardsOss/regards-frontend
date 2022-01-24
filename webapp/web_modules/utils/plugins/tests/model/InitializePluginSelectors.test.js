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
import { assert } from 'chai'
import initializePluginActions from '../../src/model/InitializePluginActions'
import initializePluginReducer, { InitializePluginReducer } from '../../src/model/InitializePluginReducer'
import initializePluginSelectors from '../../src/model/InitializePluginSelectors'

const buildMockStore = (initState = InitializePluginReducer.DEFAULT_STATE) => ({
  common: {
    plugins: {
      initializedPlugins: initState,
    },
  },
})

const mockReduce = (store, action) => buildMockStore(initializePluginReducer(store.common.plugins.initializedPlugins, action))

/**
 * Test ModuleExpandedStateSelectors
 * @author Raphaël Mechali
 */
describe('[PLUGINS] Testing initializePluginSelectors', () => {
  it('should exists', () => {
    assert.isDefined(initializePluginSelectors)
  })
  it('should select correctly state as it changes changes', () => {
    let fakeStore = buildMockStore()

    fakeStore = mockReduce(fakeStore, initializePluginActions.markInitialized('A'))
    assert.isTrue(initializePluginSelectors.isInitialized(fakeStore, 'A'), 'A should be marked initialized')

    fakeStore = mockReduce(fakeStore, initializePluginActions.markInitialized('B'))
    assert.isTrue(initializePluginSelectors.isInitialized(fakeStore, 'B'), 'B should be marked initialized')

    fakeStore = mockReduce(fakeStore, initializePluginActions.markUnloaded('A'))
    assert.isFalse(initializePluginSelectors.isInitialized(fakeStore, 'A'), 'A', 'A should not be marked initialized any longer')
    assert.isTrue(initializePluginSelectors.isInitialized(fakeStore, 'B'), 'B', 'B should not have changed')
  })
})
