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
 * Styles for plugin
 * @param theme Material UI theme, can be used to compute dynamic style values from current theme (automatically updated)
 * @author C-S
 */
export default function buildServiceStyles(theme) {
  return {
    // the document styles
    body: {
      padding: '5px 15px 5px 5px',
      // Material UI look and feel
      fontSize: '14px',
      fontFamily: 'Roboto, sans-serif',
    },

    contentWrapper: {
      color: theme.palette.textColor,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },

    tableWrapper: {
      paddingBottom: '20px',
    },

    attributesWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    attributesChipsWrapper: {
      display: 'flex',
      paddingBottom: '5px',
      paddingTop: '5px',
      flexWrap: 'wrap',
    },

    buttonsWrapper: {
      paddingTop: '25px',
      display: 'flex',
    },

    styleTableRow: {
      height: '95px',
    },

    filters: {
      iconColor: theme.palette.accent1Color,
      style: {
        margin: '5px',
      },
    },
  }
}
