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
import { assert } from 'chai'
import PluginStateActions from '../../src/model/PluginStateActions'
import { getPluginStateReducer, PluginStateReducer } from '../../src/model/PluginStateReducer'
import { getPluginStateSelectors, PluginStateSelectors } from '../../src/model/PluginStateSelectors'

const actions = new PluginStateActions('TEST_NAMESPACE')
const reducer = getPluginStateReducer('TEST_NAMESPACE')
const selectors = getPluginStateSelectors(['test', 'plugins'])
const buildMockStore = (initState = PluginStateReducer.DEFAULT_STATE) => ({
  test: {
    plugins: initState,
  },
})
const mockReduce = (store, action) => buildMockStore(reducer(store.test.plugins, action))

/**
 * Test ModuleExpandedStateSelectors
 * @author Raphaël Mechali
 */
describe('[PLUGINS] Testing initializePluginSelectors', () => {
  it('should exists', () => {
    assert.isDefined(getPluginStateSelectors)
    assert.isDefined(PluginStateSelectors)
  })
  it('should select correctly state as it changes changes', () => {
    let fakeStore = buildMockStore()

    fakeStore = mockReduce(fakeStore, actions.publishState('plugin1', { name: 'test1' }, { q: 'query1' }))
    assert.deepEqual(selectors.getCriterionData(fakeStore, 'plugin1'), { state: { name: 'test1' }, requestParameters: { q: 'query1' } }, 'A - Plugin 1 state should be retrieved')
    assert.isNotOk(selectors.getCriterionData(fakeStore, 'plugin2'), 'A - Plugin 2 state should not be retrieved')

    fakeStore = mockReduce(fakeStore, actions.publishState('plugin2', { anything: 2 }, { q: 'query2' }))
    assert.deepEqual(selectors.getCriterionData(fakeStore, 'plugin1'), { state: { name: 'test1' }, requestParameters: { q: 'query1' } }, 'B - Plugin 1 state should be retrieved')
    assert.deepEqual(selectors.getCriterionData(fakeStore, 'plugin2'), { state: { anything: 2 }, requestParameters: { q: 'query2' } }, 'B - Plugin 2 state should be retrieved')

    fakeStore = mockReduce(fakeStore, actions.publishAllStates({
      plugin2: { state: { name: 'plugin2' }, requestParameters: { q: 'query2' } },
      plugin3: { state: { name: 'plugin3' }, requestParameters: { q: 'query3' } },
    }))
    assert.isNotOk(selectors.getCriterionData(fakeStore, 'plugin1'), 'C - Plugin 1 state should have been removed')
    assert.deepEqual(selectors.getCriterionData(fakeStore, 'plugin2'), { state: { name: 'plugin2' }, requestParameters: { q: 'query2' } }, 'C - Plugin 2 should be updated')
    assert.deepEqual(selectors.getCriterionData(fakeStore, 'plugin3'), { state: { name: 'plugin3' }, requestParameters: { q: 'query3' } }, 'C - Plugin 3 should be created')

    fakeStore = mockReduce(fakeStore, actions.clearAllStates())
    assert.isNotOk(selectors.getCriterionData(fakeStore, 'plugin1'), 'D - Plugin 1 state should not be retrieved')
    assert.isNotOk(selectors.getCriterionData(fakeStore, 'plugin2'), 'D - Plugin 2 state should not be retrieved')
    assert.isNotOk(selectors.getCriterionData(fakeStore, 'plugin3'), 'D - Plugin 3 state should not be retrieved')
  })
})
