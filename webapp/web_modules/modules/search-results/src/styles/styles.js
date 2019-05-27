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
    rootModuleContainer: {
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
      flexDirection: 'column',
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
        margin: '10px 0 5px 0',
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
        margin: '10px 0 5px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 0, // required to get same columns sizes (as well as valueCellStyle maxWidth)
        flexBasis: 0, // required to get same columns sizes (as well as valueCellStyle maxWidth)
        flexGrow: 1,
        flexShrink: 1,
      },
      valueCellStyle: { // for groups
        margin: '5px 0 0 0',
        display: 'flex',
        justifyContent: 'flex-start',
        maxWidth: '100%', // required to diminish contained cells width (text 'pushes' column width otherwise)
      },
      thumbnailColumnStyle: {
        width: '110px',
        display: 'block',
        padding: '5px 0px 10px 10px',
      },
    },
    quicklookViewStyles: {
      imageStyle: {
        maxWidth: '100%',
      },
      imageAndOptionsContainer: {
        display: 'flex',
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
      attributesContainer: {
        padding: 0,
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
        maxWidth: '100%',
        height: theme.module.searchResults.map.quicklooks.thumbnailHeight,
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
