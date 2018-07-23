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

const testActions = new DialogRequestsActions('tests')


/**
 * Test DialogRequestsActions
 * @author Raphaël Mechali
 */
describe('[Client] Testing DialogRequestsActions', () => {
  it('should exists', () => {
    assert.isDefined(DialogRequestsActions)
  })
  it('should return show request action', () => {
    assert.deepEqual(testActions.show({ a: 'a', other: [] }, 'my-consumer'), {
      type: testActions.SHOW,
      parameters: {
        a: 'a', other: [],
      },
      consumerID: 'my-consumer',
    }, 'show action should be correctly built')
  })
  it('should return hide request action', () => {
    assert.deepEqual(testActions.hide(), { type: testActions.HIDE })
  })
})
