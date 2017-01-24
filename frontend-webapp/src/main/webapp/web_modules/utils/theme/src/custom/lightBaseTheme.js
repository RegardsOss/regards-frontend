/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { white, red900, grey900, blueGrey50, amber900 } from 'material-ui/styles/colors'
import defaultTheme from './defaultTheme'

export default merge({}, lightBaseTheme, defaultTheme, {
  appBar: {
    textColor: white,
  },
  palette: {
    errorColor: red900,
    warningColor: amber900,
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
