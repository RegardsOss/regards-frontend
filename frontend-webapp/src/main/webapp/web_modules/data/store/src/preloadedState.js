const preloadedState = {
  common: {
    theme: 'Light',
    plugins: {},
    i18n: {
      locale: navigator.language,
      messages: [],
    },
    authentication: {},
    endpoints: {
      items: [],
    },
  }, /*
   userApp: {
   ws: {
   time: null,
   started: false
   }
   },*/
  portal: {
    projects: {},
  },
  admin: {},
}


export default preloadedState
