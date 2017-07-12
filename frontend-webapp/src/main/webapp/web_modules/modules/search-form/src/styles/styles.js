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
 * Styles for form module
 * @author Sébastien binda
 */
const formStyles = theme => ({
  criteria: {
    label: {
      marginRight: 20,
    },
  },
  user: {
    searchButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    searchButton: {
      marginTop: 10,
      width: 200,
    },
    formHeader: {
      backgroundColor: theme.palette.primary2Color,
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
