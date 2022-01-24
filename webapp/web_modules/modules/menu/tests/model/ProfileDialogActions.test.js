/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import testActions, { ProfileDialogActions } from '../../src/model/ProfileDialogActions'

/**
 * Test ProfileDialogActions
 * @author Raphaël Mechali
 */
describe('[Menu] Testing ProfileDialogActions', () => {
  it('should return showDialog action', () => {
    assert.deepEqual(testActions.showDialog(PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS), {
      type: ProfileDialogActions.SHOW_DIALOG,
      view: PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS,
    })
  })
  it('should return setView action', () => {
    assert.deepEqual(testActions.setView(PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS), {
      type: ProfileDialogActions.SET_VIEW,
      view: PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS,
    })
  })
  it('should return hideDialog action', () => {
    assert.deepEqual(testActions.hideDialog(), {
      type: ProfileDialogActions.HIDE_DIALOG,
    })
  })
})
