/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
    minHeight: theme.components.infiniteTable.minHeaderRowHeight,
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
    dialog: {
      columnsVisibilityDialog: {
        titleBarStyle: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      },
    },
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
        minHeight: theme.components.infiniteTable.minHeaderRowHeight,
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
        reducibleRightAreaStyle: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          flexShrink: 1,
          flexGrow: 0,
          margin: '0 0 3px 0',
        },
        reducibleLeftAreaStyle: {
          display: 'flex',
          flexDirection: 'row',
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
      autocomplete: {
        textStyle: {
          height: theme.components.infiniteTable.minHeaderRowHeight - 2,
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
          width: 38,
          height: 38,
          padding: 0,
        },
        sortComposedIconStyle: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
        sortIndexStyle: {
          lineHeight: 1,
          color: theme.palette.textColor,
          fontSize: theme.components.infiniteTable.sortIndexNumber.fontSize,
          fontWeight: theme.components.infiniteTable.sortIndexNumber.fontWeight,
          margin: theme.components.infiniteTable.sortIndexNumber.margin,
        },
      },
    },
    cellOdd: {
      ...commonCellOdd,
    },
    lastCellOdd: { ...commonCellOdd },
    cellEven: {
      ...commonCellEven,
    },
    lastCellEven: { ...commonCellEven },
    checkBoxCell: {
      backgroundColor: theme.table.backgroundColor,
      borderBottom: `1px solid ${theme.tableRow.borderColor}`,
    },
    multipleCellValuesSeparator: {
      borderLeft: `1px solid ${theme.tableRow.borderColor}`,
      margin: theme.components.infiniteTable.multipleValuesSeparatorMargin,
      flexGrow: 0,
      flexShrink: 0,
      height: theme.components.infiniteTable.multipleValuesSeparatorHeight,
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
    progressBar: {
      interiorStyle: {
        textAlign: 'left',
        fontSize: '0.8em',
        fontWeight: 'bold',
        paddingLeft: 5,
        width: 100,
      },
      barStyle: {
        padding: '1px 3px',
      },
      borderStyle: {
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: theme.palette.primary1Color,
      },
      backgroundStyle: {
        backgroundColor: theme.palette.primary1Color,
      },
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
