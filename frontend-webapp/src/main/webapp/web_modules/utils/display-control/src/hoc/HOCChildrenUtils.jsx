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
import keys from 'lodash/keys'
import omit from 'lodash/omit'

/**
 * Tools for HOC (containers) to work with children (cloning, rendering...)
 * @author Raphaël Mechali
 */

/**
 * Returns only props that have not been declared in that react element
 * @param {React.Element} thatElement instance of a react class element
 * @return properties in that element that have not been declare (allows reporting 'silent' properties only)
 */
function getOnlyNonDeclaredProps(thatElement) {
  return omit(thatElement.props, keys(thatElement.constructor.propTypes))
}

/**
 * Clones the list of children as parameter using the new props defined
 * @param children children as: undefined, single child or children list
 * @param newProps new children properties as undefined or new object (will be merged with current element properties)
 * @return [React.element] clone children list
 */
function cloneChildrenWith(children = [], newProps = {}) {
  const childrenArray = Array.isArray(children) ? children : [children]
  return childrenArray.map(child => React.cloneElement(child, {
    ...child.props,
    ...newProps,
  }))
}

/**
 * Default clone children implementation: clones children with added properties as parameter, without declared propTypes in hoc
 * @param {React.Element} thatElement instance of a react class element to use as root here
 * @param {*} addedProps map string value of properties to add in children
 * @return [React.Element] clone children list with added properties as parameter, without declared THAT ELEMENT propTypes
 */
function defaultCloneChildren(thatElement, addedProps) {
  // A - compute props
  const childrenProps = {
    ...getOnlyNonDeclaredProps(thatElement),
    ...addedProps,
  }
  // B - return cloned elements
  return cloneChildrenWith(thatElement.props.children, childrenProps)
}

/**
 * Render method for HOC rendering only their children
 * @param {*} children  children list
 * @return {*} rendered children
 */
function renderChildren(children = []) {
  switch (children.length) {
    case 0:
      return null
    case 1:
      return children[0]
    default:
      return <div>{children}</div>
  }
}

export default {
  getOnlyNonDeclaredProps,
  cloneChildrenWith,
  defaultCloneChildren,
  renderChildren,
}
