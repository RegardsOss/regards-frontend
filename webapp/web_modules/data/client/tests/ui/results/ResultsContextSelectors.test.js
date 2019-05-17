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
import ResultsContextActions from '../../../src/ui/results/ResultsContextActions'
import getResultsContextReducer, { ResultsContextReducer } from '../../../src/ui/results/ResultsContextReducer'
import getResultsContextSelectors from '../../../src/ui/results/ResultsContextSelectors'

const testActions = new ResultsContextActions('tests')
const testReduce = getResultsContextReducer('tests')
const testSelectors = getResultsContextSelectors(['test', 'resultsContext'])


const buildMockStore = (initState = ResultsContextReducer.DEFAULT_STATE) => ({
  test: {
    resultsContext: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(testReduce(store.test.resultsContext, action))

/**
 * Test ModuleExpandedStateSelectors
 * @author Raphaël Mechali
 */
describe('[Client] Testing ResultsContextSelectors', () => {
  it('should exists', () => {
    assert.isDefined(getResultsContextSelectors)
  })
  it('should select correctly state as it changes changes', () => {
    // create module 1 context
    let fakeStore = mockReduce(buildMockStore(), testActions.setContext('module1', {
      name: 'module1',
      criteria: {
        tags: [],
        contextTags: [{ label: 'idk' }],
      },
    }))
    assert.deepEqual(testSelectors.getResultsContext(fakeStore, 'module1'), {
      name: 'module1',
      criteria: {
        tags: [],
        contextTags: [{ label: 'idk' }],
      },
    })
    assert.deepEqual(testSelectors.getContextTags(fakeStore, 'module1'), [{ label: 'idk' }])
    assert.deepEqual(testSelectors.getTags(fakeStore, 'module1'), [])
    assert.isNotOk(testSelectors.getResultsContext(fakeStore, 'module2'))

    // create module 2 context
    fakeStore = mockReduce(fakeStore, testActions.setContext('module2', {
      name: 'module2',
      criteria: {
        tags: [{ label: 'idk2' }],
        contextTags: [],
      },
    }))
    assert.deepEqual(testSelectors.getResultsContext(fakeStore, 'module1'), {
      name: 'module1',
      criteria: {
        tags: [],
        contextTags: [{ label: 'idk' }],
      },
    })
    assert.deepEqual(testSelectors.getResultsContext(fakeStore, 'module2'), {
      name: 'module2',
      criteria: {
        tags: [{ label: 'idk2' }],
        contextTags: [],
      },
    })
    assert.deepEqual(testSelectors.getContextTags(fakeStore, 'module1'), [{ label: 'idk' }])
    assert.deepEqual(testSelectors.getTags(fakeStore, 'module1'), [])
    assert.deepEqual(testSelectors.getContextTags(fakeStore, 'module2'), [])
    assert.deepEqual(testSelectors.getTags(fakeStore, 'module2'), [{ label: 'idk2' }])
    // Update module 1
    fakeStore = mockReduce(fakeStore, testActions.updateResultsContext('module1', {
      name: 'module1',
      props: 'why not?',
      criteria: {
        tags: [{ label: 'idk3' }, { label: 'idk4' }],
        contextTags: [{ label: 'idk5' }],
      },
    }))
    assert.deepEqual(testSelectors.getResultsContext(fakeStore, 'module1'), {
      name: 'module1',
      props: 'why not?',
      criteria: {
        tags: [{ label: 'idk3' }, { label: 'idk4' }],
        contextTags: [{ label: 'idk5' }],
      },
    })
    assert.deepEqual(testSelectors.getResultsContext(fakeStore, 'module2'), {
      name: 'module2',
      criteria: {
        tags: [{ label: 'idk2' }],
        contextTags: [],
      },
    })
  })
})