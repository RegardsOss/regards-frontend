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
import { DescriptionStateActions } from '../../src/model/DescriptionStateActions'
import { buildDescriptionStateReducer } from '../../src/model/DescriptionStateReducer'
import { DescriptionStateSelectors } from '../../src/model/DescriptionStateSelectors'
import { resolvedDataEntity, resolvedDatasetEntity } from '../dumps/resolved.dump'

const actions = new DescriptionStateActions('test.namespace')
const reduce = buildDescriptionStateReducer('test.namespace')
const selectors = new DescriptionStateSelectors(['test.cool', 'veryCool'])

const buildMockStore = (initState = reduce(undefined, {})) => ({
  'test.cool': {
    veryCool: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['test.cool'].veryCool, action))

/**
 * Test DescriptionStateSelectors
 * @author Raphaël Mechali
 */
describe('[Description] Test DescriptionStateSelectors', () => {
  it('Should select correctly navigation path', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(selectors.getDescriptionPath(fakeStore), [], '(0) Should return initial description path')
    assert.isTrue(selectors.isBrowsingTreeVisible(fakeStore), '(0) Should return initial browsing tree visible')
    // (1) select a description path
    fakeStore = mockReduce(fakeStore, actions.setDescriptionPath([resolvedDataEntity, resolvedDatasetEntity]))
    assert.deepEqual(selectors.getDescriptionPath(fakeStore), [resolvedDataEntity, resolvedDatasetEntity], '(1) Should return updated description path')
    assert.isTrue(selectors.isBrowsingTreeVisible(fakeStore), '(1) Should return unchanged browsing tree visible')
    // (2) change tree visibility
    fakeStore = mockReduce(fakeStore, actions.setBrowsingTreeVisible(false))
    assert.deepEqual(selectors.getDescriptionPath(fakeStore), [resolvedDataEntity, resolvedDatasetEntity], '(2) Should return unchanged description path')
    assert.isFalse(selectors.isBrowsingTreeVisible(fakeStore), '(2) Should return updated browsing tree visible')
    // (3) select a tree entry
    fakeStore = mockReduce(fakeStore, actions.setSelectedTreeEntry(0, { section: 'ANY', child: 99 }))
    assert.deepEqual(selectors.getDescriptionPath(fakeStore), [{
      ...resolvedDataEntity,
      entityWithTreeEntry: {
        ...resolvedDataEntity.entityWithTreeEntry,
        selectedTreeEntry: { section: 'ANY', child: 99 },
      },
    }, resolvedDatasetEntity], '(3) Should return updated description path')
    assert.isFalse(selectors.isBrowsingTreeVisible(fakeStore), '(3) Should return unchanged browsing tree visible')
  })
})
