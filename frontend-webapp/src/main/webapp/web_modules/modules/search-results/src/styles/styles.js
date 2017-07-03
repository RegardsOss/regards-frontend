/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Styles for form module
 * @author Sébastien binda
 */
const formStyles = theme => ({
  configuration: {
    topOptions: {
      styles: {
        padding: '0 0 15px 15px',
      },
    },
  },
  criteria: {
    label: {
      marginRight: 20,
    },
  },
  user: {
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
    optionsStyles: {
      buttonStyles: {
        width: 24,
        height: 24,
        padding: 0,
      },
      iconStyles: {
        width: 24,
        height: 24,
      },
    },
    listViewStyles: {
      cell: {
        backgroundColor: theme.palette.canvasColor,
        textAlign: 'left',
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
        alignItems: 'flex-end',
      },
      attributeLabel: {
        color: theme.palette.accent1Color,
        maxWidth: 150,
        minWidth: 50,
      },
      attributeValue: {
        maxWidth: 250,
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
