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
import { DescriptionStateActions } from '../../src/model/DescriptionStateActions'
import { DescriptionStateReducer, buildDescriptionStateReducer } from '../../src/model/DescriptionStateReducer'
import { resolvedDataEntity, resolvedDatasetEntity } from '../dumps/resolved.dump'

const actions = new DescriptionStateActions('test.namespace')
const reduce = buildDescriptionStateReducer('test.namespace')

/**
 * Test DescriptionStateReducer
 * @author Raphaël Mechali
 */
describe('[Description] Test DescriptionStateReducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), DescriptionStateReducer.DEFAULT_STATE, 'Reducer should return an initial state')
  })

  it('should ignore non realted actions', () => {
    assert.deepEqual(reduce(DescriptionStateReducer.DEFAULT_STATE, {
      type: 'anythingElse',
    }), DescriptionStateReducer.DEFAULT_STATE, 'Reducer should ignore non related actions')
  })

  it('should reduce successive set description path operations correctly', () => {
    // 1 - select a description path
    let currentState = DescriptionStateReducer.DEFAULT_STATE
    let reduced = reduce(currentState, actions.setDescriptionPath([resolvedDataEntity]))
    let nextState = {
      descriptionPath: [resolvedDataEntity],
      browsingTreeVisible: true,
    }
    assert.deepEqual(reduced, nextState, 'First description path should be correctly reduced')
    // 2 - select another description path
    currentState = reduced
    reduced = reduce(currentState, actions.setDescriptionPath([resolvedDatasetEntity, resolvedDataEntity]))
    nextState = {
      descriptionPath: [resolvedDatasetEntity, resolvedDataEntity],
      browsingTreeVisible: true,
    }
    assert.deepEqual(reduced, nextState, 'Second description path should be correctly reduced')
  })
  it('should reduce tree entry selection operations correctly', () => {
    // 0 - select an initial description path
    let currentState = reduce(DescriptionStateReducer.DEFAULT_STATE, actions.setDescriptionPath([resolvedDataEntity, resolvedDatasetEntity]))
    // 1 - Select a fist tree entry
    let reduced = reduce(currentState, actions.setSelectedTreeEntry(1, { section: 'ANY1', child: null }))
    let nextState = {
      descriptionPath: [resolvedDataEntity, {
        ...resolvedDatasetEntity,
        selectedTreeEntry: { section: 'ANY1', child: null },
      }],
      browsingTreeVisible: true,
    }
    assert.deepEqual(reduced, nextState, 'First tree entry selection should be correctly reduced')
    // 2 - select another tree entry for first entity
    currentState = reduced
    nextState = {
      descriptionPath: [{
        ...resolvedDataEntity,
        selectedTreeEntry: { section: 'ANY0', child: 8 },
      }, {
        ...resolvedDatasetEntity,
        selectedTreeEntry: { section: 'ANY1', child: null },
      }],
      browsingTreeVisible: true,
    }
    reduced = reduce(currentState, actions.setSelectedTreeEntry(0, {
      section: 'ANY0',
      child: 8,
    }))
    assert.deepEqual(reduced, nextState, 'Second tree entry selection should be correctly reduced')
  })
  it('should reduce tree visibility changes correctly', () => {
    // 1 - select a description path
    let currentState = DescriptionStateReducer.DEFAULT_STATE
    let reduced = reduce(currentState, actions.setBrowsingTreeVisible(false))
    let nextState = {
      descriptionPath: [],
      browsingTreeVisible: false,
    }
    assert.deepEqual(reduced, nextState, 'First tree visibility change should be correctly reduced')
    // 2 - select another description path
    currentState = DescriptionStateReducer.DEFAULT_STATE
    reduced = reduce(currentState, actions.setBrowsingTreeVisible(true))
    nextState = {
      descriptionPath: [],
      browsingTreeVisible: true,
    }
    assert.deepEqual(reduced, nextState, 'Second tree visibility change should be correctly reduced')
  })
})
