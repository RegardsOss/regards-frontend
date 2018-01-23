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
 * Styles for board items components
 * @param theme
 * @author Sébastien Binda
 */
const styles = theme => ({
  breadcrumb: {
    style: {
      height: theme.module.titleBarHeight,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    element: {
      style: {
        marginLeft: theme.module.titleMarginLeft,
      },
      iconStyle: {
        margin: 0,
        width: theme.module.titleIconSize,
        height: theme.module.titleIconSize,
      },
      labelStyle: {
        marginLeft: theme.module.titleTextMarginLeft,
        fontSize: theme.module.titleFontSize,
        fontWeight: theme.module.titleFontWeight,
        textTransform: theme.module.textTransform,
        padding: 0,
      },
    },
  },
})

export default styles
