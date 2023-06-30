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
 **/

export default (theme) => ({
  errorDivStyle: {
    mainDiv: {
      backgroundColor: '#B00020',
      padding: '5px 5px 5px 0px',
      margin: '15px 10px 5px 2px',
      display: 'flex',
      fontSize: '20px',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Roboto, sans-serif',
      borderWidth: '1px',
      borderColor: '#B00020',
      borderStyle: 'solid',
      borderRadius: '2px',
    },
    infosDivStyle: {
      flex: 'auto',
      padding: '5px 5px 5px 0px',
    },
    titleAndSubStyle: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '15px',
    },
    titleStyle: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
  },
  errorMessageStyle: {
    mainErrorMessageStyle: {
      display: 'flex',
      flexDirection: 'column',
    },
    errorDivContentStyle: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '15px',
    },
    ulStyle: {
      marginLeft: '20px',
    },
    criteriaStyle: {
      marginTop: '-20px',
      marginLeft: '5px',
    },
  },
})
