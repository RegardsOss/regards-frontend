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

/**
 * @author Théo Lasserre
 */
const dashboardManagementStyles = (theme) => ({
  headerStyle: {
    cardTitleStyle: {
      width: '50%',
      padding: '5px',
    },
    filterButtonStyle: {
      backgroundColor: theme.palette.accent1Color,
    },
  },
  dashboardStyle: {
    cardTextField: {
      padding: '0',
    },
    filterDivStyle: {
      marginLeft: '15px',
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
        iconTitleDivStyle: {
          marginLeft: '-10px',
        },
        icon: {
          runningStyle: {
            position: 'absolute',
            height: '33px',
            width: '24px',
            fill: 'green',
            marginLeft: '30px',
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
      cardTitleStyle: {
        padding: '5px',
        marginRight: '10px',
      },
    },
  },
  stepStyle: {
    cardStyle: {
      width: '25%',
    },
    stepTitleTextStyle: {
      fontSize: '18px',
    },
    cardTitleStyle: {
      textAlign: 'center',
      marginBottom: '-25px',
    },
    tabStyle: {
      width: '100%',
      whiteSpace: 'break-spaces',
      backgroundColor: theme.palette.canvasColor,
    },
    runningIconStyle: {
      position: 'absolute',
      height: '33px',
      width: '24px',
      fill: 'green',
    },
    cardTitleDivStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50px',
    },
    cardSubTitleTextStyle: {
      fontSize: '17px',
      color: 'white',
    },
    cardContentStyle: {
      display: 'flex',
      flexDirection: 'column',
      height: '430px',
    },
    extDiffusionCardContentStyle: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '430px',
    },
    raisedListStyle: {
      width: '100%',
      height: '100%',
      padding: '3px',
    },
    raisedListLabelStyle: {
      padding: '0px',
    },
    cardButtonStyle: {
      display: 'flex',
      flexDirection: 'column',
    },
    displayProductsStyle: {
      minHeight: '160px',
      overflow: 'auto',
    },
    externalDiffusionStyle: {
      tableHeaderColumnStyle: {
        padding: null,
        textAlign: 'center',
      },
      tableHeaderStyle: {
        marginTop: '-10px',
      },
      rowNoValueStyle: {
        padding: null,
        textAlign: 'center',
        color: 'grey',
      },
      rowWaitingStyle: {
        padding: null,
        textAlign: 'center',
        color: '#d5d53b',
      },
      rowDefaultStyle: {
        padding: null,
        textAlign: 'center',
      },
    },
  },
  selectedSessionStyle: {
    cardTextStyle: {
      display: 'flex',
      width: '100%',
      padding: '5px',
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
    propertiesDivStyle: {
      marginTop: '-22px',
      lineHeight: '20px',
      fontSize: '15px',
      backgroundColor: theme.palette.canvasColor,
      paddingLeft: '5px',
    },
    propertiesTitleStyle: {
      border: `1px solid ${theme.palette.primary1Color}`,
      padding: '10px',
      color: theme.palette.primary1Color,
      marginTop: '15px',
    },
    propertiesTitleStyleAlt: {
      border: `1px solid ${theme.palette.primary1Color}`,
      padding: '10px',
      marginTop: '20px',
      color: theme.palette.primary1Color,
    },
  },
  displayIconsComponentStyle: {
    mainDivStyle: {
      width: '25%',
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
