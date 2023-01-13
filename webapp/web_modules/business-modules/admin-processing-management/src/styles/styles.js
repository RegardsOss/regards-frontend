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
  processingMonitoring: {
    filterButtonStyle: {
      backgroundColor: theme.palette.accent1Color,
    },
  },
  processingList: {
    cardTextStyle: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  processingForm: {
    selectUserRoleDiv: {
      display: 'flex',
    },
    selectUserRoleFieldDiv: {
      paddingLeft: '24px',
    },
    selectUserRoleField: {

    },
    helpUserRoleIcon: {
      paddingTop: '24px',
      paddingLeft: '12px',
      display: 'flex',
      alignItems: 'center',
    },
  },
  iconStyle: {
    height: '23px',
    width: '23px',
  },
  buttonStyle: {
    padding: '0px',
    height: '30px',
    width: '30px',
  },
  hoverButtonEdit: theme.palette.primary1Color,
  hoverButtonDelete: theme.palette.accent1Color,
})
