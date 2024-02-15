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
const styles = (theme) => (
  {
    mainAuthServiceStyle: {
      mainDivStyle: {
        height: '226px',
      },
      textMainDivStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      textMainDivAltStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '30px',
      },
      titleDivStyle: {
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontSize: '18px',
        marginTop: '15px',
        color: theme.cardMedia.titleColor,
      },
      mainDescriptionDivStyle: {
        display: 'flex',
        justifyContent: 'center',
        height: '110px',
        padding: '35px',
        maxWidth: '400px',
        textAlign: 'center',
      },
      descriptionStyle: {
        overflow: 'hidden',
        color: theme.cardMedia.subtitleColor,
      },
      cardActionsStyle: {
        display: 'flex',
        justifyContent: 'center',
        height: '83px',
      },
      cardActionsAltStyle: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '50px',
      },
      linksBar: {
        display: 'flex',
        padding: '10px',
        margin: '20px 10px 10px 10px',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: theme.palette.borderColor,
        justifyContent: 'end',
        fontSize: '16px',
        width: '958px',
      },
      linkButtonStyle: {
        marginRight: '54px',
      },
      buttonLinkStyle: {
        marginRight: '0px',
        height: '50px',
      },
    },
    layout: {
    },
    action: {
      display: 'flex',
      justifyContent: 'center',
    },
    addServiceProviderCard: {
      display: 'flex',
      flexDirection: 'row',
    },
    serviceProviderDescriptionStyle: {
      fontSize: '12px',
      color: theme.palette.textColor,
      maxHeight: '35px',
      overflow: 'hidden',
    },
    serviceProviderButton: {
      marginBottom: '8px',
      width: '100%',
      backgroundColor: theme.palette.accent1Color,
      height: '100%',
    },
    serviceProviderList: {
      display: 'flex',
      flexDirection: 'column',
      height: '315px',
      overflowY: 'auto',
    },
    cardProviderScrollStyle: {
      height: '234px',
      width: '276px',
      marginRight: '4px',
      marginLeft: '4px',
      marginTop: '4px',
    },
    cardProviderStyle: {
      width: '300px',
      backgroundColor: theme.tableRow.stripeColor,
    },
    cardAuthStyle: {
      width: '700px',
    },
    cardSelectedAuthStyle: {
      width: '100%',
      height: '397px',
      backgroundColor: theme.tableRow.stripeColor,
    },
    cardTitleAuthStyle: {
      height: '82px',
    },
    buttonStyle: {
      height: '50px',
    },
    serviceProviderButtonStyle: {
      height: '60px',
      backgroundColor: theme.palette.accent1Color,
    },
    overlayAltStyle: {
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column-reverse',
    },
    overlayStyle: {
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelStyle: {
      padding: '0',
    },
    connectButton: {
      marginRight: '8px',
      minWidth: '120px',
    },
    cancelButton: {
      minWidth: '120px',
    },
    linksBar: {
      display: 'flex',
      padding: '10px',
      margin: '20px 10px 10px 10px',
      justifyContent: 'space-around',
      borderWidth: '1px 0 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
    },
    mainServiceDivStyle: {
      display: 'flex',
      padding: '10px',
      marginTop: '16px',
      marginRight: '8px',
      marginLeft: '8px',
      justifyContent: 'center',
      borderWidth: '1px 0 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
    },
    mainServiceIconColor: theme.palette.accent1Color,
    dialog: {
      preferredWidth: '1000px',
      maxFormHeight: '55vh',
      body: { padding: '0', overflowY: 'none' },
      content: {
        width: '1000px',
        maxWidth: 'none',
      },
      scrollStyle: {
        height: '55vh',
      },
    },
  })

export default styles
