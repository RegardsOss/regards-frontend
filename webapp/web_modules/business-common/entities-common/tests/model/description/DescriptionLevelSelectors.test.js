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
import DescriptionLevelActions from '../../../src/model/description/DescriptionLevelActions'
import getDescriptionLevelReducer from '../../../src/model/description/DescriptionLevelReducer'
import getDescriptionLevelSelectors from '../../../src/model/description/DescriptionLevelSelectors'

const descriptionLevelActions = new DescriptionLevelActions('test')
const reduce = getDescriptionLevelReducer('test')
const descriptionLevelSelectors = getDescriptionLevelSelectors(['modules.search-results', 'test'])
const buildMockStore = (initState = reduce(undefined, {})) => ({
  'modules.search-results': {
    test: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['modules.search-results'].test, action))

describe('[Entities Common] Test description level selectors', () => {
  it('Should select correctly description path', () => {
    let fakeStore = buildMockStore()
    assert.isNull(descriptionLevelSelectors.getCurrentDescriptionPath(fakeStore), 'No path should be defined')
    assert.isNull(descriptionLevelSelectors.getShownEntity(fakeStore), 'No path should be defined')

    fakeStore = mockReduce(fakeStore, descriptionLevelActions.show('test1'))
    assert.deepEqual(descriptionLevelSelectors.getCurrentDescriptionPath(fakeStore), ['test1'], 'Failed selecting root path')
    assert.equal(descriptionLevelSelectors.getShownEntity(fakeStore), 'test1', 'Failed selecting root path last entity')

    fakeStore = mockReduce(fakeStore, descriptionLevelActions.showRelatedEntity('test2'))
    fakeStore = mockReduce(fakeStore, descriptionLevelActions.showRelatedEntity('test3'))
    assert.deepEqual(descriptionLevelSelectors.getCurrentDescriptionPath(fakeStore), ['test1', 'test2', 'test3'], 'Failed selecting path with related entities')
    assert.equal(descriptionLevelSelectors.getShownEntity(fakeStore), 'test3', 'Failed selecting last path element with related entities')

    fakeStore = mockReduce(fakeStore, descriptionLevelActions.jumpToLevel(0))
    assert.deepEqual(descriptionLevelSelectors.getCurrentDescriptionPath(fakeStore), ['test1'], 'Failed selecting "jump to" path')
    assert.deepEqual(descriptionLevelSelectors.getCurrentDescriptionPath(fakeStore), ['test1'], 'Failed selecting "jump to" last path element')

    fakeStore = mockReduce(fakeStore, descriptionLevelActions.hide())
    assert.isNull(descriptionLevelSelectors.getCurrentDescriptionPath(fakeStore), 'Failed selecting hidden path')
    assert.isNull(descriptionLevelSelectors.getShownEntity(fakeStore), 'Failed selecting hidden path last element')
  })
})
