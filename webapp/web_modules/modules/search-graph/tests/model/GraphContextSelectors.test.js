/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TagTypes } from '@regardsoss/domain/catalog'
import graphContextActions from '../../src/model/graph/GraphContextActions'
import reduce, { REDUCER_PATH } from '../../src/model/graph/GraphContextReducers'
import graphContextSelectors from '../../src/model/graph/GraphContextSelectors'

const buildMockStore = (initState = reduce(undefined, {})) => ({
  'modules.search-graph': {
    [REDUCER_PATH]: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['modules.search-graph'][REDUCER_PATH], action))

describe('[Search Graph] Test graph context selectors', () => {
  it('Should select correctly selection path', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(graphContextSelectors.getSelectionPath(fakeStore), [], 'Should return initial selection')
    assert.isNotOk(graphContextSelectors.getSelectionForLevel(fakeStore, 0), 'No selection should be defined')
    // reduce selection and check it is correctly selected by level
    fakeStore = mockReduce(fakeStore, graphContextActions.selectEntity(0, { content: { ipId: 'ipId1', label: 'label', entityType: 'COLLECTION' } }))
    assert.deepEqual(graphContextSelectors.getSelectionPath(fakeStore), [{ ipId: 'ipId1', label: 'label', entityType: 'COLLECTION' }], 'Should return initial selection')
    assert.isOk(graphContextSelectors.getSelectionForLevel(fakeStore, 0), 'No selection should be defined')
    assert.isNotOk(graphContextSelectors.getSelectionForLevel(fakeStore, 1), 'No selection should be defined')
  })
  it('Should select collapsed state', () => {
    let fakeStore = buildMockStore()
    assert.isFalse(graphContextSelectors.isModuleCollapsed(fakeStore), [], 'Should select false for module collapsed')
    fakeStore = mockReduce(fakeStore, graphContextActions.setModuleCollapsed(true))
    assert.isTrue(graphContextSelectors.isModuleCollapsed(fakeStore), [], 'Should select true for module collapsed')
  })
  it('Should select dataset attributes visible state', () => {
    let fakeStore = buildMockStore()
    assert.isFalse(graphContextSelectors.areDatasetAttributesVisible(fakeStore), [], 'Should select false for module collapsed')
    fakeStore = mockReduce(fakeStore, graphContextActions.setDatasetAttributesVisible(true))
    assert.isTrue(graphContextSelectors.areDatasetAttributesVisible(fakeStore), [], 'Should select true for module collapsed')
  })
  it('Should select searchTag state', () => {
    let fakeStore = buildMockStore()
    assert.isNull(graphContextSelectors.getSearchTag(fakeStore), 'Should select null for initial search label')
    fakeStore = mockReduce(fakeStore, graphContextActions.setSearchTag({ type: TagTypes.WORD, label: 'w' }))
    assert.deepEqual(graphContextSelectors.getSearchTag(fakeStore), { type: TagTypes.WORD, label: 'w' }, 'Should select new value for search tag')
  })
})
