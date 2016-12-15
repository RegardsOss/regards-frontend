/**
 * LICENSE_PLACEHOLDER
 */

/**
 * Default available types of container for layout configuration
 */
export default {
  /**
   * Default application main container.
   */
  MainContainer: {
    classes: [],
    styles: {
      backgroundColor: 'transparent',
      background: "url('/img/background.jpg') top right no-repeat",
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      minHeight: '100vh',
      paddingTop: '10px',
      paddingRight: '1px', // Quick fix for bootstrap grid .row
    },
  },
  /**
   * Row container to display a responsive row.
   */
  RowContainer: {
    classes: ['row'],
    styles: {
      marginBottom: '10px',
    },
  },
  /**
   * Column container to display a large responsive column.
   */
  LargeColumnContainer: {
    classes: ['col-sm-75'],
    styles: {
      margin: '5px',
    },
  },
  /**
   * Column container to display a small responsive column.
   */
  SmallColumnContainer: {
    classes: ['col-sm-23'],
    styles: {
      margin: '5px',
    },
  },
}
