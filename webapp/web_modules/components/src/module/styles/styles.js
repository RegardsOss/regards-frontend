/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
      cardHeaderStyle: {
        padding: '0',
      },
      cardHeaderContentStyle: {
        width: '100%',
        paddingRight: theme.button.iconButtonSize + 5,
      },
      titleBarDivStyle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        marginRight: -48, // This is a hack to take the place of the default collapse button as MUI is not able to hide it... Bullsh**!
      },
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

