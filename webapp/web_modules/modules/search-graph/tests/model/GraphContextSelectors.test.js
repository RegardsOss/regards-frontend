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
import graphContextActions from '../../src/model/graph/GraphContextActions'
import reduce, { REDUCER_PATH } from '../../src/model/graph/GraphContextReducers'
import graphContextSelectors from '../../src/model/graph/GraphContextSelectors'

const buildMockStore = (initState = reduce(undefined, {})) => ({
  'modules.search-graph': {
    [REDUCER_PATH]: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['modules.search-graph'][REDUCER_PATH], action))

describe('[Search Graph] Test GraphContextSelectors', () => {
  it('Should select correctly selection path', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(graphContextSelectors.getSelectionPath(fakeStore), [], 'Should return initial selection')
    assert.isNotOk(graphContextSelectors.getSelectionForLevel(fakeStore, 0), 'No selection should be defined')
    // reduce selection and check it is correctly selected by level
    fakeStore = mockReduce(fakeStore, graphContextActions.selectEntity(0, { content: { id: 'id1', label: 'label', entityType: 'COLLECTION' } }))
    assert.deepEqual(graphContextSelectors.getSelectionPath(fakeStore), [{ id: 'id1', label: 'label', entityType: 'COLLECTION' }], 'Should return initial selection')
    assert.isOk(graphContextSelectors.getSelectionForLevel(fakeStore, 0), 'No selection should be defined')
    assert.isNotOk(graphContextSelectors.getSelectionForLevel(fakeStore, 1), 'No selection should be defined')
  })
  it('Should select dataset attributes visible state', () => {
    let fakeStore = buildMockStore()
    assert.isFalse(graphContextSelectors.areDatasetAttributesVisible(fakeStore), [], 'Should select false for dataset attributes visible')
    fakeStore = mockReduce(fakeStore, graphContextActions.setDatasetAttributesVisible(true))
    assert.isTrue(graphContextSelectors.areDatasetAttributesVisible(fakeStore), [], 'Should select true for dataset attributes visible')
  })
})
