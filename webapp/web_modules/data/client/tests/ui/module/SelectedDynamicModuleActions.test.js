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

const testActions = new SelectedDynamicModuleActions('tests')

/**
 * Test SelectedDynamicModuleActions
 * @author Raphaël Mechali
 */
describe('[Client] Testing SelectedDynamicModuleActions', () => {
  it('should exists', () => {
    assert.isDefined(SelectedDynamicModuleActions)
  })
  it('should return setDynamicModule action', () => {
    assert.deepEqual(testActions.setDynamicModule('HaHo!'), {
      type: testActions.SET_DYNAMIC_MODULE,
      dynamicModuleId: 'HaHo!',
    })
  })
})
