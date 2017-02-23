/**
 * LICENSE_PLACEHOLDER
 **/
export const SET_CURRENT_THEME = 'SET_CURRENT_THEME'

const setCurrentTheme = themeId => ({
  type: SET_CURRENT_THEME,
  themeId,
})
export default setCurrentTheme
