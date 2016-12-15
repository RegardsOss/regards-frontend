/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import defaultTheme from './defaultTheme'
import { red900, white, orange900 } from 'material-ui/styles/colors'

const backgroundColor = '#2a2a2a'
export default merge({}, darkBaseTheme, defaultTheme, {
  palette: {
    errorColor: red900,
    warningColor: orange900,
  },
  linkWithoutDecoration: {
    textDecoration: 'blink',
    color: white,
  },
  adminApp: {
    loginForm: {
      layout: {
        backgroundColor: 'transparent',
        backgroundImage: "url('/img/background.jpg')",
      },
    },
  },
  menu: {
    localeDropdown: {
      color: '#fff',
    },
    title: {
      color: white,
    },
    bar: {
      backgroundColor,
    },
  },
})
