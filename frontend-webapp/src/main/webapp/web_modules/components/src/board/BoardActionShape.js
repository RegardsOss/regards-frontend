/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Board action Entity definition.
 * @author Sébastien Binda
 */
const BoardActionShape = PropTypes.shape({
  initialize: PropTypes.func,
  path: PropTypes.string,
  icon: PropTypes.element,
  className: PropTypes.string,
  tooltipMsg: PropTypes.string,
  touchTapAction: PropTypes.func,
  confirmMessage: PropTypes.string,
  hateoasDependencies: PropTypes.arrayOf(PropTypes.string),
})

export default BoardActionShape
