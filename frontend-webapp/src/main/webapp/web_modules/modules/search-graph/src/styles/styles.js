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
    admin: {
      form: {
        graphLevelsRender: {
          styles: {
            padding: '0 0 0 20px',
            display: 'flex',
            flexDirection: 'column',
          },
          tableContainer: {
            styles: {
              display: 'flex',
              flexDirection: 'row',
            },
          },
          selectedLevelsTable: {
            styles: {
              padding: '0 0 1em 0',
              flexGrow: 1,
              flexShrink: 1,
            },
            hintMessage: {
              styles: {
                color: theme.textField.hintColor,
              },
            },
            columnLevel: {
              styles: {
                width: '70px',
              },
            },
            columnName: {
              styles: {
                width: '25%',
              },
            },
            columnActions: {
              styles: {
                width: '70px',
              },
            },
          },
          addButton: {
            styles: {
              padding: '1em 0 0 1em',
              flexGrow: '0',
              flexShrink: '0',
            },
            labelPosition: 'before',
          },
          errorMessage: {
            styles: {
              padding: '1em 0 0 0',
              color: theme.textField.errorColor,
            },
          },
        },
      },
    },
    user: {
      // root card container
      styles: {
        margin: '0 0 10px 0',
      },
      // graph container (contains scrollable area)
      graph: {
        styles: {
          borderStyle: 'solid',
          borderWidth: '1px 0 0 0',
          borderColor: theme.toolbar.separatorColor,
        },
      },
      // graph header styles
      header: {
        styles: {
          background: theme.palette.canvasColor,
          height: '', // remove useless MUI height there!
        },
        firstToolbarGroup: {
          styles: {
            flexGrow: 1,
          },
        },
        cardTitle: {
          styles: {
            padding: '10px',
          },
          titleStyles: {
            lineHeight: '', // remove wrong height!
            padding: '0 0 5px 0',
          },
        },
        collapseButton: {
          styles: {
            width: 48,
            height: 48,
          },
          iconStyles: {
            width: 24,
            height: 24,
          },
        },
      },
      // scrolling definition
      scrolling: {
        width: '100%',
        height: 250,
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
          wordWrap: 'break-word',
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
              fontSize: '0.75em',
              padding: '0 0 0 14px',
              display: 'table-cell',
            },
          },
          detailsValue: {
            commonStyles: {
              fontSize: '0.75em',
              padding: '0 0 0 15px',
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
            transform: 'rotate(-90deg)',
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
            height: 16,
            width: 16,
            flexShrink: 0,
            flexGrow: 0,
            margin: '2px 6px 0 0',
          },
        },
        icon: {
          // common styles for all states
          commonStyles: {
            position: 'absolute',
            zIndex: '0',
            height: 16,
            width: 16,
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
            margin: '2px 0 0 0',
            fontSize: '0.95em',
            wordWrap: 'break-word',
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
            padding: 2,
          },
          iconStyles: {
            width: 16,
            height: 16,
            color: theme.palette.accent2Color,
            opacity: 0.7,
          },
        },
      },
    },
  }
}

export default menuStyles
