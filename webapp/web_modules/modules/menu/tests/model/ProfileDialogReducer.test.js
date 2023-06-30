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
import { PROFILE_VIEW_STATE_ENUM } from '../../src/domain/ProfileViewStateEnum'
import testActions from '../../src/model/ProfileDialogActions'
import testReducer, { ProfileDialogReducer } from '../../src/model/ProfileDialogReducer'

/**
 * Test SelectedDynamicModuleReducer
 * @author Raphaël Mechali
 */
describe('[Menu] Testing ProfileDialogReducer', () => {
  it('should initialize correctly', () => {
    const initState = testReducer(undefined, {})
    assert.deepEqual(initState, ProfileDialogReducer.DEFAULT_STATE)
  })
  it('should ignore non related actions', () => {
    const nonRelatedAction = { type: 'IAmNotRelated' }
    const nextState = testReducer(undefined, nonRelatedAction)
    assert.deepEqual(nextState, ProfileDialogReducer.DEFAULT_STATE)
  })
  it('should reduce correctly showDialog, setView and hideDialog actions', () => {
    const tests = [{
      label: 'show dialog',
      action: testActions.showDialog(PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS),
      post: {
        open: true,
        view: PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS,
      },
    }, {
      label: 'set quota information view',
      action: testActions.setView(PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS),
      post: {
        open: true,
        view: PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS,
      },
    }, {
      label: 'set edit profile view',
      action: testActions.setView(PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE),
      post: {
        open: true,
        view: PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE,
      },
    }, {
      label: 'hide dialog',
      action: testActions.hideDialog(),
      post: {
        open: false,
        view: PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE,
      },
    }]

    tests.reduce((previousState, { action, post, label }) => {
      const actual = testReducer(previousState, action)
      assert.deepEqual(actual, post, `It should reduce correctly the action to ${label}`)
      return actual
    }, ProfileDialogReducer.DEFAULT_STATE)
  })
})
