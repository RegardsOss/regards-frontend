/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ModuleExpandedStateActions } from '../../../src/ui/module/ModuleExpandedStateActions'

const testActions = new ModuleExpandedStateActions('tests')


/**
 * Test ModuleExpandedStateActions
 * @author Raphaël Mechali
 */
describe('[Client] Testing ModuleExpandedStateActions', () => {
  it('should exists', () => {
    assert.isDefined(ModuleExpandedStateActions)
  })
  it('should return initialize redux actions', () => {
    assert.deepEqual(testActions.initialize('test-type-1', true, true), {
      type: testActions.INITIALIZE,
      moduleType: 'test-type-1',
      expandable: true,
      expanded: true,
    }, '(1) initialize action should be correctly built')
    assert.deepEqual(testActions.initialize('test-type-2', false, false), {
      type: testActions.INITIALIZE,
      moduleType: 'test-type-2',
      expandable: false,
      expanded: false,
    }, '(2) initialize action should be correctly built')
  })
  it('should return set expanded state actions', () => {
    assert.deepEqual(testActions.setExpanded('t1', true), {
      type: testActions.SET_EXPANDED_STATE,
      moduleType: 't1',
      expanded: true,
    }, '(1) Built action should match what the reducer expects')
    assert.deepEqual(testActions.setExpanded('t2', false), {
      type: testActions.SET_EXPANDED_STATE,
      moduleType: 't2',
      expanded: false,
    }, '(2) Built action should match what the reducer expects')
  })
  it('should provice collapse shortcut redux action', () => {
    assert.deepEqual(testActions.collapse('t1'), {
      type: testActions.SET_EXPANDED_STATE,
      moduleType: 't1',
      expanded: false,
    }, 'Collapse action should be a shortcut on setExpanded(false)')
  })
  it('should provice expabnd shortcut redux action', () => {
    assert.deepEqual(testActions.expand('t1'), {
      type: testActions.SET_EXPANDED_STATE,
      moduleType: 't1',
      expanded: true,
    }, 'Expand action should be a shortcut on setExpanded(true)')
  })
})
