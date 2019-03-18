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
 **/

/**
 * Module styles
 * @author Sébastien Binda
 */
export default theme => ({
  geoViewLayout: {
    display: 'flex',
    minWidth: 0,
    minHeight: 0,
    flexDirection: 'row',
    flexGrow: 1,
    flexBasis: 0,
  },
  mizarWrapper: {
    minWidth: 0,
    minHeight: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    display: 'flex',
    alignItems: 'center',
  },
  mizarViewLayout: {
    display: 'flex',
    flex: '0 0',
    flexDirection: 'row',
  },
  quicklookViewLayout: {
    minWidth: 200,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'Red',
    alignSelf: 'stretch',
  },
  reglette: {
    minWidth: 5,
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: 'Green',
  },
})
