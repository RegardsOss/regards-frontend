/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
    pluginConfigurationPicker: {
      pluginButton: {
        marginLeft: 10,
        verticalAlign: 'text-bottom',
      },
      iconMenu: {
        visibility: 'hidden',
        width: '0px',
      },
      field: {
        display: 'none',
      },
      defaultItem: {
        display: 'flex', justifyContent: 'space-between',
      },
      emphasisItem: {
        display: 'flex', justifyContent: 'space-between', color: theme.palette.accent1Color,
      },
      rightItemContent: {
        color: '#bdbdbd',
      },
    },
  }
}
