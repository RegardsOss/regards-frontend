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
 * Card components styles
 * @author Raphaël Mechali
 */
export default function getStyles(theme) {
  return {
    horizontalSeparator: {
      rootStyle: {
        background: theme.palette.canvasColor,
        padding: '0 0 3px 0',
      },
      lineStyle: {
        padding: '3px 0 0',
        borderStyle: 'solid',
        borderWidth: '0 0 1px 0',
        width: '100%',
        borderColor: theme.appBar.color,
      },
    },
    module: {
      defaultStyle: {
        position: 'static',
        minHeight: theme.module.common.titleBarHeight,
        maxHeight: 'none',
        flexGrow: 0,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        background: 'transparent',
        zIndex: 1,
      },
      growingStyle: {
        position: 'static',
        flexGrow: 1,
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        background: 'transparent',
        zIndex: 1,
      },
      maximizedStyle: {
        position: 'fixed',
        top: 0,
        left: 0,
        minHeight: '100vh',
        maxHeight: '100vh',
        minWidth: '100vw',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        background: 'transparent',
        zIndex: 2,
      },
      cardRootContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: 1,
        flexShrink: 1,
      },
      cardHeaderStyle: {
        padding: '0',
      },
      cardHeaderContentStyle: {
        width: '100%',
        paddingRight: 0,
      },
      titleBarDivStyle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        background: theme.palette.canvasColor,
      },
      titleDivStyle: {
        flexGrow: 1,
        flexShrink: 1,
      },
      optionsDivStyle: {
        display: 'flex',
        flexGrow: 0,
        flexShrink: 0,
        alignItems: 'center',
      },
      layoutOptionsStyle: {
        width: theme.module.common.layoutOptionSize,
        height: theme.module.common.layoutOptionSize,
        padding: theme.module.common.layoutOptionPadding,
      },
      layoutOptionsIconStyle: {
        width: theme.module.common.layoutIconSize,
        height: theme.module.common.layoutIconSize,
      },
      selectedLayoutOptionsColor: theme.palette.accent1Color,
      moduleTitle: {
        style: {
          marginLeft: theme.module.common.titleMarginLeft,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: theme.module.common.titleBarHeight,
        },
        iconContainer: {
          padding: theme.module.common.titleIconSize / 2,
        },
        iconStyle: {
          width: theme.module.common.titleIconSize,
          height: theme.module.common.titleIconSize,
        },
        labelStyle: {
          color: theme.palette.textColor,
          fontSize: theme.module.common.titleFontSize,
          fontWeight: theme.module.common.titleFontWeight,
          textTransform: theme.module.common.textTransform,
        },
      },
      closedModuleSpaceConsumer: {
        flexGrow: 1,
        flexShrink: 1,
      },
      content: {
        moduleMediaRootStyle: {
          flexGrow: 1,
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        },
        moduleMediaStyle: {
          flexGrow: 1,
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        },
        moduleContentStyle: {
          flexGrow: 1,
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          minHeight: theme.module.common.minContentHeight,
        },
      },
    },
    moduleSubTitle: {
      styleWithoutInset: {
        paddingLeft: 0,
        lineHeight: 1,
        marginLeft: theme.module.common.titleMarginLeft + theme.module.common.titleTextMarginLeft,
      },
      styleWithIconInsets: {
        marginTop: theme.module.common.subtitleMarginTop,
        paddingLeft: 0,
        lineHeight: 1,
        marginLeft: theme.module.common.titleMarginLeft + theme.module.common.titleIconSize + theme.module.common.titleTextMarginLeft + 1,
      },
    },
    loadingIcon: {
      size: 128,
      thickness: 2,
    },
  }
}
