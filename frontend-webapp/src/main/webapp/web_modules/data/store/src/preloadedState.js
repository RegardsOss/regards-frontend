import root from 'window-or-global'

let navigatorLanguage = 'en'
if (root.navigator && root.navigator.language) {
  navigatorLanguage = root.navigator.language
}

const preloadedState = {
  common: {
    theme: 'Light',
    plugins: {},
    i18n: {
      locale: navigatorLanguage,
      messages: [],
    },
    authentication: {},
    endpoints: {
      items: [],
    },
  },
  portal: {
    projects: {},
  },
  admin: {},
}


export default preloadedState
