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
import { NAVIGATION_ITEM_TYPES_ENUM } from '../domain/NavigationItemTypes'

/**
 * Navigation related shapes
 * @author Raphaël Mechali
 */

const commonItemFields = {
  // map of title by locale
  key: PropTypes.number.isRequired,
  title: PropTypes.objectOf(PropTypes.string).isRequired,
  iconType: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES),
  customIconURL: PropTypes.string,
}

/** Module item */
export const ModuleNavigationItem = PropTypes.shape({
  ...commonItemFields,
  type: PropTypes.oneOf([NAVIGATION_ITEM_TYPES_ENUM.MODULE]).isRequired,
  module: PropTypes.shape({
    // fields from Module shape
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    home: PropTypes.bool,
  }),
})

/**
 * Section item
 * we need here to apply some lazy system to define the recursive section item
 * https://stackoverflow.com/questions/32063297/can-a-react-prop-type-be-defined-recursively
 */
let LazySectionNavigationItem
const lazy = f => () => f(...arguments)
const lazyNavigationItem = lazy(() => LazySectionNavigationItem)

LazySectionNavigationItem = PropTypes.shape({
  ...commonItemFields,
  type: PropTypes.oneOf([NAVIGATION_ITEM_TYPES_ENUM.SECTION]).isRequired,
  children: PropTypes.arrayOf(PropTypes.oneOfType([lazyNavigationItem, ModuleNavigationItem]).isRequired).isRequired,
})

export const SectionNavigationItem = LazySectionNavigationItem

export const NavigationItem = PropTypes.oneOfType([ModuleNavigationItem, SectionNavigationItem])
