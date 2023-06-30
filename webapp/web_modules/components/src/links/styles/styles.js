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

/**
 * Styles for board items components
 * @param theme
 * @author Sébastien Binda
 */
const styles = (theme) => ({
  anchorComponent: {
    buttonStyle: {
      bottom: theme.components.anchorScrollTop.buttonBottom,
      right: theme.components.anchorScrollTop.buttonRight,
      position: 'fixed',
      zIndex: 2,
    },
    iconStyle: {
      fill: theme.components.anchorScrollTop.iconColor,
    },
  },
  linkComponent: {
    color: theme.palette.primary1Color,
  },
  breadcrumb: {
    style: {
      height: theme.module.common.titleBarHeight,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginLeft: theme.module.common.titleMarginLeft,
    },
    breadcrumbIcon: {
      defaultStyle: {
        color: theme.palette.textColor,
        margin: (theme.button.iconButtonSize - theme.spacing.iconSize) / 2,
        flexGrow: 0,
        flexShrink: 0,
        width: theme.module.common.titleIconSize,
        height: theme.module.common.titleIconSize,
      },
      selectedStyle: {
        color: theme.flatButton.secondaryTextColor,
        margin: (theme.button.iconButtonSize - theme.spacing.iconSize) / 2,
        flexGrow: 0,
        flexShrink: 0,
        width: theme.module.common.titleIconSize,
        height: theme.module.common.titleIconSize,
      },
    },
    element: {
      navigable: {
        style: {
          minWidth: 0,
          flexGrow: 0,
          flexShrink: 1,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        },
      },
      nonNavigable: {
        style: {
          minWidth: 0,
          flexGrow: 0,
          flexShrink: 1,
          display: 'flex',
          alignItems: 'center',
          cursor: 'default',
        },
        lastStyle: {
          minWidth: 0,
          flexGrow: 0,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          cursor: 'default',
        },
      },
      selectedLabelStyle: {
        color: theme.flatButton.secondaryTextColor,
        flexGrow: 1,
        flexShrink: 1,
        fontSize: theme.module.common.titleFontSize,
        fontWeight: theme.module.common.titleFontWeight,
        textTransform: theme.module.common.textTransform,
        minWidth: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      defaultLabelStyle: {
        color: theme.palette.textColor,
        flexGrow: 1,
        flexShrink: 1,
        fontSize: theme.module.common.titleFontSize,
        fontWeight: theme.module.common.titleFontWeight,
        textTransform: theme.module.common.textTransform,
        padding: 0,
        minWidth: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },
})

export default styles
