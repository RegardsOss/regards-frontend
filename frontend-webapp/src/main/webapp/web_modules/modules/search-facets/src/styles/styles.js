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
const projectsStyles = theme => (
  {
    wrapper: {
      styles: {
        display: 'flex',
      },
    },
    noFacetMessage: {
      styles: {
        margin: '16px 1em 15px 0',
      },
    },
    filterSelectors: {
      styles: {
        display: 'flex',
        flexDirection: 'row',
        margin: '0 0 0 1em',
        justifyContent: 'center',
        flexGrow: 1,
      },
      selector: {
        styles: {
          margin: '7px 1em 6px 0',
        },
      },
    },
    filtersInformation: {
      styles: {
        display: 'flex',
        flexDirection: 'row',
        margin: '0 0 0 1em',
        justifyContent: 'flex-start',
      },
      infoChip: {
        styles: {
          margin: '8px 1em 8px 0',
        },
      },
    },
  })

export default projectsStyles
