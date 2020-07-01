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
import SelectedDynamicModuleActions from '../../../src/ui/module/SelectedDynamicModuleActions'
import getSelectedDynamicModuleReducer, { SelectedDynamicModuleReducer } from '../../../src/ui/module/SelectedDynamicModuleReducer'
import getSelectedDynamicModuleSelectors from '../../../src/ui/module/SelectedDynamicModuleSelectors'

const testActions = new SelectedDynamicModuleActions('tests')
const testReduce = getSelectedDynamicModuleReducer('tests')
const testSelectors = getSelectedDynamicModuleSelectors(['test', 'selectedDynamicModule'])

const buildMockStore = (initState = SelectedDynamicModuleReducer.DEFAULT_STATE) => ({
  test: {
    selectedDynamicModule: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(testReduce(store.test.selectedDynamicModule, action))

/**
 * Test ModuleExpandedStateSelectors
 * @author Raphaël Mechali
 */
describe('[Client] Testing SelectedDynamicModuleSelectors', () => {
  it('should exists', () => {
    assert.isDefined(getSelectedDynamicModuleSelectors)
  })
  it('should select correctly state as it changes changes', () => {
    let fakeStore = buildMockStore()

    fakeStore = mockReduce(fakeStore, testActions.setDynamicModule('my-dyn-module1'))
    assert.equal(testSelectors.getDynamicModuleId(fakeStore), 'my-dyn-module1', 'my-dyn-module1 should be selected after first action')

    fakeStore = mockReduce(fakeStore, testActions.setDynamicModule(null))
    assert.isNull(testSelectors.getDynamicModuleId(fakeStore), 'There should be no selected module after reset')
  })
})
