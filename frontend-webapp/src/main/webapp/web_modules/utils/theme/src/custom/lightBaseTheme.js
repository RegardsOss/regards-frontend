// Default theme
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { merge } from 'lodash'
import { red900, grey900, blueGrey50, white } from 'material-ui/styles/colors'

export default merge({}, lightBaseTheme, {
  palette: {
    errorColor: red900,
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
