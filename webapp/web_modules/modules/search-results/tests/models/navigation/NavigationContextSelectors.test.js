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
import { TAG_TYPES_ENUM } from '@regardsoss/domain/catalog'
import { Tag } from '../../../src/models/navigation/Tag'
import navigationContextActions from '../../../src/models/navigation/NavigationContextActions'
import reduce, { DEFAULT_STATE } from '../../../src/models/navigation/NavigationContextReducer'
import navigationContextSelectors from '../../../src/models/navigation/NavigationContextSelectors'

const buildMockStore = (initState = DEFAULT_STATE) => ({
  'modules.search-results': {
    navigationContext: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['modules.search-results'].navigationContext, action))

describe('[Search Results] Test navigation context selectors', () => {
  it('Should select correctly the view object mode', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(navigationContextSelectors.getViewObjectType(fakeStore), DEFAULT_STATE.viewObjectType, 'Should return initial view object type')
    fakeStore = mockReduce(fakeStore, navigationContextActions.changeViewObjectType('kikou'))
    assert.deepEqual(navigationContextSelectors.getViewObjectType(fakeStore), 'kikou', 'Should return the updated view object type')
  })

  it('Should select correctly the levels', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(navigationContextSelectors.getLevels(fakeStore), DEFAULT_STATE.levels, 'Should return default levels')

    const tag = new Tag(TAG_TYPES_ENUM.WORD, 'Alibaba', 'Alibaba')
    fakeStore = mockReduce(fakeStore, navigationContextActions.addSearchTag(tag))
    assert.deepEqual(navigationContextSelectors.getLevels(fakeStore), [tag])
  })
  it('Should select correctly the initial levels', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(navigationContextSelectors.getLevels(fakeStore), DEFAULT_STATE.initialLevels, 'Should return default initial levels levels')
    const someInitialTags = [
      new Tag(TAG_TYPES_ENUM.COLLECTION, 'ma collec', 'URN:col1'),
      new Tag(TAG_TYPES_ENUM.DOCUMENT, 'mon doc', 'URN:doc1'),
    ]
    fakeStore = mockReduce(fakeStore, navigationContextActions.initialize('any', 'any', someInitialTags))
    assert.deepEqual(navigationContextSelectors.getInitialLevels(fakeStore), someInitialTags)
  })
})
