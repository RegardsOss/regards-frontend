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
import ResultsContextActions from '../../../src/ui/results/ResultsContextActions'

const testActions = new ResultsContextActions('tests')

/**
 * Test SelectedDynamicModuleActions
 * @author Raphaël Mechali
 */
describe('[Client] Testing ResultsContextActions', () => {
  it('should exists', () => {
    assert.isDefined(ResultsContextActions)
  })
  it('should return setContext action', () => {
    assert.deepEqual(testActions.setContext(18, { context: 'HaHo!' }), {
      type: testActions.SET_CONTEXT,
      moduleId: 18,
      newState: { context: 'HaHo!' },
    })
  })
  it('should return updateResultsContext action', () => {
    assert.deepEqual(testActions.updateResultsContext('abc', { tiptop: {} }), {
      type: testActions.UPDATE_CONTEXT,
      moduleId: 'abc',
      stateDiff: { tiptop: {} },
    })
  })
})
