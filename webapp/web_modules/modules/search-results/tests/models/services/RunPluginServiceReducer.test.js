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
import datasetServicesActions from '../../../src/models/services/RunPluginServiceActions'
import reduce, { DEFAULT_STATE } from '../../../src/models/services/RunPluginServiceReducer'


describe('[Search Results] Test RunPluginServiceReducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), DEFAULT_STATE, 'Reducer should return an empty initial state')
  })

  it('should ignore non related actions', () => {
    assert.deepEqual(reduce(DEFAULT_STATE, {
      type: 'anythingElse',
    }), DEFAULT_STATE, 'Reducer should ignore non related actions')
  })

  it('should reduce run service action', () => {
    // 1 - without any optional information
    const currentState = DEFAULT_STATE
    const reduced = reduce(currentState, datasetServicesActions.runService({ id: 'service1' }))
    const expected = {
      ...DEFAULT_STATE,
      serviceRunModel: { id: 'service1' },
    }
    assert.deepEqual(reduced, expected, 'Run service action should be correctly reduced')
  })

  it('should reduce close service action', () => {
    // 1 - without any optional information
    const currentState = {
      ...DEFAULT_STATE,
      serviceRunModel: { id: 'service1' },
    }
    const reduced = reduce(currentState, datasetServicesActions.closeService())
    const expected = {
      ...DEFAULT_STATE,
      serviceRunModel: null,
    }
    assert.deepEqual(reduced, expected, 'Close service action should be correctly reduced')
  })
})
