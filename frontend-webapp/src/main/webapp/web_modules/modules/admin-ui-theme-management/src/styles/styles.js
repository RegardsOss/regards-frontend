/**
 * LICENSE_PLACEHOLDER
 **/
import typography from 'material-ui/styles/typography'

/**
 * Module styles
 * @param theme
 * @author Sébastien binda
 */
const formStyles = theme => {
  const styles = {
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
    showcase: {
      group: {
        float: 'left',
        width: '33%',
        marginTop: '16px',
        padding: '0 50px',
        boxSizing: 'border-box',
      },
      groupSlider: {
        float: 'left',
        padding: '0 50px',
        boxSizing: 'border-box',
        marginTop: '0px',
        marginBottom: '0px',
        width: '100%',
      },
      container: {
        marginBottom: '16px',
        minHeight: '24px',
        textAlign: 'left',
      },
      containerCentered: {
        textAlign: 'center',
        marginBottom: '16px',
        minHeight: '24px',
      },
      paper: {
        height: '100px',
        width: '100px',
        margin: '0 auto',
        marginBottom: '64px',
      },
      textfield: {
        width: '100%',
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: typography.fontWeightMedium,
        color: typography.textDarkBlack,
      },
      liveExamplePaper: {
        // marginBottom: 32,
        overflow: 'hidden',
      },
      bottomBorderWrapper: {
        paddingBottom: '10px',
      },
    }
  }
  return styles
}

export default formStyles
