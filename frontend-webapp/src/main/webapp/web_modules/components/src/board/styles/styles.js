/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Styles for board items components
 * @param theme
 * @author Sébastien Binda
 */
const styles = theme => ({
  section: {
    classes: ['row'].join(' '),
    styles: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  items: {
    classes: ['col-xs-50', 'col-sm-50', 'col-lg-33'].join(' '),
    styles: {
      margin: 10,
    },
    contentStyles: {
      minHeight: '170px',
    },
  },
  action: {
    classes: ['row'].join(' '),
    styles: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
  },
  cardActionsStyles: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  links: {
    textDecoration: 'blink',
  },
  icon: {
    smallIcon: {
      width: 36,
      height: 36,
    },
    small: {
      width: 72,
      height: 72,
      padding: 16,
    },
  },
  actionIconWithNotifications: {
    badgeCustomStyles: {
      position: 'absolute',
      zIndex: '1',
      top: '-5px',
      right: '7px',
      width: '16px',
      height: '16px',
    },
    iconStyles: {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      margin: 'auto',
    },
  },
})

export default styles
