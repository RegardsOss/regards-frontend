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

import { getMenuItemStyle } from '@regardsoss/toponym-common'

/**
 * Styles for plugin
 * @param theme Material UI theme, can be used to compute dynamic style values from current theme (automatically updated)
 * @author Theo Lasserre
 */
export default function getStyles(theme) {
  return {
    menuStyle: {
      marginRight: 20,
    },
    menuItem: getMenuItemStyle(theme),
    trickStyle: {
      fontStyle: 'italic',
    },
    close: {
      wrapper: {
        display: 'flex',
        alignItems: 'center',
      },
      closeIconButton: {
        padding: 0,
        flexGrow: 0,
        flexShrink: 0,
        alignSelf: theme.module.searchResults.tabs.closeButton.alignSelf,
        margin: theme.module.searchResults.tabs.closeButton.margin,
        width: 20,
        height: 20,
      },
      closeIcon: {
        width: 20,
        height: 20,
      },
    },
  }
}
