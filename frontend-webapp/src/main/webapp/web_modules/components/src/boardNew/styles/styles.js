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
      margin: 20,
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
    small: {
      width: 72,
      height: 72,
      padding: 16,
    },
  },
})

export default styles
