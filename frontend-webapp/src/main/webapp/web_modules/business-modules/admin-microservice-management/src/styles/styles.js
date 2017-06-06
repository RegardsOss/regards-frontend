/**
 * LICENSE_PLACEHOLDER
 */
const microserviceManagementStyles = theme => ({
  board: {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
  },
  plugins: {
    root: {
      position: 'relative',
      paddingBottom: 20,
    },
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    tile: {
      classes: ['col-xs-50', 'col-sm-50', 'col-lg-33'].join(' '),
      styles: {
        margin: 20,
      },
    },
    gridList: {
      margin: 0,
    },
  },
  pluginConfiguration: {
    root: {
      position: 'relative',
    },
    card: {
      margin: '0px 20px',
    },
    cardExpanded: {
      margin: '30px 20px',
    },
    lineWrapper: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: 50,
    },
    buttonsGroupWrapper: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    toggle: {
      width: 'auto',
      height: 'auto',
    },
    version: {
      color: theme.palette.secondaryTextColor,
      marginLeft: 7,
    },
    form: {
      section: {
        marginTop: 20,
      },
      toggle: {
        width: 'auto',
        marginTop: 14,
      },
    },
  },
  pluginParameter: {
    pluginButton: {
      marginLeft: 10,
    },
    iconMenu: {
      visibility: 'hidden',
    },
    field: {
      display: 'none',
    },
  },
})

export default microserviceManagementStyles
