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
        levels: [],
        contextTags: [{ label: 'idk' }],
      },
    }))
    assert.deepEqual(testSelectors.getResultsContext(fakeStore, 'module1'), {
      name: 'module1',
      criteria: {
        levels: [],
        contextTags: [{ label: 'idk' }],
      },
    })
    assert.isNotOk(testSelectors.getResultsContext(fakeStore, 'module2'))

    // create module 2 context
    fakeStore = mockReduce(fakeStore, testActions.setContext('module2', {
      name: 'module2',
      criteria: {
        levels: [{ label: 'idk2' }],
        contextTags: [],
      },
    }))
    assert.deepEqual(testSelectors.getResultsContext(fakeStore, 'module1'), {
      name: 'module1',
      criteria: {
        levels: [],
        contextTags: [{ label: 'idk' }],
      },
    })
    assert.deepEqual(testSelectors.getResultsContext(fakeStore, 'module2'), {
      name: 'module2',
      criteria: {
        levels: [{ label: 'idk2' }],
        contextTags: [],
      },
    })
    // Update module 1
    fakeStore = mockReduce(fakeStore, testActions.updateResultsContext('module1', {
      name: 'module1',
      props: 'why not?',
      criteria: {
        levels: [{ label: 'idk3' }, { label: 'idk4' }],
        contextTags: [{ label: 'idk5' }],
      },
    }))
    assert.deepEqual(testSelectors.getResultsContext(fakeStore, 'module1'), {
      name: 'module1',
      props: 'why not?',
      criteria: {
        levels: [{ label: 'idk3' }, { label: 'idk4' }],
        contextTags: [{ label: 'idk5' }],
      },
    })
    assert.deepEqual(testSelectors.getResultsContext(fakeStore, 'module2'), {
      name: 'module2',
      criteria: {
        levels: [{ label: 'idk2' }],
        contextTags: [],
      },
    })
  })
})
