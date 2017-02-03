/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Module styles
 * @param theme
 * @author Sébastien binda
 */
const formStyles = theme => ({
  board: {
    section: {
      classes: 'row',
    },
    items: {
      classes: 'col-xs-50 col-sm-40 col-lg-33',
      styles: {
        padding: '10px 0',
        textAlign: 'center',
        marginBottom: '30px',
      },
    },
    action: {
      classes: 'row',
      styles: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
      },
    },
    links: theme.linkWithoutDecoration,
  },
  cardEspaced: {
    marginTop: '20px',
  },
})

export default formStyles
