/**
 * LICENSE_PLACEHOLDER
 */

/**
 * Styles for menu module
 * @author Sébastien binda
 */
const menuStyles = theme => (
  {
    bar: {
      backgroundColor: theme.palette.primary1Color,
      fontFamily: theme.fontFamily,
      titleFontSize: 23,
      height: 50,
    },
    title: {
      color: theme.palette.textColor,
      marginLeft: '40px',
    },
    localeDropdown: {
      color: theme.palette.primary2Color,
    },
    loginButton: {
      backgroundColor: theme.palette.primary2Color,
      color: theme.palette.textColor,
    },
    loggedUser: {
      text: {
        paddingTop: '5px',
        color: theme.palette.textColor,
      },
      icon: {
        color: theme.palette.textColor,
      },
    },
    profile: {
      dialog: {
        styles: {
          padding: '0',
          overflowY: 'none',
        },
      },
      scrollArea: {
        styles: {
          height: '55vh',
        },
      },
      actions: {
        styles: {
          display: 'flex',
          justifyContent: 'center',
        },
      },
    },
  })

export default menuStyles
