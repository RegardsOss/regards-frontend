/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Module styles
 * @param theme
 * @author Sébastien binda
 */
const formStyles = theme => ({
  board: {
    section: {
      classes: 'row',
    },
    items: {
      classes: 'col-xs-50 col-sm-40 col-lg-33',
      styles: {
        padding: '10px 0',
        textAlign: 'center',
        marginBottom: '30px',
      },
    },
    action: {
      classes: 'row',
      styles: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
      },
    },
    links: {
      textDecoration: 'blink',
    },
  },
  cardEspaced: {
    marginTop: '20px',
  },
  theme: {
    mainWrapper: {
      // position: 'relative',
      // height: 880,
    },
    toolbar: {
      root: {
        backgroundColor: theme.palette.primary1Color,
      },
      title: {
        color: theme.palette.alternateTextColor,
      },
      icon: {
        color: theme.palette.alternateTextColor,
      },
      themeDropDownMenu: {
        style: {
          top: -2,
          left: -10,
        },
        labelStyle: {
          color: theme.palette.alternateTextColor,
          paddingLeft: 0,
          fontSize: theme.toolbar.titleFontSize,
          fontWeight: 'bold',
        },
      },
    },
    contentWrapper: {
      position: 'relative',
      height: 700,
      overflowY: 'auto',
    },
    form: {
      toggle: {
        marginTop: 30,
        width: 180,
      },
      actionsWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
  },
})

export default formStyles
