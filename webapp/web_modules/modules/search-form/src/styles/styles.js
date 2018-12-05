/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Styles for form module
 * @author Sébastien binda
 */
const formStyles = theme => ({
  admin: {
    layoutTitle: {
      padding: '20px 0 15px 0',
    },
  },
  criteria: {
    divider: {
      marginTop: 20,
      marginBottom: 20,
      marginLeft: -24,
      marginRight: -24,
    },
    title: {
      fontSize: '1.1em',
      color: theme.palette.textColor,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: '0.8em',
    },
  },
  user: {
    buttonsContainer: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    searchButton: {
      margin: '12px 0 8px 0',
    },
    resetButton: {
      margin: '12px 12px 8px 0',
    },
  },
  resultsButtonsType: {
    buttonsGroup: {
      top: 0,
      position: 'fixed',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1000,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
})

export default formStyles
