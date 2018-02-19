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
const menuStyles = theme => ({
  admin: {
    rootStyle: {
      padding: 20,
    },
  },
  user: {
    rootStyle: {
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: theme['module:menu'].background,
      borderWidth: theme['module:menu'].borderWidth,
      borderColor: theme['module:menu'].borderColor,
      borderStyle: theme['module:menu'].borderStyle,
    },
    menuSeparator: {
      borderColor: theme.palette.textColor,
      alignSelf: 'stretch',
      margin: theme['module:menu'].separatorMargin,
      borderWidth: theme['module:menu'].separatorBorderWidth,
      borderStyle: theme['module:menu'].separatorBorderStyle,
      borderRadius: theme['module:menu'].separatorBorderRadius,
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
      maxHeight: theme['module:menu'].navigationBarMaxHeight,
      overflowY: 'hidden',
    },
    navigationItem: {
      displayStyle: {
        display: 'inline-block',
      },
      hiddenStyle: {
        display: 'none',
      },
      defaultTextStyle: {
        textTransform: theme['module:menu'].navigationItemTextTransform,
      },
    },
    optionsGroup: {
      flexGrow: 0,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
    },
    optionsLabelStyle: {
      textTransform: undefined,
    },
    profile: {
      dialog: {
        styles: {
          padding: '0',
          overflowY: 'none',
        },
      },
      scrollArea: {
        styles: {
          height: '55vh',
        },
      },
      actions: {
        styles: {
          display: 'flex',
          justifyContent: 'flex-end',
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
    list: {
      item: {
        style: {
          opacity: 0.5,
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
      },
      icons: {
        color: '#ffffff',
        infoColor: '#2196F3',
        errorColor: '#FF9800',
        fatalColor: '#f44336',
      },
      divider: {
        style: {
          marginLeft: '0',
        },
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
          display: 'flex',
        },
      },
      list: {
        style: {
          overflowY: 'scroll',
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
        style: {
          paddingTop: 10,
          paddingBottom: 10,
          minHeight: 40,
          width: '100%',
          cursor: 'pointer',
          display: 'flex',
        },
        titleStyle: {
          fontWeight: 'bold',
          marginBottom: 3,
          maxWidth: 165,
        },
        messageStyle: {
          wordBreak: 'break-all',
          hyphens: 'auto',
          textAlign: 'justify',
        },
        dateStyle: {
          position: 'absolute',
          top: 7,
          right: 7,
          fontSize: '0.8en',
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
