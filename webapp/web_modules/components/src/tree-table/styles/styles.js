/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Tree table styles
 * @param theme Material UI theme
 * @author Raphaël Mechali
 */
export default theme => ({
  oddLevelRowStyle: {
    background: theme.tableRow.stripeColor,
    color: theme.palette.secondaryTextColor,
  },
  evenLevelRowStyle: {
    background: theme.palette.canvasColor,
    color: theme.palette.textColor,
  },
  expandCell: {
    style: {
      height: 48,
      width: 48,
      padding: 0,
    },
  },
  expandButton: {
    style: {
      height: 48,
      width: 48,
      padding: 0,
    },
  },
  expandIcon: {
    style: {
      width: 32,
      height: 32,
      cursor: 'pointer',
      color: theme.palette.accent1Color,
    },
  },
  firstCell: {
    leftMarginForLevel: theme.tableRowColumn.spacing,
  },
})
