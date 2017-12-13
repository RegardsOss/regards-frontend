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
const microserviceManagementStyles = theme => ({
  pluginParameter: {
    pluginButton: {
      marginLeft: 10,
    },
    parameterPaper: {
      margin: '5px',
      padding: '0px 5px 15px 10px',
    },
    iconMenu: {
      visibility: 'hidden',
    },
    iconViewStyle: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    label: {
      paddingLeft: 0,
      fontSize: 12,
      color: theme.textField.hintColor,
      width: 'initial',
      marginRight: 10,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    toggleStyle: {
      width: 'auto',
      height: 'auto',
    },
  },
  dynamicParameter: {
    layout: {
      display: 'flex',
      alignItems: 'baseline',
    },
    toggle: {
      style: {
        flexShrink: 0,
      },
      labelStyle: {
        width: '100%',
        marginRight: '20px',
      },
    },
  },
  renderer: {
    errorStyle: {
      color: theme.textField.errorColor,
    },
    fullWidthStyle: { width: '100%' },
  },
})

export default microserviceManagementStyles
