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
export default (theme) => ({
  orderList: {
    cardTextStyle: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    cardTitleStyle: {
      marginLeft: '-8px',
    },
    clearFilterButton: {
      style: {
        width: undefined,
        height: undefined,
        padding: theme.module.orderHistory.clearEmailFilterPadding,
      },
    },
    autoCompleteFilterStyle: {
      marginTop: '25px',
    },
    selectFieldStyle: {
      marginTop: '-10px',
    },
  },
  settings: {
    settingDiv: {
      display: 'flex',
    },
    settingDivAlt: {
      display: 'flex',
      marginTop: '20px',
    },
  },
})
