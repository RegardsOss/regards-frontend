/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'

/**
 * Definition of type DecoratorShape. Decorator are used in LazyModuleComponent to add a decorator element to modules
 */
const ContainerShape = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.object,
  modules: PropTypes.arrayOf(AccessShapes.ModuleWithoutContent),
  // eslint-disable-next-line react/forbid-prop-types
  containers: PropTypes.arrayOf(PropTypes.object),
  dynamicContent: PropTypes.bool,
  mainContainer: PropTypes.bool,
})

export default ContainerShape
