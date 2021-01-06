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
import isNull from 'lodash/isNull'
import { assert } from 'chai'
import RunPluginServiceActions from '../../../src/ui/results/RunPluginServiceActions'
import getReducer, { RunPluginServiceReducer } from '../../../src/ui/results/RunPluginServiceReducer'
import getSelectors from '../../../src/ui/results/RunPluginServiceSelectors'

const actions = new RunPluginServiceActions('test-namespace')
const reduce = getReducer('test-namespace')
const selectors = getSelectors(['test', 'runPluginService'])

const buildMockStore = (initState = RunPluginServiceReducer.DEFAULT_STATE) => ({
  test: {
    runPluginService: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store.test.runPluginService, action))

describe('[Search Results] Test RunPluginServiceSelectors', () => {
  it('Should select the running service and its target', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(selectors.getServiceRunModel(fakeStore), RunPluginServiceReducer.DEFAULT_STATE.serviceRunModel, 'Should return default service')

    fakeStore = mockReduce(fakeStore, actions.runService({ id: 'fakeService' }))
    assert.deepEqual(selectors.getServiceRunModel(fakeStore), { id: 'fakeService' }, RunPluginServiceReducer.DEFAULT_STATE.serviceRunModel, 'Should return running service')

    fakeStore = mockReduce(fakeStore, actions.closeService())
    assert.isTrue(isNull(selectors.getServiceRunModel(fakeStore)), 'Should not return running service after closing service')
  })
})
