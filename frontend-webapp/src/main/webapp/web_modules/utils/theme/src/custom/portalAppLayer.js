/**
 * LICENSE_PLACEHOLDER
 */

/**
 * Portal application main layout configuration file
 */
export default {
  portalApp: {
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
          modules: [{ id: 'menu', conf: { title: 'Regards - Portal interface' } }],
        },
        {
          id: 'news',
          type: 'RowContainer',
          classes: [],
          styles: {},
          renderRouterContent: false,
          modules: [{ id: 'news' }],
        },
        {
          id: 'projects',
          type: 'RowContainer',
          classes: [],
          styles: {},
          renderRouterContent: false,
          modules: [{ id: 'projects-list' }],
        },
      ],
    },
  },
}
