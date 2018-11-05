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

export default theme => ({
  thumbnailRoot: {
    height: '100%',
    width: '100%',
  },
  thumbnailCell: {
    display: 'block',
    cursor: 'pointer',
    maxWidth: '100%',
    maxHeight: '100%',
    padding: theme.components.infiniteTable.thumbnailPadding,
  },
  noThumbnailIcon: {
    padding: 5,
    height: '100%',
    width: '100%',
  },
  // attributes configuration
  configuration: {
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
        tableHolderStyle: {
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 5, // no matter the value, it just avoids empty table to be smaller
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
