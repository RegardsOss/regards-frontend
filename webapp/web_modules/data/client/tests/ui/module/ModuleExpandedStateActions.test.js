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
import { UIDomain } from '@regardsoss/domain'
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
      state: UIDomain.PRESENTATION_STATE_ENUM.NORMAL,
    }, '(1) initialize action should be correctly built')
    assert.deepEqual(testActions.initialize('test-type-2', false, false), {
      type: testActions.INITIALIZE,
      moduleType: 'test-type-2',
      expandable: false,
      state: UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED,
    }, '(2) initialize action should be correctly built')
  })
  it('should return set state actions', () => {
    assert.deepEqual(testActions.setState('t1', UIDomain.PRESENTATION_STATE_ENUM.NORMAL), {
      type: testActions.SET_STATE,
      moduleType: 't1',
      state: UIDomain.PRESENTATION_STATE_ENUM.NORMAL,
    }, '(1) Built action should match what the reducer expects')
    assert.deepEqual(testActions.setState('t1', UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED), {
      type: testActions.SET_STATE,
      moduleType: 't1',
      state: UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED,
    }, '(2) Built action should match what the reducer expects')
    assert.deepEqual(testActions.setState('t1', UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED), {
      type: testActions.SET_STATE,
      moduleType: 't1',
      state: UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED,
    }, '(3) Built action should match what the reducer expects')
  })
  it('should provide setMinimized shortcut', () => {
    assert.deepEqual(testActions.setMinimized('t1'), {
      type: testActions.SET_STATE,
      moduleType: 't1',
      state: UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED,
    }, 'setMinimized shortcut function should build the expected result')
  })
  it('should provide setMaximized shortcut', () => {
    assert.deepEqual(testActions.setMaximized('t1'), {
      type: testActions.SET_STATE,
      moduleType: 't1',
      state: UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED,
    }, 'setMaximized shortcut function should build the expected result')
  })
  it('should provide setNormal shortcut', () => {
    assert.deepEqual(testActions.setNormal('t1'), {
      type: testActions.SET_STATE,
      moduleType: 't1',
      state: UIDomain.PRESENTATION_STATE_ENUM.NORMAL,
    }, 'setNormal shortcut function should build the expected result')
  })
})
