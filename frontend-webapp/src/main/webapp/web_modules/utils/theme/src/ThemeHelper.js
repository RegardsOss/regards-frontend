import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { merge } from 'lodash'
import customThemes from './custom/index'
import adminAppLayer from './custom/adminAppLayer'
import portalAppLayer from './custom/portalAppLayer'
// Custom themes

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
try {
  injectTapEventPlugin()
} catch (e) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Failed to inject injectTapEventPlugin. Are you in watch mode?')
  }
}

class ThemeHelper {

  /**
   *
   * @returns {*} theme list
   */
  static getThemes() {
    return customThemes
  }

  /**
   * @param theme the theme name
   * @returns {*} a full theme with required keys
   */
  static addAppLayer(theme) {
    if (theme === undefined || theme.length === 0) {
      console.error('This theme does not exist or is empty', theme)
    }
    return merge({}, adminAppLayer, portalAppLayer, theme)
  }

  /**
   * return a theme by its name
   * @param name string the theme name
   */
  static getByName(name) {
    return getMuiTheme(ThemeHelper.addAppLayer(this.getThemes()[name]))
  }

}

export default ThemeHelper
