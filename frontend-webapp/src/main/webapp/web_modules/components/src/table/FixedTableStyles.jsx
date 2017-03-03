/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * FixedTable styles
 * @param theme
 * @author Sébastien Binda
 */
export default theme => ({
  table: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellOdd: {
    backgroundColor: theme.table.backgroundColor,
    borderBottom: `1px solid ${theme.tableRow.borderColor}`,
    borderRight: `1px solid ${theme.tableRow.borderColor}`,
  },
  cellEven: {
    backgroundColor: theme.tableRow.stripeColor,
    borderBottom: `1px solid ${theme.tableRow.borderColor}`,
    borderRight: `1px solid ${theme.tableRow.borderColor}`,
  },
  cellOddContent: {
    backgroundColor: theme.table.backgroundColor,
    color: theme.tableRow.textColor,
    fontFamily: theme.fontFamily,
    display: 'flex',
    justifyContent: 'center',
  },
  cellEvenContent: {
    backgroundColor: 'transparent',
    color: theme.tableRow.textColor,
    fontFamily: theme.fontFamily,
    display: 'flex',
    justifyContent: 'center',
  },
  checkBoxCell: {
    backgroundColor: theme.table.backgroundColor,
    borderBottom: `1px solid ${theme.tableRow.borderColor}`,
  },
  cellHeader: {
    backgroundColor: theme.table.backgroundColor,
    color: theme.tableHeaderColumn.textColor,
    fontFamily: theme.fontFamily,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.tableRow.borderColor}`,
    borderRight: `1px solid ${theme.tableRow.borderColor}`,
  },
  fixedCellHeader: {
    backgroundColor: theme.table.backgroundColor,
    color: theme.tableHeaderColumn.textColor,
    fontFamily: theme.fontFamily,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: `1px solid ${theme.tableRow.borderColor}`,
  },
  loadingFilter: {
    backgroundColor: theme.palette.primary1Color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0.5',
    zIndex: '1000',
  },
})
