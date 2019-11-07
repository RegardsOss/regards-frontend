/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Styles for module
 * @author Sébastien binda
 */
const styles = theme => ({
  configuration: {
    rootStyle: {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    tree: {
      container: {
        flexGrow: 1, // 1/4 page
        flexBasis: 0,
        borderColor: theme.palette.borderColor,
        borderWidth: '0 1px 0 0',
        borderStyle: 'solid',
      },
      cell: {
        root: {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          cursor: 'pointer',
        },
        selected: {
          icon: {
            color: theme.palette.accent1Color,
          },
          section: {
            color: theme.palette.accent1Color,
            marginLeft: 10,
            fontSize: '1.2em',
          },
          page: {
            color: theme.palette.accent1Color,
            marginLeft: 10,
          },
        },
        regular: {
          icon: {
            color: theme.palette.textColor,
          },
          section: {
            marginLeft: 10,
            fontSize: '1.2em',
          },
          page: {
            marginLeft: 10,
          },
        },
      },
    },
    content: {
      container: {
        flexGrow: 3, // 3/4 page
        flexBasis: 0,
        marginTop: 12,
        paddingLeft: 20,
      },
      tableFieldSpacer: {
        marginTop: theme.components.infiniteTable.minHeaderRowHeight,
      },
    },
  },
  user: {
    titleBar: {
      container: {
        display: 'flex',
        grow: 1,
        shrink: 1,
        justifyContent: 'space-between',
      },
      title: {
        grow: 0,
        shrink: 0,
      },
      tabsContainer: {
        display: 'flex',
        grow: 0,
        shrink: 0,
        alignSelf: 'flex-end',
      },
      tab: {
        selectedContainer: {
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.module.searchResults.tabs.selectedColor,
          margin: theme.module.searchResults.tabs.externalMargin,
          minWidth: theme.module.searchResults.tabs.minWidth,
          maxWidth: theme.module.searchResults.tabs.maxWidth,
        },
        unselectedContainer: {
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.module.searchResults.tabs.unselectedColor,
          margin: theme.module.searchResults.tabs.externalMargin,
          minWidth: theme.module.searchResults.tabs.minWidth,
          maxWidth: theme.module.searchResults.tabs.maxWidth,
        },
        iconAndTextGroup: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          flexGrow: 1,
          flexShrink: 1,
          margin: theme.module.searchResults.tabs.iconAndTextMargin,
          minWidth: 0,
        },
        iconColor: theme.palette.textColor,
        icon: {
          flexGrow: 0,
          flexShrink: 0,
        },
        label: {
          flexGrow: 0,
          flexShrink: 1,
          padding: theme.module.searchResults.tabs.textMargin,
          color: theme.palette.textColor,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        closeIconButton: {
          padding: 0,
          flexGrow: 0,
          flexShrink: 0,
          alignSelf: theme.module.searchResults.tabs.closeButton.alignSelf,
          margin: theme.module.searchResults.tabs.closeButton.margin,
          width: theme.module.searchResults.tabs.closeButton.size,
          height: theme.module.searchResults.tabs.closeButton.size,
        },
        closeIcon: {
          width: theme.module.searchResults.tabs.closeButton.size,
          height: theme.module.searchResults.tabs.closeButton.size,
        },
      },
    },
    rootModuleContainer: {
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    tabContent: {
      borderDisplayer: {
        flexGrow: 1,
        flexShrink: 1,
        display: 'flex',
        alignItems: 'stretch',
        borderTopColor: theme.module.searchResults.tabs.selectedColor,
        borderTopWidth: theme.module.searchResults.tabs.tabBottomLineSize,
        borderTopStyle: 'solid',
      },
      layoutContainer: {
        flexGrow: 1,
        flexShrink: 1,
        position: 'relative',
      },
      hiddenTabContent: {
        zIndex: 0,
        backgroundColor: theme.palette.canvasColor,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      shownTabContent: {
        zIndex: 1,
        backgroundColor: theme.palette.canvasColor,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    viewModeButton: {
      minWidth: theme.button.iconButtonSize,
    },
    columnsDialog: {
      widthPercent: 70,
      heightPercent: 80,
      actionsContainer: {
        display: 'flex',
      },
      actionsSeparator: {
        flexGrow: 1,
        flexShrink: 1,
      },
      visibleColumnCell: {
        color: theme.palette.textColor,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      hiddenColumnCell: {
        color: theme.palette.disabledColor,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    filters: {
      iconColor: theme.palette.accent1Color,
      style: {
        margin: '0 5px',
      },
    },
    listViewStyles: {
      rootStyles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
      },
      title: {
        rootStyles: {
          padding: '5px 5px 5px 0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        labelGroup: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
        },
        checkboxStyles: {
          margin: '2px 0 0 0',
          width: 'auto',
        },
        labelStyles: {
          fontSize: '1.3em',
          padding: '8px 8px',
          color: theme.palette.textColor,
        },
        optionsBarStyles: {
          display: 'flex',
        },
        option: {
          buttonStyles: {
            width: 32,
            height: 32,
            padding: 4,
          },
          iconStyles: {
            width: 24,
            height: 24,
          },
        },
      },
      attributesStyles: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      },
      labelColumnStyles: {
        margin: '10px 0 10px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexGrow: 0,
        flexShrink: 0,
      },
      labelCellStyle: {
        color: theme.palette.accent1Color,
        margin: '5px 0 0 0',
      },
      valueColumnStyles: {
        margin: theme.module.searchResults.list.attribute.labelMargin,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 0, // required to get same columns sizes (as well as valueCellStyle maxWidth)
        flexBasis: 0, // required to get same columns sizes (as well as valueCellStyle maxWidth)
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
      },
      valueCellStyle: { // for groups
        margin: theme.module.searchResults.list.attribute.valueMargin,
        display: 'flex',
        justifyContent: 'flex-start',
        maxWidth: '100%', // required to diminish contained cells width (text 'pushes' column width otherwise)
      },
      thumbnailColumnStyle: {
        margin: theme.module.searchResults.list.thumbnailMargin,
      },
      thumbnailDimensions: {
        width: theme.module.searchResults.list.thumbnailSize,
        height: theme.module.searchResults.list.thumbnailSize,
      },
    },
    quicklookViewStyles: {
      cardContentContainer: {
        display: 'flex',
      },
      imageStyle: {
        maxWidth: '100%',
      },
      pictureAndAttributesContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 1,
      },
      quicklookContainerStyle: {
        cursor: 'zoom-in',
        flexGrow: 1,
      },
      iconStyle: {
        width: '50%',
        height: '50%',
        margin: 'auto',
      },
      attributesContainer: {
        padding: 0,
      },
      optionsBarStyles: {
        display: 'flex',
        flexDirection: 'column',
      },
      option: {
        buttonStyles: {
          width: 32,
          height: 32,
          padding: 4,
        },
        iconStyles: {
          width: 24,
          height: 24,
        },
      },

    },
    mapViewStyles: {
      geoLayout: {
        flex: '1 1 0%',
        position: 'relative',
        background: theme.module.searchResults.map.background,
      },
      mizarWrapper: {
        height: 'auto',
        flex: '1 1 0%',
        width: '100%',
      },
      quicklookViewLayout: {
        background: theme.palette.canvasColor,
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.module.searchResults.map.quicklooks.padding,
      },
      quicklookImage: {
        width: '100%',
        height: theme.module.searchResults.map.quicklooks.thumbnailHeight,
        objectFit: 'contain',
      },
      toolsBox: {
        // overlay position
        position: 'absolute',
        top: 0,
        left: 0,
        // mimics table header styles
        backgroundColor: theme.palette.canvasColor,
        borderRight: `1px solid ${theme.tableRow.borderColor}`,
      },
      iconToolButton: {
        minWidth: theme.button.iconButtonSize,
      },
      resizer: {
        ...theme.module.searchResults.map.resizerSeparator,
      },
    },
  },
})

export default styles
