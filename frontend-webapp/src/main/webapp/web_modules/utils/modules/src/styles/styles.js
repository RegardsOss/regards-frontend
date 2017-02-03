/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Styles of the Modules components
 * @author Sébastien Binda
 */
export default theme => ({
  moduleListButtonsGroup: {
    top: 0,
    right: 0,
    position: 'fixed',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000,
  },
  moduleListButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  moduleListSection: {
    backgroundColor: theme.palette.accent2Color,
  },
})
