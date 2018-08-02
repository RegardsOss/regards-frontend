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
import DialogRequestsActions from '../../../src/ui/dialog/DialogRequestsActions'
import getDialogRequestsReducer, { DialogRequestsReducer } from '../../../src/ui/dialog/DialogRequestsReducer'

const testActions = new DialogRequestsActions('tests')
const testReduce = getDialogRequestsReducer('tests')


/**
 * Test DialogRequestsReducer
 * @author Raphaël Mechali
 */
describe('[Client] Testing DialogRequestsReducer', () => {
  it('should exists', () => {
    assert.isDefined(getDialogRequestsReducer)
    assert.isDefined(DialogRequestsReducer)
  })
  it('should initialize correctly', () => {
    const initState = testReduce(undefined, {})
    assert.deepEqual(initState, DialogRequestsReducer.DEFAULT_STATE)
  })
  it('should ignore non related actions', () => {
    const nonRelatedAction = { type: 'IAmNotRelated' }
    const nextState = testReduce(undefined, nonRelatedAction)
    assert.deepEqual(nextState, DialogRequestsReducer.DEFAULT_STATE)
  })
  it('should reduce correctly show action', () => {
    const showAction = testActions.show({ a: 'a', other: [] }, 'my-consumer')
    const nextState = testReduce(undefined, showAction)
    assert.deepEqual(nextState, {
      visible: true,
      parameters: { a: 'a', other: [] },
      consumerID: 'my-consumer',
    }, 'Show action should be correctly reduced')
  })
  it('should reduce correctly hide action', () => {
    const hideAction = testActions.hide()
    const nextState = testReduce({ // previous state: shown
      visible: true,
      parameters: { a: 'a', other: [] },
      consumerID: 'my-consumer',
    }, hideAction)
    assert.deepEqual(nextState, {
      visible: false,
      parameters: null,
      consumerID: null,
    }, 'Show action should be correctly reduced')
  })
})
