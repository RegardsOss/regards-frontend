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
 * Navigation related shapes
 * @author Raphaël Mechali
 */

/** Common to navigation items  */
const commonFields = {
  icon: PropTypes.string,
  labelFR: PropTypes.string.isRequired,
  labelEN: PropTypes.string.isRequired,
}

/** Fields for a configurated navigation item */
const navigationItemFields = {
  ...commonFields,
  moduleId: PropTypes.number.isRequired,
}

/** Navigation item as configured in admnistration */
export const NavigationItemShape = PropTypes.shape(navigationItemFields)

/** Navigation section as configured in administration */
const PartialNavigationSectionShape = PropTypes.shape(commonFields)
export const NavigationSectionShape = PropTypes.shape({
  ...commonFields,
  // Note: this definition is recurive, so we cannot setup here correctly the sub type
  items: PropTypes.arrayOf(PropTypes.oneOfType([PartialNavigationSectionShape, NavigationItemShape])),
})

/** Navigation model */
export const NavigationModel = PropTypes.shape({
  items: PropTypes.arrayOf(PropTypes.oneOfType([NavigationSectionShape, NavigationItemShape])),
})

// Corresponding items definitions at runtime
export const DynamicNavigationItemShape = PropTypes.shape({
  ...navigationItemFields,
  // runtime added data
  key: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  defaultIcon: PropTypes.func.isRequired,
})

export const DynamicNavigationNavigationShape = PropTypes.shape({
  ...commonFields,
  key: PropTypes.string,
  // runtime sections should be always filtered to show only those with items (same recursivity problem here)
  items: PropTypes.arrayOf(NavigationSectionShape).isRequired,
})

