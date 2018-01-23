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
        dateStyle: {
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.8em',
          paddingTop: 16,
          paddingRight: 16,
          pointerEvents: 'none',
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
    },
    dialog: {
      wrapper: {
        style: {
          margin: -24,
          display: 'grid',
          gridTemplateColumns: '350px 1fr',
        },
      },
      list: {
        style: {
          maxHeight: 500,
          overflowY: 'scroll',
        },
      },
      details: {
        date: {
          style: {
            position: 'absolute',
            right: 24,
            top: 24,
            fontSize: '0.8em',
          },
        },
        actions: {
          style: {
            position: 'absolute',
            bottom: 10,
            right: 10,
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
          display: 'grid',
          gridTemplateColumns: '50px 1fr',
        },
        titleStyle: {
          fontWeight: 'bold',
          marginBottom: 3,
          maxWidth: 190,
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
            maxHeight: 100,
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
