/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * Actions to show / hide the profile edition
 */
export class ProfileDialogActions {

  static SHOW_EDITION = 'menu/profile/show.edition'
  static HIDE_EDITION = 'menu/profile/hide.edition'

  showEdition = () => ({
    type: ProfileDialogActions.SHOW_EDITION,
  })

  hideEdition = () => ({
    type: ProfileDialogActions.HIDE_EDITION,
  })

}

export default new ProfileDialogActions()
