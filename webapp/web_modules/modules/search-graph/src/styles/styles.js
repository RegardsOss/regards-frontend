/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */

/**
 * Styles for menu module
 * @author Sébastien binda
 */
const menuStyles = (theme) => {
  // columns width specificions (used by inner divisions)
  const column = {
    leftMargin: 10,
    rightMargin: 2,
    bestWidth: 180,
    maxWidth: 465,
  }
  const progressSize = 120
  return {
    user: {
      toggle: {
        width: 'auto', // prevent material UI 100% width behavior........
      },
      scrollArea: {
        fullscreenStyles: {
          flexGrow: 1,
          flexShrink: 1,
          maxHeight: `calc(100vh - ${theme.module.common.titleBarHeight}px)`,
        },
        defaultStyles: {
          flexGrow: 1,
          flexShrink: 1,
          maxHeight: theme.module.common.minContentHeight,
        },
      },
      graphScrollableContent: {
        styles: {
          display: 'flex',
        },
      },
      // levels container
      levels: {
        styles: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'flexStart',
          alignItems: 'flexStart',
          padding: '10px 0 15px 0',
          flexShrink: 0, // use to ensure the viewport width
        },
      },
      // level items container
      level: {
        styles: {
          padding: `0 ${column.rightMargin}px 0px ${column.leftMargin}px`,
          minWidth: `${column.bestWidth}px`,
          maxWidth: `${column.maxWidth}px`,
          borderStyle: 'solid',
          borderWidth: '0 1px 0 0',
          borderColor: theme.toolbar.separatorColor,
        },
      },
      // level loading pane
      levelLoading: {
        styles: {
          margin: `0 0 0 ${((column.bestWidth - progressSize) / 2) - column.leftMargin}px`,
        },
        progressConfiguration: {
          thickness: 1.5,
          color: theme.palette.secondaryTextColor,
          size: progressSize,
        },
      },
      levelMessage: {
        styles: {
          alignSelf: 'center',
          maxWidth: `${column.bestWidth - (column.leftMargin + column.rightMargin)}px`,
          wordBreak: 'break-all',
          fontSize: '0.9em',
          margin: '5px 0 0 0',
          textAlign: 'center',
          verticalAlign: 'middle',
        },
      },
      datasetItem: {
        styles: {
          padding: '0px 10px 3px 0',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        },
        attributes: {
          container: {
            commonStyles: {
              display: 'table',
              margin: '2px 25px 0 8px',
              color: theme.palette.secondaryTextColor, // configures attributes label text color
              borderWidth: '0 0 0 1px',
              borderStyle: 'solid',
            },
            defaultStyles: {
              borderColor: theme.toolbar.separatorColor,
            },
            selectedStyles: {
              borderColor: theme.palette.accent2Color,
            },
            hoverStyles: {
              borderColor: theme.palette.accent1Color,
            },
            lockedStyles: {
              borderColor: theme.palette.disabledColor,
              color: theme.palette.disabledColor,
            },
          },
          line: {
            styles: {
              display: 'table-row',
            },
          },
          detailsLabel: {
            styles: {
              fontSize: '0.85em',
              padding: '2px 0 0 14px',
              display: 'table-cell',
              whiteSpace: 'nowrap',
              verticalAlign: 'text-top',
            },
          },
          detailsValue: {
            commonStyles: {
              fontSize: '0.75em',
              padding: '2px 0 0 15px',
              display: 'table-cell',
              color: theme.palette.textColor,
            },
            lockedStyles: {
              color: theme.palette.disabledColor,
            },
          },
        },
      },
      collectionItem: {
        styles: {
          padding: '0px 10px 3px 0',
        },
        arrow: {
          // defining here only the common styles, hover / selected styles are re-used from item links
          commonStyles: {
            width: 20,
            height: 20,
            transform: 'rotate(-90deg) ',
            marginRight: 0,
            translateY: 2,
            flexShrink: 0,
            flexGrow: 0,
          },
        },
      },
      // styles common to datasets and collections labels
      itemLink: {
        root: {
          commonStyles: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexGrow: 1,
          },
          defaultStyles: {
            cursor: 'pointer',
          },
          selectedStyles: {
            cursor: 'pointer',
          },
          hoverStyles: {
            cursor: 'pointer',
          },
          lockedStyles: {
            cursor: 'default',
          },
        },
        iconsOverlay: {
          styles: {
            position: 'relative',
            height: 20,
            width: 20,
            flexShrink: 0,
            flexGrow: 0,
            margin: '0 8px 0 0',
          },
        },
        icon: {
          // common styles for all states
          commonStyles: {
            position: 'absolute',
            zIndex: '0',
            height: 20,
            width: 20,
            top: 0,
            left: 0,
          },
          defaultStyles: {
            color: theme.palette.textColor,
          },
          selectedStyles: {
            color: theme.palette.accent2Color,
          },
          hoverStyles: {
            color: theme.palette.accent1Color,
          },
          lockedStyles: {
            color: theme.palette.disabledColor,
          },
        },
        lockIcon: {
          styles: {
            position: 'absolute',
            zIndex: '1',
            width: 12,
            height: 12,
            right: 0,
            bottom: 0,
            color: theme.palette.accent1Color,
          },
        },
        text: {
          // common styles for all states
          commonStyles: {
            margin: '3px 0 0 0',
            wordBreak: 'break-all',
            flexShrink: 1,
            flexGrow: 1,
          },
          defaultStyles: {
            color: theme.palette.textColor,
          },
          selectedStyles: {
            color: theme.palette.accent2Color,
          },
          hoverStyles: {
            color: theme.palette.accent1Color,
          },
          lockedStyles: {
            color: theme.palette.disabledColor,
          },
        },
        informationButton: {
          styles: {
            width: 20,
            height: 20,
            padding: 0,
            marginLeft: 5,
          },
          iconStyles: {
            width: 18,
            height: 18,
            color: theme.palette.accent2Color,
            opacity: 0.7,
          },
        },
      },
    },
  }
}

export default menuStyles
