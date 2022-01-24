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
import testActions from '../../src/model/ProfileDialogActions'
import testReducer, { ProfileDialogReducer } from '../../src/model/ProfileDialogReducer'
import testSelectors from '../../src/model/ProfileDialogSelectors'

const buildMockStore = (initState = ProfileDialogReducer.DEFAULT_STATE) => ({
  'modules.menu': {
    profileDialog: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(testReducer(store['modules.menu'].profileDialog, action))

/**
 * Test ModuleExpandedStateSelectors
 * @author Raphaël Mechali
 */
describe('[Menu] Testing ProfileDialogSelectors', () => {
  it('should select correctly state as it changes changes', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(testSelectors.getProfileDialogState(fakeStore), ProfileDialogReducer.DEFAULT_STATE)

    fakeStore = mockReduce(fakeStore, testActions.showDialog(PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS))
    assert.deepEqual(testSelectors.getProfileDialogState(fakeStore), {
      open: true,
      view: PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS,
    })

    fakeStore = mockReduce(fakeStore, testActions.setView(PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS))
    assert.deepEqual(testSelectors.getProfileDialogState(fakeStore), {
      open: true,
      view: PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS,
    })

    fakeStore = mockReduce(fakeStore, testActions.hideDialog())
    assert.deepEqual(testSelectors.getProfileDialogState(fakeStore), {
      open: false,
      view: PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS,
    })
  })
})
