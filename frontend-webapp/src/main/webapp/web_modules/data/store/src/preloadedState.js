/**
 * LICENSE_PLACEHOLDER
 **/
import root from 'window-or-global'

let navigatorLanguage = 'en'
if (root.navigator && root.navigator.language) {
  navigatorLanguage = root.navigator.language
}

const preloadedState = {
  common: {
    plugins: {},
    i18n: {
      locale: navigatorLanguage,
      messages: [],
    },
    authentication: {},
    error: {
      opened: false,
      message: '',
    },
  },
  portal: {},
  admin: {},
  user: {},
}


export default preloadedState
