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
      padding: 10,
    },
  },
  user: {
    rootStyle: {
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'flexStart',
      alignItems: 'center',
      background: theme.appBar.color,
      borderWidth: '0 0 1px 0',
      borderColor: theme.toolbar.separatorColor,
      borderStyle: 'solid',
    },
    optionsGroup: {
      flexGrow: 0,
      flexShrink: 0,
    },
    optionsLabelStyle: {
      textTransform: undefined,
    },
    titleGroup: {
      flexGrow: 1,
      flexShrink: 1,
      fontSize: theme.flatButton.fontSize,
      fontFamily: theme.fontFamily,
      textAlign: 'center',
      color: theme.palette.textColor,
      fontWeight: 'bold',
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
  cart: {
    iconButton: {
      style: { padding: 0 },
      iconStyle: {
        position: 'relative',
        width: theme.button.iconButtonSize,
        height: theme.button.iconButtonSize,
      },
    },
    overlay: {
      style: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        zIndex: '1',
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
    overlay: {
      style: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        zIndex: '1',
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
    icon: {
      style: {
        position: 'absolute',
        left: theme.spacing.iconSize / 2,
        top: theme.spacing.iconSize / 2,
      },
    },
    popover: {
      style: {
        width: 325,
      },
      wrapperDiv: {
        style: {
          maxHeight: 500,
        },
      },
      unreadList: {
        style: {
          paddingBottom: 0,
        },
      },
      noNewNotifications: {
        style: {
          width: '100%',
          height: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontSize: '0.8em',
          opacity: 0.7,
        },
        iconStyle: {
          width: 50,
          height: 50,
          marginBottom: 10,
        },
      },
      showNotificationsButton: {
        style: {
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 1,
        },
      },
      readList: {
        style: {
          paddingBottom: 0,
          paddingTop: 0,
        },
        item: {
          style: {
            opacity: 0.5,
          },
        },
      },
      icons: {
        color: '#ffffff',
        infoColor: '#2196F3',
        errorColor: '#FF9800',
        fatalColor: '#f44336',
      },
    },
  },
})

export default menuStyles
