/**
 * LICENSE_PLACEHOLDER
 */
const styles = theme => ({
  card: {
    classes: 'col-lg-24 col-md-32 col-xs-48',
    root: {
      margin: '10px 0 0 10px',
    },
    media: {
      paddingBottom: '10px',
    },
  },
  table: {
    header: {
      borderBottom: 'none',
    },
    body: {
      marginBottom: '10px',
    },
    row: {
      height: '22px',
    },
    firstColumn: {
      paddingLeft: '18px',
    },
  },
  chart: {
    root: {
      marginTop: '10px',
    },
    curves: {
      usedSizeColor: '#7EA5C9',
      unusedSizeColor: '#F0F0F0',
    },
    legend: {
      position: 'right',
    },
  },
})

export default styles
