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
import SelectedDynamicModuleActions from '../../../src/ui/module/SelectedDynamicModuleActions'
import getSelectedDynamicModuleReducer, { SelectedDynamicModuleReducer } from '../../../src/ui/module/SelectedDynamicModuleReducer'

const testActions = new SelectedDynamicModuleActions('tests')
const testReduce = getSelectedDynamicModuleReducer('tests')

/**
 * Test SelectedDynamicModuleReducer
 * @author Raphaël Mechali
 */
describe('[Client] Testing SelectedDynamicModuleReducer', () => {
  it('should exists', () => {
    assert.isDefined(getSelectedDynamicModuleReducer)
    assert.isDefined(SelectedDynamicModuleReducer)
  })
  it('should initialize correctly', () => {
    const initState = testReduce(undefined, {})
    assert.deepEqual(initState, SelectedDynamicModuleReducer.DEFAULT_STATE)
  })
  it('should ignore non related actions', () => {
    const nonRelatedAction = { type: 'IAmNotRelated' }
    const nextState = testReduce(undefined, nonRelatedAction)
    assert.deepEqual(nextState, SelectedDynamicModuleReducer.DEFAULT_STATE)
  })
  it('should reduce correctly stDynamicModule action', () => {
    const setDynamicModuleAction = testActions.setDynamicModule('aModuleId')
    const nextState = testReduce(undefined, setDynamicModuleAction)
    assert.deepEqual(nextState, {
      dynamicModuleId: 'aModuleId',
    })
  })
})
