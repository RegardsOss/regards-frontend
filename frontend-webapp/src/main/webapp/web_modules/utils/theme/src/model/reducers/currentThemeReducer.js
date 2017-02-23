/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Reducer handling the change of current theme
 */
const currentThemeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_THEME' :
      return action.themeId
    default :
      return state
  }
}
export default currentThemeReducer
