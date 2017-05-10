/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * FixedTable styles
 * @param theme
 * @author Sébastien Binda
 */
export default (theme) => {
  const cellBorder = `1px solid ${theme.tableRow.borderColor}`

  const commonHeaderStyles = {
    backgroundColor: theme.table.backgroundColor,
    color: theme.tableHeaderColumn.textColor,
    fontFamily: theme.fontFamily,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: cellBorder,
  }

  const commonCellEven = {
    backgroundColor: theme.tableRow.stripeColor,
    borderBottom: cellBorder,
  }

  const commonCellOdd = {
    backgroundColor: theme.table.backgroundColor,
    borderBottom: cellBorder,
  }

  return ({
    header: {
      line: {
        classNames: 'row',
      },
      tabsLine: {
        classNames: 'col-xs-100',
        styles: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      },
      tabs: {
        styles: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'noWrap',
        },
      },
      contextOptions: {
        styles: {
          margin: '0 40px 0 40px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexWrap: 'noWrap',
          flexGrow: 1,
          flexShrink: 1,
        },
      },
      customOptions: {
        styles: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexWrap: 'noWrap',
        },
      },
      // options group, above the results table (styles for using modules)
      optionsGroup: {
        lastElement: {
          styles: {
            marginRight: '40px',
          },
        },
      },
      text: {
        styles: {
          color: theme.palette.textColor,
          margin: '1em 1em 1em 1em',
        },
      },
    },
    table: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cellOdd: {
      ...commonCellOdd,
      //borderRight: cellBorder,
    },
    lastCellOdd: { ...commonCellOdd },
    cellEven: {
      ...commonCellEven,
      //borderRight: cellBorder,
    },
    lastCellEven: { ...commonCellEven },
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
      ...commonHeaderStyles,
      alignItems: 'center',
      //borderRight: cellBorder,
    },
    lastCellHeader: {
      ...commonHeaderStyles,
      alignItems: 'center',
    },
    fixedCellHeader: {
      ...commonHeaderStyles,
    },
    sortButton: {
      iconStyle: {
        width: 20,
        height: 20,
      },
      buttonStyle: {
        width: 25,
        height: 25,
        padding: 0,
      },
    },
    checkButton: {
      checkedIcon: {
        color: theme.palette.primary1Color,
        width: 24,
        height: 24,
      },
      uncheckedIcon: {
        width: 24,
        height: 24,
      },
    },
    selectionColumn: {
      width: 42,
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
}
