/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Styles for form module
 * @author Sébastien binda
 */
const formStyles = theme => ({
  criteria: {
    label: {
      marginRight: 20,
    },
  },
  user: {
    breadcrumb: {
      path: {
        color: theme.palette.textColor,
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0px',
        font: 'inherit',
      },
      pathHover: {
        cursor: 'pointer',
        color: theme.palette.accent1Color,
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0px',
        font: 'inherit',
      },
      separator: {
        verticalAlign: 'text-bottom',
        margin: ' 0px 5px',
      },
    },
    searchButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    searchButton: {
      marginTop: 10,
      width: 200,
    },
    formHeader: {
      backgroundColor: theme.palette.primary2Color,
    },
    listViewStyles: {
      cell: {
        backgroundColor: theme.palette.canvasColor,
      },
      line: {
        marginTop: 10,
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'stretch',
        alignItems: 'flex-start',
        maxHeight: 90,
      },
      lineHover: {
        height: '100%',
        width: '100%',
        margin: 'auto',
        cursor: 'auto',
        backgroundColor: theme.tableRow.hoverColor,
      },
      lineOut: {
        height: '100%',
        width: '100%',
        margin: 'auto',
        cursor: 'auto',
        backgroundColor: theme.tableRow.stripeColor,
      },
      thumbnail: {
        display: 'inline-block',
        marginTop: 5,
      },
      attribute: {
        marginLeft: 10,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
      },
      attributeLabel: {
        color: theme.palette.accent1Color,
        maxWidth: 150,
        minWidth: 50,
      },
      attributeValue: {
        maxWidth: 200,
      },
    },
    options: {
      selection: {
        service: {
          iconSize: 24,
        },
      },
      more: {
        service: {
          iconSize: 24,
        },
      },
    },
  },
  resultsButtonsType: {
    buttonsGroup: {
      top: 0,
      position: 'fixed',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1000,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
})

export default formStyles
