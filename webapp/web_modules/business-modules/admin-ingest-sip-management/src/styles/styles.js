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
 */
const sipManagementStyles = theme => ({
  import: {
    errorColor: theme.formsExtensions.validation.errorColor,
    validColor: theme.formsExtensions.validation.validColor,
  },
  filter: {
    fieldStyle: {
      width: '190px',
      margin: '0px 10px',
    },
    dateStyle: {
      width: '120px',
      margin: '0px 10px',
    },
  },
  session: {
    error: {
      rowColumnStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      iconContainerStyle: {
        width: '25%',
      },
      textStyle: {
        width: '75%',
      },
      iconStyle: {
        color: '#f44336',
      },
    },
  },
  sipDetailsStyle: {
    height: '300px',
    width: '100%',
  },
})

export default sipManagementStyles
