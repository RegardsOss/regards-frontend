/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Module styles
 * @param theme
 * @author Sébastien binda
 */
const formStyles = theme => ({
  plugins: {
    root: {
      position: 'relative',
    },
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    tile: {
      classes: ['col-xs-50', 'col-sm-50', 'col-lg-33'].join(' '),
      styles: {
        margin: 20,
      },
    },
    gridList: {
      margin: 0,
    },
  },
  plugin: {
    line: {
      classes: 'row',
    },
    description: {
      classes: 'col-sm-70',
    },
    icon: {
      classes: 'col-sm-30',
      style: { width: '150px', height: '150px' },
    },
  },
})

export default formStyles
