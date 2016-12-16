/**
 * LICENSE_PLACEHOLDER
 */

/**
 * Portal application main layout configuration file
 */
export default {
  userApp: {
    layout: {
      id: 'application',
      type: 'MainContainer',
      classes: [],
      styles: {},
      renderRouterContent: false,
      containers: [
        {
          id: 'header',
          type: 'RowContainer',
          classes: [],
          styles: {},
          renderRouterContent: false,
          modules: [{ id: 'menu', conf: { title: 'Regards - Data center interface', displayAuthentication: true } }],
        },
      ],
    },
  },
}
