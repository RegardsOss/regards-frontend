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
  const headerBottomBorder = cellBorder

  const commonHeaderCellStyles = {
    backgroundColor: theme.table.backgroundColor,
    color: theme.tableHeaderColumn.textColor,
    fontFamily: theme.fontFamily,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: cellBorder,
    minHeight: theme['components:infinite-table'].minHeaderRowHeight,
  }

  const commonCell = {
    color: theme.tableRow.textColor,
    fontFamily: theme.fontFamily,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  }

  const commonCellEven = {
    ...commonCell,
    backgroundColor: theme.table.backgroundColor,
    borderBottom: cellBorder,
  }

  const commonCellOdd = {
    ...commonCell,
    backgroundColor: theme.tableRow.stripeColor,
    borderBottom: cellBorder,
  }

  return ({
    header: {
      rootStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      },
      dividerStyle: {
        width: '100%',
      },
      rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexGrow: 1,
        flexShrink: 1,
        minHeight: theme['components:infinite-table'].minHeaderRowHeight,
        borderBottom: headerBottomBorder,
      },
      optionsGroup: {
        fixedAreaStyle: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          flexShrink: 0,
          flexGrow: 0,
          margin: '0 0 3px 0',
        },
        reducibleAreaStyle: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          flexShrink: 1,
          flexGrow: 0,
          margin: '0 0 3px 0',
        },
        flexShrink: 0,
        groupStyle: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flexShrink: 0,
          flexGrow: 0,
        },
        separatorStyle: {
          alignSelf: 'center',
          width: '1px',
          height: '24px',
          margin: '0 10px 0 10px',
          backgroundColor: theme.toolbar.separatorColor,
        },
      },
      contentBox: {
        style: {
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          wrap: 'wrap',
        },
        textStyle: {
          margin: '0 10px',
          color: theme.palette.textColor,
        },
      },
      loading: {
        thickness: 1.5,
        size: 22,
        color: theme.palette.primary1Color,
      },
      cellHeader: {
        ...commonHeaderCellStyles,
        alignItems: 'center',
        textAlign: 'center',
        // borderRight: cellBorder,
      },
      lastCellHeader: {
        ...commonHeaderCellStyles,
        alignItems: 'center',
      },
      sortableHeader: {
        style: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
        sortButtonStyle: {
          width: 32,
          height: 32,
          padding: 4,
        },
        sortIconStyle: {
          width: 24,
          height: 24,
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
    checkBoxCell: {
      backgroundColor: theme.table.backgroundColor,
      borderBottom: `1px solid ${theme.tableRow.borderColor}`,
    },
    multipleCellValuesSeparator: {
      borderLeft: `1px solid ${theme.tableRow.borderColor}`,
      margin: theme['components:infinite-table'].multipleValuesSeparatorMargin,
      flexGrow: 0,
      flexShrink: 0,
      height: theme['components:infinite-table'].multipleValuesSeparatorHeight,
    },
    multipleCellValues: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      maxWidth: '100%',
    },
    checkButton: {
      styles: {
        width: 32,
        height: 32,
        padding: 0,
      },
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
    loadingComponent: {
      styles: {
        height: '45vh',
      },
    },
  })
}
