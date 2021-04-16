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
const dashboardManagementStyles = (theme) => ({
  headerStyle: {
    headerDivStyle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardTitleStyle: {
      width: '100%',
    },
    cardActionDivStyle: {
      padding: '16px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    iconButtonStyle: {
      marginRight: '0px',
    },
  },
  dashboardStyle: {
    dashboardDivStyle: {
      display: 'flex',
      flexDirection: 'column',
    },
    dashboardComponentsStyle: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    tableStyle: {
      nameRenderStyle: {
        divStyle: {
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        },
        iconsStyle: {
          display: 'flex',
        },
      },
      overlayStyle: {
        iconDivStyle: {
          display: 'flex',
          width: '100%',
          marginLeft: '15px',
        },
        iconButton: {
          style: {
            padding: 0,
            width: '20px',
            height: '15px',
          },
        },
        icon: {
          runningStyle: {
            position: 'absolute',
            height: '33px',
            width: '33px',
            fill: 'blue',
            marginRight: '15px',
          },
          waitingStyle: {
            position: 'absolute',
            height: '33px',
            width: '33px',
            fill: 'orange',
          },
          errorStyle: {
            position: 'absolute',
            height: '33px',
            width: '33px',
            fill: 'red',
          },
        },
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            top: '13px',
            zIndex: '1',
            left: '9px',
          },
        },
      },
      selectOptionStyle: {
        buttonStyle: {
          height: '24px',
        },
        iconStyle: {
          fill: theme.palette.accent1Color,
        },
      },
    },
  },
  selectedSession: {
    cardStyle: {
      width: '25%',
    },
    cardTitleStyle: {
      textAlign: 'center',
    },
    cardTitleTextStyle: {
      color: theme.palette.accent1Color,
    },
    cardContentStyle: {
      display: 'flex',
      flexDirection: 'column',
    },
    cardButtonStyle: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
})

export default dashboardManagementStyles
