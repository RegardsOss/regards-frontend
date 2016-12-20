/**
 * LICENSE_PLACEHOLDER
 **/
const formStyles = theme => ({
  board: {
    section: {
      classes: ['row'].join(' '),
      styles: {},
    },
    items: {
      classes: ['col-xs-50', 'col-sm-40', 'col-lg-33'].join(' '),
      styles: {
        padding: '10px 0',
        textAlign: 'center',
        marginBottom: '30px',
      },
      contentStyles: {
        minHeight: '170px',
      },
    },
    action: {
      classes: ['row'].join(' '),
      styles: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
      },
    },
    links: theme.linkWithoutDecoration,
  },
})

export default formStyles
