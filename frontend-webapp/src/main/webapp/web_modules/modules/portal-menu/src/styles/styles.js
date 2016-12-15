/**
 * LICENSE_PLACEHOLDER
 */
const menuStyles = theme => (
  {
    bar: {
      backgroundColor: theme.palette.primary1Color,
      fontFamily: theme.fontFamily,
      titleFontSize: 23,
      height: 50,
    },
    title: {
      color: theme.palette.textColor,
      marginLeft: '40px',
    },
    classes: ['col-sm-98', 'col-sm-offset-1'],
    localeDropdown: {
      color: theme.palette.primary2Color,
    },
  })

export default menuStyles
