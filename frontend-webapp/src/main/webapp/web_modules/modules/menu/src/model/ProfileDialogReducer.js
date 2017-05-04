/**
 * LICENSE_PLACEHOLDER
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
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function reduce(state, action) {
  return instance.reduce(state, action)
}
