/**
* LICENSE_PLACEHOLDER
**/

/**
 * Builds module style on theme
 */
export default theme => ({
  descriptionDialog: {
    widthPercent: 70,
    heightPercent: 68,
  },
  tabHeaderHeight: 48,
  markdownContainer: {
    styles: {
      padding: '10px 0 10px 0',
      color: theme.palette.textColor,
    },
    scrollArea: {
      containerStyles: { zIndex: 5, background: 'rgba(0,0,0,0)' },
      scrollbarStyles: {
        background: theme.palette.textColor,
        borderRadius: '3px',
        width: '6px',
      },
    },
  },
})
