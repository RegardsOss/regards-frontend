/**
 * LICENSE_PLACEHOLDER
 **/
const homePageStyles = theme => ({
  dialog: {
    heightPercent: 80,
    widthPercent: 55,
    bodyStyle: {
      padding: '5px',
    },
    button: {
      position: 'fixed',
      bottom: 10,
      right: 15,
      zIndex: 5000,
    },
  },
  adminFrame: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    width: '90%',
    height: 500,
    marginTop: 20,
  },
  adminIframeLoading: {
    margin: 'auto',
  },
})

export default homePageStyles
