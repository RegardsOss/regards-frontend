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
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      position: 'relative',
    },
    gridList: {
      height: 450,
      overflowY: 'auto',
      margin: 0,
    },
  },
  pluginConfiguration: {
    root: {
      position: 'relative',
      padding: '0px 20px 20px 20px',
    },
    card: {
      margin: '0px 0px',
    },
    cardExpanded: {
      margin: '30px 0px',
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
      color: 'rgba(0, 0, 0, 0.541176)',
      marginLeft: 7,
    },
  },
})

export default microserviceManagementStyles
