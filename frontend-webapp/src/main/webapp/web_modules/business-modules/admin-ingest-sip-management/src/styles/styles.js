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
      bars: {
        interiorStyle: {
          width: 200,
        },
        barStyle: {
          padding: 3,
        },
        indexation: {
          borderStyle: {
            border: '2px solid #4CAF50',
          },
          backgroundStyle: {
            backgroundColor: '#4CAF50',
          },
        },
        storage: {
          borderStyle: {
            border: '2px solid #00BCD4',
          },
          backgroundStyle: {
            backgroundColor: '#00BCD4',
          },
        },
        generation: {
          borderStyle: {
            border: '2px solid #2196F3',
          },
          backgroundStyle: {
            backgroundColor: '#2196F3',
          },
        },
      },
      error: {
        rowColumnStyle: {
          display: 'flex',
          alignItems: 'center',
        },
        iconStyle: {
          color: '#f44336',
        },
      },
    },
  },
})

export default sipManagementStyles
