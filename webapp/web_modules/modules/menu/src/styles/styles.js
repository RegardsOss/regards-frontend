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
 */

import { QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'

/**
 * Styles for menu module
 * @author Sébastien binda
 */
const menuStyles = (theme) => ({
  admin: {
    firstSubheaderStyle: {
      lineHeight: 1,
      padding: '0 0 10px 0',
    },
    subheaderStyle: {
      lineHeight: 1,
      paddingLeft: 0,
      padding: '30px 0 20px 0',
    },
    radioButtonGroupLabelStyle: {
      padding: '0 0 15px 0',
    },
    previewRoleStyle: {
      paddingBottom: 20,
    },
    previewStyle: {
      borderWidth: 4,
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
      borderRadius: 5,
    },
    title: { // used for admin interface title (not in form)
      paddingLeft: 10,
      fontSize: theme.flatButton.fontSize,
      fontWeight: theme.flatButton.fontWeight,
      color: theme.palette.textColor,
      fontFamily: theme.fontFamily,
    },
    navigation: {
      noElementMessageStyle: {
        color: theme.palette.disabledColor,
      },
      table: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        },
        optionColumnStyle: {
          width: theme.button.iconButtonSize,
          padding: 0,
        },
        iconStyle: {
          height: theme.spacing.iconSize,
          width: theme.spacing.iconSize,
          marginRight: theme.spacing.iconSize / 2,
        },
        warningCell: {
          color: theme.formsExtensions.validation.warningColor,
        },
      },
      buttonsGrid: {
        displayStyle: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
      },
    },
  },
  user: {
    rootStyle: {
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: theme.module.menu.background,
      borderWidth: theme.module.menu.borderWidth,
      borderColor: theme.module.menu.borderColor,
      borderStyle: theme.module.menu.borderStyle,
    },
    menuSeparator: {
      borderColor: theme.palette.textColor,
      alignSelf: 'stretch',
      margin: theme.module.menu.separatorMargin,
      borderWidth: theme.module.menu.separatorBorderWidth,
      borderStyle: theme.module.menu.separatorBorderStyle,
      borderRadius: theme.module.menu.separatorBorderRadius,
    },
    titleGroup: {
      flexGrow: 0,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
    },
    navigationGroup: {
      flexGrow: 1,
      flexShrink: 1,
      maxHeight: theme.module.menu.navigationBarMaxHeight,
      overflowY: 'hidden',
      boxSizing: 'content-box',
    },
    navigationItem: {
      displayStyle: {
        display: 'inline-block',
      },
      hiddenStyle: {
        display: 'none',
      },
      defaultTextStyle: {
        textTransform: theme.module.menu.navigationItemTextTransform,
      },
    },
    selectedNavigationMenuItem: {
      color: theme.flatButton.secondaryTextColor,
    },
    optionsGroup: {
      flexGrow: 0,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
    },
    dateStyle: {
      color: theme.palette.textColor,
    },
    optionsLabelStyle: {
      textTransform: undefined,
    },
    profile: {
      mainIcon: {
        transform: `translateY(${Math.abs(theme.button.height - theme.spacing.iconSize) / 2}px)`,
      },
      quotaStatusIcon: {
        warning: {
          position: 'absolute',
          top: theme.module.menu.quotaWarningIcon.top,
          left: theme.module.menu.quotaWarningIcon.left,
          color: theme.components.download.quotaWarningColor,
          width: theme.module.menu.quotaWarningIcon.size,
          height: theme.module.menu.quotaWarningIcon.size,
        },
        consumed: {
          position: 'absolute',
          top: theme.module.menu.quotaWarningIcon.top,
          left: theme.module.menu.quotaWarningIcon.left,
          color: theme.components.download.quotaConsumedColor,
          width: theme.module.menu.quotaWarningIcon.size,
          height: theme.module.menu.quotaWarningIcon.size,
        },
      },
      menu: {
        item: {
          warning: {
            color: theme.components.download.quotaWarningColor,
          },
          consumed: {
            color: theme.components.download.quotaConsumedColor,
          },
        },
      },
      dialog: {
        styles: {
          padding: '0',
          overflowY: 'none',
        },
      },
      scrollArea: {
        styles: {
          height: '33vh',
        },
      },
      actions: {
        styles: {
          display: 'flex',
          justifyContent: 'center',
        },
      },
    },
  },
  overlay: {
    style: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      zIndex: '1',
      display: 'flex',
    },
    chip: {
      labelStyle: {
        fontSize: '10px',
        padding: 3,
        lineHeight: undefined,
        fontWeight: 'bold',
      },
      style: { opacity: '0.9', backgroundColor: theme.palette.accent1Color, margin: 'auto' },
    },
  },
  cart: {
    iconButton: {
      style: { padding: 0 },
      iconStyle: {
        position: 'relative',
        width: theme.button.iconButtonSize,
        height: theme.button.iconButtonSize,
      },
    },
    icon: {
      style: {
        position: 'absolute',
        left: theme.spacing.iconSize / 2,
        top: theme.spacing.iconSize / 2,
      },
    },
  },
  notifications: {
    iconButton: {
      style: { padding: 0 },
      iconStyle: {
        position: 'relative',
        width: theme.button.iconButtonSize,
        height: theme.button.iconButtonSize,
      },
    },
    icon: {
      style: {
        position: 'absolute',
        left: theme.spacing.iconSize / 2,
        top: theme.spacing.iconSize / 2,
      },
    },
    levelIcon: {
      color: '#ffffff',
      infoColor: '#2196F3',
      errorColor: '#f44336',
      fatalColor: 'red',
      warningColor: '#f9a825',
    },
    list: {
      readItem: {
        style: {
          opacity: 0.5,
        },
      },
      item: {
        style: {
          marginLeft: '0',
          padding: '25px 16px 20px 72px',
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#303030',
        },
        iconStyle: {
          position: 'absolute',
          top: '14px',
          left: '16px',
        },
        primaryText: {
          display: 'flex',
        },
        dateStyle: {
          fontSize: '0.8em',
          paddingLeft: 10,
          pointerEvents: 'none',
          textAlign: 'right',
        },
        titleStyle: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
      selectedItem: {
        style: {
          backgroundColor: theme.palette.primary3Color,
        },
      },
      subHeader: {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
        },
        titleWrapper: {
          display: 'flex',
          alignItems: 'center',
        },
      },
      divider: {
        style: {
          marginLeft: '0',
        },
      },
    },
    quotaInformation: {
      rootContainer: {
        padding: theme.module.menu.quotaView.rootPadding,
      },
      title: {
        root: {
          display: 'flex',
          alignItems: 'center',
          padding: theme.module.menu.quotaView.title.padding,
        },
        text: {
          color: theme.palette.textColor,
          fontSize: theme.dialog.titleFontSize,
          padding: theme.module.menu.quotaView.title.textPadding,
        },
      },
      message: {
        color: theme.palette.textColor,
        fontSize: theme.dialog.bodyFontSize,
        paddingBottom: theme.module.menu.quotaView.text,
      },
      quotaValuesTitle: {
        color: theme.palette.textColor,
        fontSize: theme.dialog.bodyFontSize,
        ...theme.module.menu.quotaView.currentState.title,
      },
      quotaValueRow: {
        root: {
          display: 'flex',
          alignItems: 'center',
          padding: theme.module.menu.quotaView.currentState.value.padding,
        },
        ...[ // style selector by state
          { key: QUOTA_INFO_STATE_ENUM.UNLIMITED, color: theme.palette.textColor },
          { key: QUOTA_INFO_STATE_ENUM.IDLE, color: theme.palette.textColor },
          { key: QUOTA_INFO_STATE_ENUM.WARNING, color: theme.components.download.quotaWarningColor },
          { key: QUOTA_INFO_STATE_ENUM.CONSUMED, color: theme.components.download.quotaConsumedColor },
        ].reduce((acc, { key, color }) => ({
          ...acc,
          [key]: {
            icon: { color },
            text: {
              color,
              fontSize: theme.dialog.bodyFontSize,
              fontWeight: theme.module.menu.quotaView.currentState.value.fontWeight,
              padding: theme.module.menu.quotaView.currentState.value.textPadding,
            },
          },
        }), {}),
      },
    },
    dialog: {
      style: {
        height: '100%',
      },
      wrapper: {
        style: {
          margin: '-24px 0 -24px -24px',
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
        },
      },
      list: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '66px',
        },
      },
      details: {
        date: {
          style: {
            paddingRight: 24,
            paddingTop: 24,
            fontSize: '0.8em',
          },
        },
        header: {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            flexShrink: 0,
          },
        },
        message: {
          style: {
            flexGrow: 1,
            flexShrink: 1,
            wordBreak: 'break-all',
            hyphens: 'auto',
            textAlign: 'justify',
            overflowY: 'auto',
          },
        },
        actions: {
          style: {
            position: 'absolute',
            bottom: 10,
            right: 10,
          },
        },
        container: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            margin: '0 0 70px 0',
          },
        },
      },
    },
    notificationSystem: {
      message: {
        rootStyle: {
          paddingTop: 10,
          paddingBottom: 10,
          minHeight: 40,
          width: '100%',
          cursor: 'pointer',
          display: 'flex',
        },
        containerStyle: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flexStart',
          alignItems: 'stretch',
          flexGrow: 1,
          flexShrink: 1,
          paddingLeft: 10,
          minWidth: 0,
        },
        dateStyle: {
          marginTop: -9,
          marginRight: -9,
          alignSelf: 'flex-end',
          fontSize: '0.8em',
        },
        titleStyle: {
          marginBottom: 5,
          fontWeight: 'bold',
          overflow: 'hidden',
          wordWrap: 'break-word',
          lineHeight: '1em',
          maxHeight: '2em',
          textOverflow: 'ellipsis',
        },
        messageStyle: {
          lineHeight: '1em',
          maxHeight: '4em',
          overflow: 'hidden',
          wordWrap: 'break-word',
          minWidth: 0,
          textOverflow: 'ellipsis',
        },
      },
      style: {
        NotificationItem: {
          DefaultStyle: {
            fontFamily: theme.fontFamily,
            overflow: 'hidden',
            backgroundColor: theme.palette.canvasColor,
            color: theme.palette.textColor,
            textAlign: 'left',
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
        Dismiss: {
          DefaultStyle: {
            display: 'none',
          },
        },
      },
    },
  },
})

export default menuStyles
