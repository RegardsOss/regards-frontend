
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
  geoLayout: {
    flex: '1 1 0%',
    position: 'relative',
  },
  mizarWrapper: {
    height: 'auto',
    flex: '1 1 0%',
    width: '100%',
  },
  quicklookViewLayout: {
    minWidth: '50px',
    alignSelf: 'stretch',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  quiclooks: {
    flexGrow: 1,
    marginTop: 12,
    marginRight: 2,
  },
  drawButtonZone: {
  },
  drawButton: {
    padding: 6,
  },
  resizer: {
    backgroundColor: theme.palette.accent1Color,
    width: '5px',
    cursor: 'col-resize',
  },
  clearButton: {
    position: 'absolute',
    top: 5,
    right: 20,
  },
  applyGeoButton: {
    position: 'absolute',
    top: 45,
    right: 20,
  },
})
