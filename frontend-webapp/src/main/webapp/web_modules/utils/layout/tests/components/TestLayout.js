/**
 * LICENSE_PLACEHOLDER
 **/
const layout = {
  id: 'application',
  type: 'MainContainer',
  classes: ['mainapp'],
  styles: {},
  renderRouterContent: false,
  containers: [
    {
      id: 'header',
      type: 'RowContainer',
      classes: ['header'],
      styles: {},
    },
    {
      id: 'body',
      type: 'RowContainer',
      classes: ['body'],
      styles: {},
      modules: [{
        id: 'test-module',
      }],
      containers: [
        {
          id: 'bodyLeft',
          type: 'RowContainer',
          classes: ['body-left'],
          styles: {},
        },
        {
          id: 'bodyRight',
          type: 'RowContainer',
          classes: ['body-right'],
          styles: {},
        },
      ],
    },
    {
      id: 'footer',
      type: 'RowContainer',
      classes: ['footer'],
      styles: {},
    },
  ],
}

export default layout
