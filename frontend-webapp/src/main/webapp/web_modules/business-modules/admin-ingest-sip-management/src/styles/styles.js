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
const sipManagementStyles = theme => ({
  import: {
    errorColor: theme['forms-extension:validation'].errorColor,
    validColor: theme['forms-extension:validation'].validColor,
  },
  sip: {
    stepperStyle: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    filter: {
      toolbarStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
      },
      textFieldStyle: {
        top: -18,
        width: 190,
        margin: '0px 10px',
      },
      checkboxStyle: {
        width: 200,
      },
    },
    list: {
      sipDetailsStyle: {
        height: 300,
        width: '100%',
      },
      aipDialog: {
        marginBottom: 15,
      },
    },
    session: {
      error: {
        rowColumnStyle: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '80%',
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
  },
})

export default sipManagementStyles
