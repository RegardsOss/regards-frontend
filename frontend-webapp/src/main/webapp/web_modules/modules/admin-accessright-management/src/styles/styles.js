/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Styles for board items components
 * @param theme
 * @author Sébastien Binda
 */
const styles = theme => ({
  action: {
    classes: ['row'].join(' '),
    styles: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
  },
  layout: {
    cardEspaced: {
      marginTop: '20px',
    }
  }
})

export default styles
