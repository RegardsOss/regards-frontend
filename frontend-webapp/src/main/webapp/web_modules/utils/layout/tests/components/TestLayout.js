/**
 * LICENSE_PLACEHOLDER
 **/
const layout = {
  id: 'application',
  type: 'MainContainer',
  classes: ['mainapp'],
  styles: {},
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
