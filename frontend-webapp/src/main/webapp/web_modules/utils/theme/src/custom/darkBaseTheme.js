/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import { white, orange900, grey800, redA400 } from 'material-ui/styles/colors'
import defaultTheme from './defaultTheme'

const backgroundColor = '#2a2a2a'
export default merge({}, darkBaseTheme, defaultTheme, {
  appBar: {
    textColor: white,
  },
  palette: {
    errorColor: redA400,
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
  textField: {
    backgroundColor: grey800,
  },
})
