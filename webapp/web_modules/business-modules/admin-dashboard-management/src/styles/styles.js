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
      justifyContent: 'space-between',
    },
    cardTitleStyle: {
      width: '50%',
      padding: '5px',
    },
    cardActionDivStyle: {
      padding: '5px',
      width: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  },
  dashboardStyle: {
    cardTextField: {
      padding: '0',
    },
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
          width: '33%',
          height: '100%',
          marginLeft: '10px',
        },
        iconButton: {
          style: {
            padding: 0,
            height: '15px',
          },
        },
        icon: {
          runningStyle: {
            position: 'absolute',
            height: '33px',
            width: '24px',
            fill: 'green',
          },
          runningAltStyle: {
            position: 'absolute',
            height: '33px',
            width: '24px',
            fill: 'green',
            marginRight: '5px',
          },
          waitingStyle: {
            position: 'absolute',
            height: '33px',
            width: '24px',
            fill: '#d5d53b',
          },
          waitingAltStyle: {
            position: 'absolute',
            height: '33px',
            width: '24px',
            fill: '#d5d53b',
            marginLeft: '10px',
          },
          errorStyle: {
            position: 'absolute',
            height: '33px',
            width: '24px',
            fill: '#cb1616',
          },
          errorAltStyle: {
            position: 'absolute',
            height: '33px',
            width: '24px',
            fill: '#cb1616',
            marginLeft: '10px',
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
            marginLeft: '5px',
          },
        },
      },
      selectOptionStyle: {
        textStyle: {
          color: theme.palette.accent1Color,
        },
      },
    },
    componentDiv: {
      cardStyle: {
        width: '50%',
      },
      cardTextStyle: {
        padding: '5px',
      },
      headerOptionDivStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      cardTitleStyle: {
        padding: '5px',
        marginRight: '10px',
      },
      autoCompleteStyle: {
        marginRight: '10px',
      },
      selectFieldStyle: {
        width: '105px',
      },
    },
  },
  selectedSessionStyle: {
    cardStyle: {
      width: '25%',
    },
    cardTitleDivStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px',
    },
    cardTitleStyle: {
      textAlign: 'center',
    },
    cardTextStyle: {
      display: 'flex',
      width: '100%',
      padding: '5px',
    },
    cardTitleTextStyle: {
      fontSize: '18px',
      fontStyle: 'bold',
    },
    cardContentStyle: {
      display: 'flex',
      flexDirection: 'column',
    },
    cardButtonStyle: {
      display: 'flex',
      flexDirection: 'column',
    },
    listItemStyle: {
      padding: '5px',
    },
    listItemErrorStyle: {
      padding: '5px',
      color: '#cb1616',
    },
    listItemNoValueStyle: {
      padding: '5px',
      color: 'grey',
    },
    listItemWaitStyle: {
      padding: '5px',
      color: '#d5d53b',
    },
    listItemDivStyle: {
      height: '300px',
    },
    raisedListStyle: {
      width: '100%',
      height: '100%',
      padding: '3px',
    },
    deleteButtonStyle: {
      marginRight: '10px',
      color: 'red',
    },
    propertiesDivStyle: {
      marginTop: '-22px',
      lineHeight: '20px',
      fontSize: '15px',
      backgroundColor: theme.palette.canvasColor,
      width: '72px',
      paddingLeft: '5px',
    },
    propertiesDivStyleAlt: {
      marginTop: '-22px',
      lineHeight: '20px',
      fontSize: '15px',
      backgroundColor: theme.palette.canvasColor,
      width: '82px',
      paddingLeft: '5px',
    },
    propertiesTitleStyle: {
      border: `1px solid ${theme.palette.accent1Color}`,
      padding: '10px',
      color: theme.palette.accent1Color,
    },
    propertiesTitleStyleAlt: {
      border: `1px solid ${theme.palette.accent1Color}`,
      padding: '10px',
      marginTop: '20px',
      color: theme.palette.accent1Color,
    },
  },
  displayIconsComponentStyle: {
    mainDivStyle: {
      width: '25%',
    },
    mainDivStyleAlt: {
      width: '10%',
    },
    displayIconsDivStyle: {
      width: '100%',
      display: 'flex',
      height: '100%',
    },
    displayIconDivStyle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '33%',
    },
    displayIconsWithCountDivStyle: {
      width: '100%',
      display: 'flex',
      height: '100%',
    },
    displayNone: {
      display: 'none',
    },
  },
})

export default dashboardManagementStyles
