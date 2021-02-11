/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import configureStore from '../src/configureStore'
import getReducerRegistry from '../src/ReducerRegistry'

describe('[STORE DATA MANAGEMENT] Testing configureStore and reducer registry', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(configureStore)
    assert.isFunction(configureStore)
  })

  it('should return a useable store', () => {
    // Initial store
    const rootReducer = {
      common(state = { item: {} }) {
        return state
      },
      portal(state = { item: {} }) {
        return state
      },
      admin(state = { item: {} }) {
        return state
      },
      user(state = { item: {} }) {
        return state
      },
    }
    const reducerRegistry = getReducerRegistry(rootReducer)
    const store = configureStore(reducerRegistry)
    assert.isFunction(store.dispatch)
    assert.isFunction(store.subscribe)
    assert.isFunction(store.getState)
    assert.isFunction(store.replaceReducer)
  })
})
