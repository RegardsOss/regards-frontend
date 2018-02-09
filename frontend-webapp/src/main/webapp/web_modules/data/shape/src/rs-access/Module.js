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
import { AccessDomain } from '@regardsoss/domain'

/**
 * Definition of type DecoratorShape.
 * Decorator are used in LazyModuleComponent to add a decorator element to modules
 * @author Sébastien Binda
 */
const Module = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    applicationId: PropTypes.string,
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
    active: PropTypes.bool,
    container: PropTypes.string,
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    page: PropTypes.shape({
      home: PropTypes.bool,
      iconType: PropTypes.oneOf([AccessDomain.PAGE_MODULE_ICON_TYPES]),
      customIconURL: PropTypes.string,
      // module titles by locale, as a json string
      title: PropTypes.objectOf(PropTypes.string),
    }),
    // module configuration, as a json string
    conf: PropTypes.objectOf(PropTypes.any),
  }),
})

const ModuleList = PropTypes.objectOf(Module)
const ModuleArray = PropTypes.arrayOf(Module)


module.exports = { ModuleList, Module, ModuleArray }
