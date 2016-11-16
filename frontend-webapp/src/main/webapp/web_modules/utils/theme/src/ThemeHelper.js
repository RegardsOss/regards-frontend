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
  console.log('Failed to inject injectTapEventPlugin. Are you in watch mode?')
}

class ThemeHelper {

  static getThemes() {
    return customThemes
  }

  static addAppLayer(theme) {
    if (theme === undefined || theme.length === 0) {
      console.error('This theme does not exist or is empty', theme)
    }
    return merge({}, adminAppLayer, portalAppLayer, theme)
  }

  /**
   * Todo - getMuiTheme always merge the custom theme with a standard one,
   */
  static getByName(name) {
    const theme = getMuiTheme(ThemeHelper.addAppLayer(this.getThemes()[name]))
    return theme
  }

}

export default ThemeHelper
