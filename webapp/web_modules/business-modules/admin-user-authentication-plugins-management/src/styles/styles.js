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
 * @author Sébastien Binda
 */
const storageManagementStyles = (theme) => ({
  root: {
    position: 'relative',
    paddingBottom: 20,
  },
  description: {
    color: theme.palette.accent1Color,
  },
  mainListDiv: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  columnDiv: {
    width: '50%',
  },
  buttonsDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '8px',
  },
  descriptionDiv: {
    marginLeft: '20px',
  },
  buttonStyle: {
    marginLeft: '5px',
  },
  serviceprovider: {
    serviceProviderCommonDiv: {
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    serviceProviderPlugin: {
      marginTop: '14px',
    },
  },
})

export default storageManagementStyles
