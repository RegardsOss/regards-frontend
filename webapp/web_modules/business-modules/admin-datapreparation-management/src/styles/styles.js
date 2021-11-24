/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * @author Théo Lasserre
 */
const dataPreparationManagementStyles = (theme) => ({
  filters: {
    mainDivStyle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateFilterDiv: {
      display: 'flex',
      alignItems: 'center',
    },
    dateFilterLabel: {
      marginTop: '10px',
      marginRight: '10px',
    },
    fieldMargin: {
      marginRight: '20px',
    },
    fieldMarginAlt: {
      marginTop: '-25px',
    },
  },
  renderStyle: {
    statusStyle: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  dialogsStyle: {
    errorDetailsStyle: {
      height: '300px',
      width: '100%',
    },
  },
})

export default dataPreparationManagementStyles
