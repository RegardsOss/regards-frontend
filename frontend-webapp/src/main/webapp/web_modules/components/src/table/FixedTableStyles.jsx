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
  cell: {
    backgroundColor: theme.table.backgroundColor,
    borderBottom: `1px solid ${theme.tableRow.borderColor}`,
    borderRight: `1px solid ${theme.tableRow.borderColor}`,
  },
  checkBoxCell: {
    backgroundColor: theme.table.backgroundColor,
    borderBottom: `1px solid ${theme.tableRow.borderColor}`,
  },
  cellHeader: {
    backgroundColor: theme.table.backgroundColor,
    color: theme.tableHeaderColumn.textColor,
    fontFamily: theme.rawTheme.fontFamily,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: `1px solid ${theme.tableRow.borderColor}`,
    borderRight: `1px solid ${theme.tableRow.borderColor}`,
  },
  fixedCellHeader: {
    backgroundColor: theme.table.backgroundColor,
    color: theme.tableHeaderColumn.textColor,
    fontFamily: theme.rawTheme.fontFamily,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: `1px solid ${theme.tableRow.borderColor}`,
  },
  cellContent: {
    backgroundColor: theme.table.backgroundColor,
    color: theme.tableRow.textColor,
    fontFamily: theme.rawTheme.fontFamily,
    display: 'flex',
    justifyContent: 'center',
  },
  loadingFilter: {
    bottom: '0px',
    position: 'absolute',
    width: '100%',
    backgroundColor: theme.palette.primary1Color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0.5',
    zIndex: '1000',
  },
})
