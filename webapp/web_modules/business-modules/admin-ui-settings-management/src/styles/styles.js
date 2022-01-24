/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Module styles
 * @author Raphaël Mechali
 */
const storageManagementStyles = (theme) => ({
  documentModels: {
    root: {
      display: 'flex',
      alignItems: 'strech',
    },
    fitTableRowsCount: 8,
    tableHolder: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    separator: {
      margin: `${theme.components.infiniteTable.minHeaderRowHeight}px 20px 0 20px`,
      background: theme.toolbar.separatorColor,
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 1,
    },
  },
})

export default storageManagementStyles
