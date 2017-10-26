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
      },
    },
    moduleTitle: {
      style: {
        margin: theme.module.titleMargin,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: theme.module.titleBarHeight,
      },
      iconStyle: {
        width: theme.module.titleIconSize,
        height: theme.module.titleIconSize,
        margin: theme.module.titleIconMargin,
      },
      labelStyle: {
        color: theme.palette.textColor,
        margin: theme.module.titleTextMargin,
        fontSize: theme.module.titleFontSize,
        fontWeight: theme.module.titleFontWeight,
        textTransform: theme.module.textTransform,
      },
    },
  }
}
