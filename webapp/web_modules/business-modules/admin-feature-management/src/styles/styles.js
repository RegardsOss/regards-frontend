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
 */

/**
 * @author Théo Lasserre
 */
const featureManagementStyles = (theme) => ({
  displayNone: {
    display: 'none',
  },
  card: {
    filterButtonStyle: {
      backgroundColor: theme.palette.accent1Color,
    },
  },
  tableStyle: {
    renderStyle: {
      statusStyle: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    loadingStyle: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
      marginBottom: '10px',
    },
    overlayStyle: {
      iconButton: {
        style: {
          padding: 0,
          width: '20px',
          height: '15px',
        },
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '-12px',
      },
      icon: {
        style: {
          fill: 'red',
        },
      },
      chip: {
        labelStyle: {
          fontSize: '10px',
          padding: 3,
          lineHeight: undefined,
          fontWeight: 'bold',
        },
        style: {
          opacity: '0.9',
          backgroundColor: theme.palette.accent1Color,
          margin: 'auto',
          top: '10px',
          zIndex: '1',
          left: '-10px',
        },
      },
    },
    disseminationCellStyle: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row-reverse',
      overflow: 'hidden',
    },
  },
  switchTable: {
    divStyle: {
      display: 'flex',
    },
    switchButton: {
      color: theme.palette.accent1Color,
    },
    displayIndicator: {
      display: 'flex',
      alignItems: 'center',
    },
    displayNone: {
      display: 'none',
    },
    indicatorStyle: {
      position: 'relative',
    },
  },
  headerActionBarStyle: {
    width: '100%',
  },
  settings: {
    settingDiv: {
      display: 'flex',
    },
    settingDivAlt: {
      display: 'flex',
      marginTop: '20px',
    },
    cronDivStyle: {
      display: 'flex',
      flexDirection: 'row',
    },
    dialogExampleDivStyle: {
      marginTop: '10px',
      marginLeft: '20px',
    },
  },
})

export default featureManagementStyles
