/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const aipManagementStyles = theme => ({
  import: {
    errorColor: theme.formsExtensions.validation.errorColor,
    validColor: theme.formsExtensions.validation.validColor,
  },
  displayBlock: {
    display: 'block',
  },
  displayNone: {
    display: 'none',
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
    autocomplete: {
      marginRight: '10px',
      marginLeft: '10px',
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
  aipDetailsStyle: {
    height: '300px',
    width: '100%',
  },
  sipDetailsStyle: {
    height: '300px',
    width: '100%',
  },
  dataFileLinkStyle: {
    fontSize: '1.2em',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  manageTags: {
    subtitle: {
      paddingLeft: 0,
    },
    tagsChipWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    tagsSeparator: {
      margin: '10px 0px',
    },
    formInput: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  aips: {
    selectStorageDialog: {
      title: {
        fontSize: theme.dialog.titleFontSize,
      },
      subtitle: {
        fontSize: theme.dialog.bodyFontSize,
        lineHeight: 1,
      },
    },
  },
})

export default aipManagementStyles
