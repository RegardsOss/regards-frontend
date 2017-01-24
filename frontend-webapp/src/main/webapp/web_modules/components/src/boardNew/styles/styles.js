/**
 * LICENSE_PLACEHOLDER
 **/
const styles = theme => ({
  section: {
    classes: ['row'].join(' '),
    styles: {},
  },
  items: {
    classes: ['col-xs-50', 'col-sm-40', 'col-lg-33'].join(' '),
    styles: {
      padding: '10px 0',
      //textAlign: 'center',
      marginBottom: '30px',
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
  links: theme.linkWithoutDecoration,
  icon: {
    smallIcon: {
      width: 36,
      height: 36,
    },
    mediumIcon: {
      width: 48,
      height: 48,
    },
    largeIcon: {
      width: 60,
      height: 60,
    },
    small: {
      width: 72,
      height: 72,
      padding: 16,
    },
    medium: {
      width: 96,
      height: 96,
      padding: 24,
    },
    large: {
      width: 120,
      height: 120,
      padding: 30,
    },
  }
})

export default styles
