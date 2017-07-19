/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
    textAlign: 'center',
  }

  const commonCellOdd = {
    backgroundColor: theme.table.backgroundColor,
    borderBottom: cellBorder,
    textAlign: 'center',
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
          alignItems: 'flex-end',
          flexWrap: 'noWrap',
          flexShrink: 0,
          flexGrow: 0,
        },
      },
      customOptions: {
        styles: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexShrink: 1,
          flexGrow: 1,
        },
      },
      contextOptionsSeparator: {
        styles: {
          width: '1px',
          height: '24px',
          margin: '0 10px 0 10px',
          backgroundColor: theme.toolbar.separatorColor,
        },
      },
      text: {
        styles: {
          color: theme.palette.textColor,
          margin: '1em 1em 1em 1em',
        },
      },
      loading: {
        styles: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 0 0 1em',
        },
        progress: {
          thickness: 1.5,
          size: 22,
          color: theme.palette.textColor,
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
      textAlign: 'center',
      // borderRight: cellBorder,
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
    actionsMenuCellWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    actionsMenuCellPopupWrapper: {
      display: 'flex',
      justifyContent: 'space-around',
    },
  })
}
