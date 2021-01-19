/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

export default (theme) => ({
  defaultThumbnailStyle: {
    width: theme.components.infiniteTable.lineHeight,
    height: theme.components.infiniteTable.lineHeight,
    padding: theme.components.infiniteTable.thumbnailPadding,
  },
  // attributes configuration
  configuration: {
    tableContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexGrow: 1,
      flexShrink: 1,
      minHeight: 0,
      borderWidth: '1px 0 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
    },
    addManyDialog: {
      widthPercent: 40,
      heightPercent: 80,
      dialogBodyStyle: { paddingBottom: 0 },
      contentStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: 1,
        flexShrink: 1,
        minHeight: 0, // mandatory to get scroll area working on firefox (Thor #183319)
      },
      scrollableAreaStyle: {
        flexGrow: 1,
        flexShrink: 1,
      },
      actionsStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 0,
        flexShrink: 0,
        padding: '10px 0',
      },
    },
    editDialog: {
      widthPercent: 80,
      heightPercent: 80,
      dialogBodyStyle: { paddingBottom: 0 },
      formStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: 1,
        flexShrink: 1,
        minHeight: 0, // mandatory to get scroll area working on firefox (Thor #183319)
      },
      scrollableAreaStyle: {
        flexGrow: 1,
        flexShrink: 1,
      },
      multipleSelector: {
        rootStyle: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        },
        fieldLabelStyle: {
          paddingTop: 20,
          paddingLeft: 0,
          paddingBottom: 10,
          lineHeight: 1,
        },
        verticalSeparatorStyle: {
          flexGrow: 0,
          flexShrink: 0,
          minWidth: 1,
          background: theme.toolbar.separatorColor,
          marginTop: theme.components.infiniteTable.minHeaderRowHeight,
          marginRight: 20,
          marginLeft: 20,
        },
        firstTableHolderStyle: {
          flexGrow: 2,
          flexShrink: 1,
          flexBasis: 0, // no matter the value, it just avoids empty table to be smaller
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        },
        secondTableHolderStyle: {
          flexGrow: 3,
          flexShrink: 1,
          flexBasis: 0, // no matter the value, it just avoids empty table to be smaller
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        },
      },
      actionsStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexGrow: 0,
        flexShrink: 0,
        padding: '10px 0',
      },
    },
  },
})
