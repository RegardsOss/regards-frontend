/**
 * LICENSE_PLACEHOLDER
 */
import { amber900 } from 'material-ui/styles/colors'

const adminProjectManagementStyles = theme => (
  {
    palette: {
      warning: amber900,
    },
    tableRow: {
      float: 'none', //fix for bootstrap grid
    },
    abbr: {
      textDecoration: 'none',
    },
  })

export default adminProjectManagementStyles
