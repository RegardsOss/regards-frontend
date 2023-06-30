/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Test InitializePluginReducer
 * @author Raphaël Mechali
 */
describe('[PLUGINS] Testing InitializePluginReducer', () => {
  it('should exists', () => {
    assert.isDefined(initializePluginReducer)
  })
  it('should initialize correctly', () => {
    const initState = initializePluginReducer(undefined, {})
    assert.deepEqual(initState, InitializePluginReducer.DEFAULT_STATE)
  })
  it('should ignore non related actions', () => {
    const nonRelatedAction = { type: 'IAmNotRelated' }
    const nextState = initializePluginReducer(undefined, nonRelatedAction)
    assert.deepEqual(nextState, InitializePluginReducer.DEFAULT_STATE)
  })
  it('should reduce correctly markInitialized and markUnloaded actions', () => {
    let nextState = initializePluginReducer(undefined, initializePluginActions.markInitialized('A'))
    assert.deepEqual(nextState, {
      A: true,
    })
    let currentState = nextState
    nextState = initializePluginReducer(currentState, initializePluginActions.markInitialized('B'))
    assert.deepEqual(nextState, {
      A: true,
      B: true,
    })
    currentState = nextState
    nextState = initializePluginReducer(currentState, initializePluginActions.markUnloaded('A'))
    assert.deepEqual(nextState, {
      A: false,
      B: true,
    })
  })
})
