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
 * @author Sébastien Binda
 */
const storageManagementStyles = theme => ({
  root: {
    position: 'relative',
    paddingBottom: 20,
  },
  securityTester: {
    style: {
      display: 'flex',
      alignItems: 'center',
    },
    iconStyle: {
      padding: '16px 0 16px 16px',
      height: 50,
      width: 50,
      boxSizing: 'content-box',
    },
    textCardStyle: {
      flexGrow: 1,
      flexShrink: 1,
    },
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tile: {
    classes: ['col-xs-50', 'col-sm-50', 'col-lg-33'].join(' '),
    styles: {
      margin: 20,
    },
    title: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    actionsStyles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  },
})

export default storageManagementStyles