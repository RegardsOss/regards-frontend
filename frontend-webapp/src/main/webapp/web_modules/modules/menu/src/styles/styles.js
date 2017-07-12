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
 */

/**
 * Styles for menu module
 * @author Sébastien binda
 */
const menuStyles = theme => (
  {
    bar: {
      backgroundColor: theme.palette.primary1Color,
      fontFamily: theme.fontFamily,
      titleFontSize: 23,
      height: 50,
    },
    title: {
      color: theme.palette.textColor,
      marginLeft: '40px',
    },
    localeDropdown: {
      color: theme.palette.primary2Color,
    },
    loginButton: {
      backgroundColor: theme.palette.primary2Color,
      color: theme.palette.textColor,
    },
    loggedUser: {
      text: {
        paddingTop: '5px',
        color: theme.palette.textColor,
      },
      icon: {
        color: theme.palette.textColor,
      },
    },
    profile: {
      dialog: {
        styles: {
          padding: '0',
          overflowY: 'none',
        },
      },
      scrollArea: {
        styles: {
          height: '55vh',
        },
      },
      actions: {
        styles: {
          display: 'flex',
          justifyContent: 'flex-end',
        },
      },
    },
  })

export default menuStyles
