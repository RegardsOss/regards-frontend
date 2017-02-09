/**
 * LICENSE_PLACEHOLDER
 */

/**
 * Default available types of container for layout configuration
 * @author Sébastien Binda
 */
export default {
  /**
   * Default application main container.
   */
  MainContainer: {
    classes: [],
    styles: {
      backgroundColor: 'transparent',
      // background: "url('/img/background.jpg') top right no-repeat",
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
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
      margin: '0px 10px 10px 10px',
    },
  },

  /**
   * Full width column
   */
  FullWidthColumnContainer: {
    classes: ['col-sm-98', 'col-sm-offset-1'],
    styles: {
      marginBottom: '1px',
    },
  },
  /**
   * Column container to display a large responsive column.
   */
  '50PercentColumnContainer': {
    classes: ['col-sm-48'],
    styles: {
      margin: '1px',
    },
  },
  /**
   * Column container to display a large responsive column.
   */
  LargeColumnContainer: {
    classes: ['col-sm-75'],
    styles: {
      margin: '1px',
    },
  },
  /**
   * Column container to display a small responsive column.
   */
  SmallColumnContainer: {
    classes: ['col-sm-23'],
    styles: {
      margin: '1px',
    },
  },
}
