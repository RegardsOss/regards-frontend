/**
 * LICENSE_PLACEHOLDER
 */

/**
 * Styles for menu module
 * @author Sébastien binda
 */
const menuStyles = (theme) => {
  // columns width specificions (used by inner divisions)
  const column = {
    leftMargin: 10,
    rightMargin: 10,
    bestWidth: 250,
    maxWidth: 450,
  }
  const progressSize = 120
  const scrollContainerStyles = { background: 'rgba(0,0,0,0)' }
  const scrollbarStyles = {
    background: theme.palette.textColor,
    borderRadius: '3px',
    width: '6px',
  }

  return {
    admin: {
      form: {
        graphLevelsRender: {
          classes: 'row',
          styles: {
            padding: '0 0 0 20px',
          },
          selectedLevelsTable: {
            classes: 'col-xs-65 col-lg-60',
            styles: {
              padding: '0 0 1em 0',
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
            classes: 'col-xs-35 col-lg-40',
            styles: {
              padding: '1em 0 0 1em',
            },
            labelPosition: 'before',
          },
          errorMessage: {
            classes: 'col-xs-100',
            styles: {
              padding: '1em 0 0 0',
              color: theme.textField.errorColor,
            },
          },
        },
      },
    },
    user: {
      // graph container (contains scrollable area)
      graph: {
        styles: {
          padding: '0 10px 0 10px',
        },
      },
      // scrolling definition
      scrolling: {
        width: '100%',
        height: 250,
        verticalScrollContainer: {
          styles: scrollContainerStyles,
        },
        horizontalScrollContainer: {
          styles: scrollContainerStyles,
        },
        verticalScrollbar: {
          styles: scrollbarStyles,
        },
        horizontalScrollbar: {
          styles: scrollbarStyles,
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
          padding: '0 0 15px 0',
          flexShrink: 0, // use to ensure the viewport width
        },
      },
      // level items container
      level: {
        styles: {
          padding: `0 ${column.leftMargin}px 0px ${column.rightMargin}px`,
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
          padding: '0px 25px 5px 0',

        },
      },
      collectionItem: {
        styles: {
          padding: '0px 5px 5px 0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
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
            margin: '2px 10px 0 0',
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
            fontSize: '1em',
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
            padding: 1,
            margin: '0 0 0 5px',
          },
          iconStyles: {
            width: 18,
            height: 18,
            color: theme.palette.accent2Color,
          },
        },
      },
    },
  }
}

export default menuStyles
