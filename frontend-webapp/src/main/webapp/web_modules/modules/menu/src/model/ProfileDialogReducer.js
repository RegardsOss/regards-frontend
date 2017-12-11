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
 */
import { ProfileDialogActions } from './ProfileDialogActions'

/**
 * Profile edition dialog reducer
 */
class ProfileDialogReducer {

  static DEFAULT_STATE = {
    profileEditionVisible: false,
  }

  reduce = (state = ProfileDialogReducer.DEFAULT_STATE, action) => {
    switch (action.type) {
      case ProfileDialogActions.SHOW_EDITION:
        return { profileEditionVisible: true }
      case ProfileDialogActions.HIDE_EDITION:
        return { profileEditionVisible: false }
      default:
        return state
    }
  }

}

const instance = new ProfileDialogReducer()
/**
 * Return a function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function reduce(state, action) {
  return instance.reduce(state, action)
}
