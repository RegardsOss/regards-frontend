/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildSplitResizerStyle } from '@regardsoss/components'

import { getMenuItemStyle } from '@regardsoss/toponym-common'

/**
 * Styles for module
 * @author Sébastien binda
 * @author Théo Lasserre
 */
const styles = (theme) => ({
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
      table: {
        minWidth: 280,
      },
      cell: {
        root: {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
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
        borderStyle: 'solid',
        borderColor: theme.toolbar.separatorColor,
        borderWidth: '1px 0 0',
      },
      searchPane: {
        defaultRowsCount: 5,
        showLabelColumnWidth: 100,
        loading: {
          size: 256,
          thickness: 1.5,
          style: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 48,
          },
        },
        empty: {
          root: {
            display: 'flex',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 48,
            flexDirection: 'column',
            alignItems: 'center',
          },
          message: {
            color: theme.palette.secondaryTextColor,
          },
          button: {
            marginTop: 20,
          },
        },
        groupIdCell: {
          root: {
            flexGrow: 1,
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center',
          },
          icon: {
            color: theme.palette.accent1Color,
          },
          text: {
            color: theme.palette.accent1Color,
            paddingLeft: 8,
            fontWeight: 500,
          },
        },
        commonCell: {
          default: { // editable
            padding: 5,
            flexGrow: 1,
            textAlign: 'left',
            wordBreak: 'break-word',

          },
          inactive: { // not editable
            padding: 5,
            flexGrow: 1,
            textAlign: 'left',
            wordBreak: 'break-word',

          },
          error: {
            padding: 5,
            flexGrow: 1,
            color: theme.formsExtensions.validation.errorColor,
            textAlign: 'left',
            wordBreak: 'break-word',
          },
        },
        criterionIdCell: {
          default: {
            paddingLeft: 32,
            flexGrow: 1,
            textAlign: 'left',
          },
          error: {
            paddingLeft: 32,
            color: theme.formsExtensions.validation.errorColor,
            flexGrow: 1,
            textAlign: 'left',
          },
          menuItem: {
            headerRow: {
              display: 'flex',
              justifyContent: 'space-between',
            },
            headerText: {
              fontWeight: 500,
              color: theme.palette.textColor,
            },
            authorText: {
              color: theme.palette.textColor,
              textDecoration: 'underline',
            },
            descriptionText: {
              color: theme.palette.textColor,
            },
          },
        },
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
    searchPane: {
      rootContainer: {
        ...theme.module.searchResults.searchPane.root,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      },
      title: {
        container: {
          height: theme.module.searchResults.searchPane.titleBar.height,
          borderColor: theme.module.searchResults.searchPane.titleBar.borderColor,
          borderWidth: theme.module.searchResults.searchPane.titleBar.borderWidth,
          borderStyle: theme.module.searchResults.searchPane.titleBar.borderStyle,
          backgroundColor: theme.module.searchResults.searchPane.titleBar.backgroundColor,
          flexGrow: 0,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
        },
        icon: {
          width: theme.spacing.iconSize,
          height: theme.spacing.iconSize,
          margin: theme.module.searchResults.searchPane.titleBar.iconMargin,
        },
        text: {
          fontSize: theme.module.searchResults.searchPane.titleBar.fontSize,
          fontWeight: theme.module.searchResults.searchPane.titleBar.fontWeight,
          flexGrow: 1,
          flexShrink: 1,
        },
      },
      criteria: {
        container: {
          margin: theme.module.searchResults.searchPane.criteria.containerMargin,
          flexGrow: 1,
          flexShrink: 1,
        },
        scrollableContent: {
          padding: theme.module.searchResults.searchPane.criteria.innerListMargin,
        },
        table: {
          width: '100%',
        },
        groupTitle: {
          ...theme.module.searchResults.searchPane.groupTitle,
        },
      },
      buttons: {
        container: {
          display: 'flex',
          justifyContent: 'center',
          flexGrow: 0,
          flexShrink: 0,
          borderColor: theme.module.searchResults.searchPane.buttonsBar.borderColor,
          borderWidth: theme.module.searchResults.searchPane.buttonsBar.borderWidth,
          borderStyle: theme.module.searchResults.searchPane.buttonsBar.borderStyle,
          padding: theme.module.searchResults.searchPane.buttonsBar.padding,
          width: '100%',
        },
        labelStyle: {
          fontSize: '12px',
        },
        historyButton: {
          width: '149px',
        },
        clearButton: {
          width: '130px',
        },
        searchButton: {
          width: '160px',
        },
        saveButton: {
          width: '162px',
        },
      },
      chipDivStyle: {
        position: 'fixed',
        display: 'flex',
        width: '97%',
        justifyContent: 'end',
      },
      chipLabelColor: theme.palette.accent1Color,
      chipLabelStyle: {
        fontWeight: 'bold',
      },
    },
    searchHistoryPane: {
      cellWrapperStyle: {
        borderBottom: 'none',
        marginTop: '10px',
      },
      raisedButtonStyle: {
        width: '95%',
        height: '56px',
      },
      raisedButtonOverlayStyle: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
      },
      raisedLabelStyle: {
        width: '85%',
        textTransform: 'none',
      },
      iconStyle: {
        color: theme.formsExtensions.validation.errorColor,
      },
    },
    saveHistoryPane: {
      mainDivStyle: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '60px',
      },
      buttonsDivStyle: {
        display: 'flex',
        width: '40%',
        justifyContent: 'space-evenly',
      },
      textFieldStyle: {
        marginTop: '5px',
        marginBottom: '5px',
      },
      updateElementStyle: {
        width: '256px',
        height: '48px',
        fontSize: '16px',
        marginTop: '5px',
        marginBottom: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: theme.palette.accent1Color,
      },
    },
    rootModuleContainer: {
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    tabContent: {
      downloadButtonStyle: {
        popoverStyle: {
          maxWidth: '800px',
        },
      },
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
    searchButton: {
      backgroundColor: theme.palette.accent1Color,
      borderRadius: '3px',
      border: 'none',
      marginTop: '2px',
      marginRight: '5px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
    },
    columnsDialog: {
      widthPercent: 50,
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
        flexGrow: 1,
        flexShrink: 1,
        textAlign: 'left',
      },
      hiddenColumnCell: {
        color: theme.palette.disabledColor,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flexGrow: 1,
        flexShrink: 1,
        textAlign: 'left',
      },
    },
    ordersDialog: {
      widthPercent: 50,
      heightPercent: 80,
      labelColumnCell: {
        color: theme.palette.textColor,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flexGrow: 1,
        flexShrink: 1,
      },
      actionsContainer: {
        display: 'flex',
      },
      actionsSeparator: {
        flexGrow: 1,
        flexShrink: 1,
      },
    },
    filters: {
      iconColor: theme.palette.accent1Color,
      errorColor: theme.textField.errorColor,
      disabledColor: theme.palette.textColor,
      style: {
        margin: '0 5px',
      },
      styleInactive: {
        margin: '0 5px',
        textDecoration: 'line-through',
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
        checkBoxRippleStyle: {
          left: '0px',
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
      altOptionsBarStyles: {
        display: 'flex',
        alignItems: 'flex-start',
        height: '100%',
        padding: '5px 5px 5px 0px',
      },
      attributesStyles: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      labelColumnStyles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexGrow: 0,
        flexShrink: 0,
        margin: theme.module.searchResults.list.attribute.groupMargin,
      },
      labelCellStyle: {
        ...theme.module.searchResults.list.attribute.label,
      },
      valueColumnStyles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 0, // required to get same columns sizes (as well as valueCellStyle maxWidth)
        flexBasis: 0, // required to get same columns sizes (as well as valueCellStyle maxWidth)
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
        margin: theme.module.searchResults.list.attribute.groupMargin,
      },
      valueCellStyle: { // for groups
        ...theme.module.searchResults.list.attribute.value,
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
        zIndex: 1,
        // mimics table header styles
        backgroundColor: theme.palette.canvasColor,
        borderRight: `1px solid ${theme.tableRow.borderColor}`,
        borderLeft: `1px solid ${theme.tableRow.borderColor}`,
        firstBoxStyle: {
          paddingLeft: '10px',
        },
        lastBoxStyle: {
          width: '58px',
        },
      },
      toponymField: {
        wrapperStyle: {
          // overlay position
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
          height: '42px',
          width: '286px',
          // mimics table header styles
          backgroundColor: theme.palette.canvasColor,
          //borderBottom: `1px solid ${theme.tableRow.borderColor}`,
          borderLeft: `1px solid ${theme.tableRow.borderColor}`,
        },
        listStyle: {
          width: '286px',
        },
        textFieldStyle: {
          width: '286px',
          top: '-6px',
          paddingLeft: '10px',
        },
        underlineStyle: {
          left: '0px',
        },
        menuItem: getMenuItemStyle(theme),
      },
      opacityToolsBox: {
        // overlay position
        position: 'absolute',
        top: '40px',
        zIndex: 1,
        // mimics table header styles
        backgroundColor: theme.palette.canvasColor,
        borderRight: `1px solid ${theme.tableRow.borderColor}`,
        borderBottom: `1px solid ${theme.tableRow.borderColor}`,
        borderLeft: `1px solid ${theme.tableRow.borderColor}`,
        display: 'flex',
        alignItems: 'center',
        left: 0,
        paddingTop: '5px',
        paddingRight: '5px',
        width: '304px',
        height: '40px',
      },
      iconToolButton: {
        minWidth: theme.button.iconButtonSize,
      },
      resizer: buildSplitResizerStyle(theme),
      help: {
        wrapper: {
          backgroundColor: 'rgb(22 22 22/ 87%)',
          position: 'absolute',
          width: '100%',
          minHeight: '100%',
          zIndex: 6,
          display: 'flex',
          flexDirection: 'column',
        },
        title: {
          wrapper: {
            display: 'flex',
            justifyContent: 'space-between',
          },
          leftStub: { width: 53 },
          titleText: {
            fontSize: '2em',
            marginTop: 30,
          },
          closeIcon: { height: 46, width: 46 },
          closeButton: {
            padding: 0, height: 53, width: 53, marginRight: 5,
          },
        },
        main: {
          wrapper: {
            flexGrow: 1,
            flexShrink: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          itemsWrapper: {
            display: 'flex',
            justifyContent: 'center',
          },
          itemWrapper: {
            boxSizing: 'border-box',
            borderRadius: '2px',
            maxWidth: '400px',
            margin: '0 50px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          },
          icon: {
            height: '120px',
            width: '120px',
          },
          title: {
            fontWeight: 500,
            marginBottom: 25,
            marginTop: 10,
            fontSize: '1.7em',
          },
          text: {
            fontSize: '1.2em',
            lineHeight: '1.3em',
            textAlign: 'justify',
          },
        },
        action: {
          wrapper: {
            display: 'flex',
            justifyContent: 'center',
            fontSize: '20px',
            marginBottom: 30,
          },
        },
      },
    },
    restrictionStyle: {
      openSearchContent: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    openSearchButtonDivStyle: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'column',
    },
  },
})

export default styles
