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
 * Styles for menu module
 * @author Sébastien binda
 */
const moduleStyles = theme => (
  {
    exampleStyle: {
      backgroundColor: theme.palette.primary1Color,
      margin: '20px 20px',
      height: 50,
      border: '2px solid Black',
      textAlign: 'center',
      paddingTop: '15px',
      fontSize: '1.2em',
    },
    configuredText: {
      color: theme.palette.secondaryTextColor,
    },
  })

export default moduleStyles
