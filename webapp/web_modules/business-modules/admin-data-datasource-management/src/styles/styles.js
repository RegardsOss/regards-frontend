/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Module theme
 * @author Raphaël Mechali
 */
export default theme => ({
  openSearchCrawler: {
    subHeader: {
      paddingLeft: 0,
    },
    queryFilters: {
      mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      },
      buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: 30,
      },
      emptyMessage: {
        color: theme.palette.secondaryTextColor,
        paddingLeft: 20,
        paddingTop: 20,
      },
    },
  },
})
