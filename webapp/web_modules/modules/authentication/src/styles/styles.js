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
const styles = (theme) => (
  {
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
    serviceProviderButton: {
      marginBottom: '8px',
      width: '100%',
      paddingLeft: '15px',
      paddingRight: '15px',
      backgroundColor: theme.tableRow.stripeColor,
      height: '100%',
    },
    serviceProviderList: {
      display: 'flex',
      flexDirection: 'column',
      height: '300px',
      overflowY: 'auto',
    },
    cardProviderScrollStyle: {
      height: '335px',
      width: '291px',
    },
    cardProviderStyle: {
      width: '300px',
      backgroundColor: theme.tableRow.stripeColor,
    },
    cardAuthStyle: {
      width: '700px',
    },
    buttonStyle: {
      height: '50px',
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
