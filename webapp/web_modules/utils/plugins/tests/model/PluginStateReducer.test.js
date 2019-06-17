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
import PluginStateActions from '../../src/model/PluginStateActions'
import { PluginStateReducer, getPluginStateReducer } from '../../src/model/PluginStateReducer'

const testActions = new PluginStateActions('TEST-REDUCER')
const testReducer = getPluginStateReducer('TEST-REDUCER')

/**
 * Test PluginStateReducer
 * @author Raphaël Mechali
 */
describe('[PLUGINS] Testing PluginStateReducer', () => {
  it('should exists', () => {
    assert.isDefined(PluginStateReducer)
    assert.isDefined(getPluginStateReducer)
  })
  it('should initialize correctly', () => {
    const initState = testReducer(undefined, {})
    assert.deepEqual(initState, PluginStateReducer.DEFAULT_STATE)
  })
  it('should ignore non related actions', () => {
    const nonRelatedAction = { type: 'IAmNotRelated' }
    const nextState = testReducer(undefined, nonRelatedAction)
    assert.deepEqual(nextState, PluginStateReducer.DEFAULT_STATE)
  })
  it('should reduce correctly publishAllStates action', () => {
    let nextState = testReducer(undefined, testActions.publishAllStates({
      p1: { state: { a: 'a', b: 'b' }, requestParameters: { q: 'query1' } },
      p2: { state: { c: 'c', d: 'd' }, requestParameters: { q: 'query2' } },
    }))
    assert.deepEqual(nextState, {
      p1: { state: { a: 'a', b: 'b' }, requestParameters: { q: 'query1' } },
      p2: { state: { c: 'c', d: 'd' }, requestParameters: { q: 'query2' } },
    })
    const currentState = nextState
    nextState = testReducer(currentState, testActions.publishAllStates({
      p3: { state: { a: 'a', b: 'b' }, requestParameters: { q: 'query1' } },
      p4: { state: { c: 'c', d: 'd' }, requestParameters: { q: 'query2' } },
    }))
    assert.deepEqual(nextState, {
      // expected p1 / p2 to be removed
      p3: { state: { a: 'a', b: 'b' }, requestParameters: { q: 'query1' } },
      p4: { state: { c: 'c', d: 'd' }, requestParameters: { q: 'query2' } },
    })
  })
  it('should reduce correctly publishState action', () => {
    let nextState = testReducer(undefined, testActions.publishState('inst1', { a: 'a', b: 'b' }, { q: 'queryInst1' }))
    assert.deepEqual(nextState, {
      inst1: {
        state: { a: 'a', b: 'b' },
        requestParameters: { q: 'queryInst1' },
      },
    })
    const currentState = nextState
    nextState = testReducer(currentState, testActions.publishState('inst2', { c: 8 }, { q: 'queryInst2' }))
    assert.deepEqual(nextState, {
      inst1: {
        state: { a: 'a', b: 'b' },
        requestParameters: { q: 'queryInst1' },
      },
      inst2: {
        state: { c: 8 },
        requestParameters: { q: 'queryInst2' },
      },
    })
  })
  it('should reduce correctly clear all action', () => {
    const actual = testReducer({
      inst1: {
        state: { a: 'a', b: 'b' },
        requestParameters: { q: 'queryInst1' },
      },
      inst2: {
        state: { c: 8 },
        requestParameters: { q: 'queryInst2' },
      },
    }, testActions.clearAllStates())
    assert.deepEqual(actual, {}, 'Clear all should remove all plugins state')
  })
})
