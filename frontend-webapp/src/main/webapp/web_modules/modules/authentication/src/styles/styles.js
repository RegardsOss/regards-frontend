/**
 * LICENSE_PLACEHOLDER
 */
const styles = theme => (
  {
    layout: {
    },
    action: {
      display: 'flex',
      justifyContent: 'center',
    },
    linksBar: {
      display: 'flex',
      padding: '10px',
      margin: '20px 10px 10px 10px',
      justifyContent: 'space-around',
      borderWidth: '1px 0 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
    },
    dialog: {
      preferredWidth: '680px',
      maxFormHeight: '55vh',
      body: { padding: '0', overflowY: 'none' },
      content: {
        width: '680px',
        maxWidth: 'none',
      },
      scrollStyle: {
        height: '55vh',
      },
    },
  })

export default styles
