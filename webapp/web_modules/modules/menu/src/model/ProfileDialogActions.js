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
import { PROFILE_VIEW_STATE_ENUM } from '../domain/ProfileViewStateEnum'

/**
 * Actions to show / hide the profile dialog
 * @author Raphaël Mechali
 */
export class ProfileDialogActions {
  /** Show dialog action type */
  static SHOW_DIALOG = 'menu/profile/show.dialog'

  /** Set view action type */
  static SET_VIEW = 'menu/profile/set.view'

  /** Hide dialog action type */
  static HIDE_DIALOG = 'menu/profile/hide.dialog'

  /**
   * Builds redux action to dispatch to show dialog
   * @param {string} initialView from PROFILE_VIEW_STATE_ENUM
   * @return {*} redux action
   */
  showDialog = (initialView = PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE) => ({
    type: ProfileDialogActions.SHOW_DIALOG,
    view: initialView,
  })

  /**
   * Builds redux action to dispatch to change dialog current view
   * @param {string} view from PROFILE_VIEW_STATE_ENUM
   * @return {*} redux action
   */
  setView = (view) => ({
    type: ProfileDialogActions.SET_VIEW,
    view,
  })

  /**
   * Builds redux action to dispatch to change dialog current view
   * @param {string} viewMode from PROFILE_VIEW_STATE_ENUM
   * @return {*} redux action
   */
  hideDialog = () => ({
    type: ProfileDialogActions.HIDE_DIALOG,
  })
}

export default new ProfileDialogActions()
