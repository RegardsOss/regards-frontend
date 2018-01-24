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
 **/

/**
 * Definition of type DecoratorShape. Decorator are used in LazyModuleComponent to add a decorator element to modules
 * @author Sébastien Binda
 */
export default PropTypes.shape({
  id: PropTypes.number,
  // Type available from AvailableModules.js
  type: PropTypes.string,
  description: PropTypes.string,
  active: PropTypes.bool,
  applicationId: PropTypes.string,
  container: PropTypes.string,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  conf: PropTypes.objectOf(PropTypes.any),
})
