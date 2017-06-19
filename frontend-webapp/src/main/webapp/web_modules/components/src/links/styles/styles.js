/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Styles for board items components
 * @param theme
 * @author Sébastien Binda
 */
const styles = theme => ({
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
})

export default styles
