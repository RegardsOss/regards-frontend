import cdppTheme from './cdppTheme'
import ssaltoTheme from './ssaltoTheme'
import lightBaseTheme from './lightBaseTheme'
import darkBaseTheme from './darkBaseTheme'
import './reset.css'
import './main.css'
import './bootstrap_grid_100.css'
import './background.jpg'
// Above we have:
// - Cross browser css reset
// - bootstrap grid that uses 100 cols instead of 12
//   And nothing else from bootstrap 3.2
//   @source https://github.com/zirafa/bootstrap-grid-only
// - nice background image

// Register them here
export default {
  cdpp: cdppTheme,
  ssalto: ssaltoTheme,
  Light: lightBaseTheme,
  Dark: darkBaseTheme,
}
