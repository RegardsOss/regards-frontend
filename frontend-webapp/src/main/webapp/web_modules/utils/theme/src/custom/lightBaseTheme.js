// Default theme
import { merge } from 'lodash'
import lightBaseTheme  from 'material-ui/styles/baseThemes/lightBaseTheme'
import { red900, grey900, blueGrey50, amber900 } from 'material-ui/styles/colors'

export default merge({}, lightBaseTheme, {
  palette: {
    errorColor: red900,
    warningColor: amber900
  },
  linkWithoutDecoration: {
    textDecoration: 'blink',
    color: grey900,
  },
  adminApp: {
    loginForm: {
      layout: {
        backgroundColor: blueGrey50,
      },
    },
  },
})
