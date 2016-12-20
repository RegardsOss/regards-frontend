/**
 * LICENSE_PLACEHOLDER
 **/
const formStyles = theme => ({
  board: {
    section: {
      classes: theme.adminApp.datamanagement.home.section1.container.classes.join(' '),
      styles: theme.adminApp.datamanagement.home.section1.container.styles,
    },
    items: {
      classes: theme.adminApp.datamanagement.home.section1.items.classes.join(' '),
      styles: theme.adminApp.datamanagement.home.section1.items.styles,

    },
    action: {
      classes: theme.adminApp.datamanagement.home.action.classes.join(' '),
      styles: theme.adminApp.datamanagement.home.action.styles,
    },
    links: theme.linkWithoutDecoration,
  },
})

export default formStyles
