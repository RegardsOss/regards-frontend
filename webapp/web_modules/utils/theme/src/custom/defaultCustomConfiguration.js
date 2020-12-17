/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Additional mui theme properties for regards.
 * @author Sébastien Binda.
 */
export default (baseTheme) => ({
  palette: {
    background: '',
    backgroundImage: '',
  },
  components: {
    anchorScrollTop: {
      iconColor: baseTheme.palette.alternateTextColor,
      buttonColor: baseTheme.palette.primary1Color,
      buttonRight: 10,
      buttonBottom: 10,
    },
    editorACE: {
      theme: 'monokai',
    },
    download: {
      quotaWarningColor: '#FF9800',
      quotaConsumedColor: baseTheme.textField.errorColor,
      foregroundWarningPlacement: {
        top: -2,
        left: 12,
        width: 16,
        height: 16,
      },
    },
    scrollArea: {
      scrollingSidePadding: 15,
    },
    infiniteTable: {
      lineHeight: 50,
      fixedColumnsWidth: baseTheme.button.iconButtonSize, // best fit for default IconButton size
      minColumnsWidth: 200,
      minHeaderRowHeight: 40,
      multipleValuesSeparatorMargin: '0 10px',
      multipleValuesSeparatorHeight: 14,
      thumbnailPadding: 5,
      sortIndexNumber: {
        margin: '7px 0 -7px 0',
        fontSize: '10px',
        fontWeight: 'bold',
      },
      header: {
        checkbox: {
          margin: '0 12px 0 12px',
        },
      },
      admin: {
        minRowCount: 2,
        maxRowCount: 10,
      },
      fixedContentMarginBottom: 5,
    },
    treeTable: {
      expandIconSize: 32,
      expandIconPadding: 8,
      firstLevelIndentation: 8,
      nextLevelsIndentation: 24,
    },
    loadingContent: {
      container: {
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      circle: {
        size: 192,
        thickness: 1.5,
        color: baseTheme.subheader.color,
      },
      message: {
        fontWeight: '1em',
        padding: '24px 0 0 0',
        color: baseTheme.subheader.color,
      },
    },
    noData: {
      maxWidth: 400,
      minHeight: '30vh',
      icon: {
        size: 128,
        opacity: 0.2,
        color: baseTheme.palette.primary1Color,
      },
      title: {
        marginTop: '0.2em',
        color: baseTheme.palette.textColor,
        fontSize: '1.5em',
      },
      text: {
        marginTop: '0.6em',
        color: baseTheme.palette.textColor,
        fontSize: '1em',
        textAlign: 'center',
      },
    },
    filePreview: {
      iFrameBackground: 'white',
      markdownScrollbarColor: '#00202f',
    },
  },
  formsExtensions: {
    fieldHelpButton: {
      alignSelf: 'flex-end',
    },
    dateField: {
      marginTop: 14,
      innerMargins: '0 10px 0 0',
      height: 58,
      textTop: -13,
    },
    jsonField: {
      marginTop: 8,
      padding: '24px 0 12px 0',
      lineHeight: 1,
      height: 140,
      showLineNumbers: true,
    },
    validation: {
      infoColor: baseTheme.palette.primary1Color,
      validColor: '#4CAF50',
      warningColor: '#FF9800',
      errorColor: baseTheme.textField.errorColor,
    },
  },
  module: {
    // common to all modules (especially dynamic ones)
    common: {
      titleBarHeight: 48,
      titleMarginLeft: 8,
      titleIconSize: 24,
      titleTextMarginLeft: 0,
      titleFontSize: baseTheme.toolbar.titleFontSize,
      titleFontWeight: 500,
      titleTextTransform: undefined,
      subtitleMarginTop: -4,
      layoutOptionSize: 24,
      layoutOptionPadding: 3,
      layoutIconSize: 18,
      minContentHeight: 200,
    },
    // description module
    description: {
      breadcrumb: {
        link: {
          textPadding: '2px 0 0 5px',
          selected: {
            color: baseTheme.raisedButton.secondaryColor,
            fontSize: '18px',
            fontWeight: 500,
            iconSize: 24,
          },
          unselected: {
            color: baseTheme.palette.textColor,
            fontSize: '16px',
            fontWeight: 400,
            iconSize: 24,
            minWidth: 60,
          },
        },
        separator: {
          width: 32,
          height: 32,
          margin: '2px 0 0 0',
          color: baseTheme.palette.textColor,
        },
      },
      tree: {
        width: 400,
        borderColor: baseTheme.toolbar.separatorColor,
        borderWidth: '0 1px 0 0',
        iconButtonPadding: 4,
        iconSize: 24,
        iconToTextGap: 5,
        selectedColor: baseTheme.palette.accent1Color,
        unselectedColor: baseTheme.palette.textColor,
        section: {
          fontSize: '18px',
          linkTextDecoration: 'none',
          textTextDecoration: 'none',
          fontWeight: 500,
        },
        element: {
          fontSize: '16px',
          linkTextDecoration: 'underline',
          textTextDecoration: 'none',
          fontWeight: 400,
        },
      },
      contentPadding: '5px 21px 5px 21px',
      listPage: {
        element: {
          padding: 3,
          fontSize: '16px',
          fontWeight: 400,
          iconToTextGap: 5,
          linkTextDecoration: 'underline',
          margin: '0 24px 0 0',
        },
        rightIconButton: {
          size: 24,
          padding: 0,
        },
      },
      parameters: {
        thumbnail: {
          maxSize: 256,
          margin: '0 0 8px 0',
        },
        group: {
          title: {
            padding: '1em 0 0.5em 0',
            color: baseTheme.palette.accent1Color,
            fontSize: '18px',
          },
          titlePlaceholder: {
            padding: '1em 0 0.5em 0',
          },
          attribute: {
            label: {
              padding: '0.4em 24px 0.4em 0',
              textDecoration: 'underline',
              maxWidth: 400,
            },
            value: {
              padding: '0.4em 20px 0.4em 0',
              textDecoration: 'none',
            },
            multipleValuesSpacing: '0.7em',
          },
        },
      },
      quicklook: {
        groupLists: {
          width: 200,
          borderColor: baseTheme.toolbar.separatorColor,
          borderWidth: '0 1px 0 0',
          padding: 20,
          picturesGap: 20,
          picture: {
            width: 150,
            height: 150,
            borderWidth: 5,
            selectedColor: baseTheme.palette.accent1Color,
            unselectedColor: baseTheme.palette.canvasColor,
          },
        },
        normalPadding: 10,
        caption: {
          color: baseTheme.palette.accent1Color,
          padding: '10px 0 0 0',
        },
      },
    },
    embeddedHTML: {
      iFrame: {
        background: '',
      },
    },
    // menu module
    menu: {
      background: baseTheme.palette.canvasColor,
      borderColor: baseTheme.toolbar.separatorColor,
      borderWidth: '0 0 1px 0',
      borderStyle: 'solid',
      navigationBarMaxHeight: 36,
      navigationItemTextTransform: 'none',
      separatorBorderWidth: 2,
      separatorBorderRadius: 2,
      separatorBorderStyle: 'solid',
      separatorMargin: '12px 10px 12px 0',
      quotaWarningIcon: {
        size: 16,
        left: 16,
        top: 8,
      },
      quotaView: {
        rootPadding: baseTheme.spacing.desktopGutter,
        title: {
          padding: '0 0 20px 0',
          textPadding: '0 0 0 12px',
        },
        text: {
          padding: '0 0 8px 0',
        },
        currentState: {
          title: {
            padding: '20px 0 20px 0',
            textDecoration: 'underline',
            fontWeight: 500,
          },
          value: {
            padding: '0 0 8px 8px',
            fontWeight: 500,
            textPadding: '0 0 0 12px',
          },
        },
      },
    },
    // order car module
    orderCart: {
      totalRowFontColor: baseTheme.palette.accent2Color,
      totalRowFontWeight: 'bold',
      textToQuotaWarningGap: 24,
      selectionColumn: {
        paddingLeft: 8,
      },
    },
    // order history module
    orderHistory: {
      // common
      statusIconMargin: '0 7px 0 15px',
      clearEmailFilterPadding: '7px 16px 7px 8px',
      'waiting.user.download.animation': 'shake 3s infinite',
      // orders
      'color.PENDING': '#00BCD4',
      'color.RUNNING': baseTheme.palette.textColor,
      'color.WAITING_USER_DOWNLOAD': '#00BCD4',
      'color.PAUSED': '#00BCD4',
      'color.EXPIRED': baseTheme.textField.disabledTextColor,
      'color.FAILED': baseTheme.textField.errorColor,
      'color.DONE_WITH_WARNING': '#FF9800',
      'color.DONE': baseTheme.textField.disabledTextColor,
      'color.DELETED': baseTheme.textField.disabledTextColor,
      'color.REMOVED': baseTheme.textField.disabledTextColor,
      'color.UNKNOWN': baseTheme.textField.disabledTextColor,
      // files
      'color.file.PENDING': '#00BCD4',
      'color.file.AVAILABLE': baseTheme.palette.textColor,
      'color.file.ONLINE': baseTheme.palette.textColor,
      'color.file.DOWNLOADED': baseTheme.textField.disabledTextColor,
      'color.file.DOWNLOAD_ERROR': baseTheme.textField.errorColor,
      'color.file.PROCESSING_ERROR': baseTheme.textField.errorColor,
      'color.file.ERROR': baseTheme.textField.errorColor,
      'color.file.UNKNOWN': baseTheme.textField.disabledTextColor,
    },
    // search results module
    searchResults: {
      searchPane: {
        width: 600,
        root: {
          opacity: 1,
          borderColor: baseTheme.toolbar.separatorColor,
          borderStyle: 'solid',
          borderWidth: '0 0 0 1px',
        },
        titleBar: {
          height: 52,
          borderColor: baseTheme.toolbar.separatorColor,
          borderWidth: '0 0 1px 0',
          borderStyle: 'solid',
          backgroundColor: baseTheme.raisedButton.secondaryColor,
          iconMargin: '0 12px 0 12px',
          fontSize: baseTheme.flatButton.fontSize,
          fontWeight: baseTheme.flatButton.fontWeight,
        },
        criteria: {
          containerMargin: '10px 0',
          innerListMargin: '0 15px 0 10px',
          defaultRow: {
            height: 48,
          },
          firstCell: {
            padding: 0,
            whiteSpace: 'nowrap',
          },
          nextCell: {
            padding: '0 0 0 8px',
          },
          optionStyle: {
            width: undefined,
            height: undefined,
            padding: '4px 2px 0 2px',
          },
        },
        groupTitle: {
          fontSize: baseTheme.flatButton.fontSize,
          fontWeight: baseTheme.flatButton.fontWeight,
          color: baseTheme.flatButton.secondaryTextColor,
          padding: '15px 0 10px 0',
        },
        buttonsBar: {
          borderColor: baseTheme.toolbar.separatorColor,
          borderWidth: '1px 0 0 0',
          borderStyle: 'solid',
          padding: '5px 0',
        },
      },
      list: {
        lineHeight: 160,
        rowsByColumnCount: 4,
        thumbnailSize: 100,
        thumbnailMargin: '0 10px 10px 10px',
        attribute: {
          groupMargin: '5px 5px 0 5px',
          label: {
            margin: '0 0 5px 0',
            color: baseTheme.palette.textColor,
            textDecoration: 'underline',
          },
          value: {
            margin: '0 0 5px 0',
            color: baseTheme.palette.textColor,
          },
        },
      },
      quicklooks: {
        columnWidth: 400,
        columnGap: 20,
      },
      map: {
        background: 'black', // related with mizar background
        mizar: {
          minWidth: 500,
          initialRelativeWidth: 0.7,
          featureColor: 'darkred',
          drawColor: baseTheme.palette.accent1Color,
          selectedFeatureColor: baseTheme.palette.accent1Color,
          selectedColorOutlineWidth: 3,
          selectedBackgroundColor: baseTheme.palette.accent1Color,
        },
        quicklooks: {
          minWidth: 260,
          thumbnailHeight: 160,
          columnWidth: 180,
          columnGap: 15,
          padding: '12px 5px 5px 5px',
          selectedColor: baseTheme.palette.accent1Color,
        },
        resizerSeparator: {
          backgroundColor: baseTheme.palette.borderColor,
          halfSize: 6,
        },
      },
      tabs: {
        selectedColor: baseTheme.raisedButton.secondaryColor,
        unselectedColor: baseTheme.raisedButton.disabledColor,
        externalMargin: '0 2px 0 0',
        minWidth: '200px',
        maxWidth: '200px',
        iconAndTextMargin: '5px',
        textMargin: '0 5px 0 7px',
        closeButton: {
          margin: '0 0 0 5px',
          size: 15,
          alignSelf: 'flex-start',
        },
        tabBottomLineSize: 1,
      },
    },
  },
  sessionsMonitoring: {
    rowHeight: 120,
    sessionState: {
      errorColor: baseTheme.textField.errorColor,
    },
    waitingVersionColor: baseTheme.palette.accent1Color,
    acquiredProductRunningColor: '#4CAF50',
  },
})
