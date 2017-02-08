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
    finishAccountUnlock: {
      loadingContainer: {
        style: {
          display: 'flex',
          flexDirection: 'horizontal',
          paddingBottom: '90px',
          alignItems: 'center',
          height: '330px',
          justifyContent: 'space-around'
        },
        loadingComponent: {
          size: 150,
        },
      },
    },
  })

export default styles
