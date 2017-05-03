/**
* LICENSE_PLACEHOLDER
**/


const buildStyles = (theme) => {
  const scrollContainerStyles = { zIndex: 5, background: 'rgba(0,0,0,0)' }
  const scrollbarStyles = {
    background: theme.palette.textColor,
    borderRadius: '3px',
    width: '6px',
  }
  return {
    scrollArea: {
      // scroll area common styles
      verticalScrollContainer: {
        styles: scrollContainerStyles,
      },
      horizontalScrollContainer: {
        styles: scrollContainerStyles,
      },
      verticalScrollbar: {
        styles: scrollbarStyles,
      },
      horizontalScrollbar: {
        styles: scrollbarStyles,
      },
    },
  }
}

export default buildStyles
