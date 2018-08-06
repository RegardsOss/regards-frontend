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
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'

/**
 * Tools for HOC (containers) to work with children (cloning, rendering...)
 * @author Raphaël Mechali
 */

/**
 * Computes if children should be cloned again, taking in account the reported properties
 * @param {*} oldProps old HOC properties
 * @param {*} newProps new HOC properties
 * @param {[string]} nonReportedPropsKeys list of property keys that the container will not report to children
 * @return true if children should be cloned again
 */
function shouldCloneChildren(oldProps, newProps, nonReportedPropsKeys) {
  const oldReportedProps = omit(oldProps, nonReportedPropsKeys)
  const newReportedProps = omit(newProps, nonReportedPropsKeys)
  return !isEqual(oldReportedProps, newReportedProps) || oldProps.children !== newProps.children
}

/**
 * Clones the list of children as parameter using the new props defined
 * @param children children as: undefined, single child or children list
 * @param newProps new children properties as undefined or new object (will be merged with current element properties)
 * @return [React.element] clone children list
 */
function cloneChildrenWith(children = [], newProps = {}) {
  if (isNil(children)) {
    return children
  }
  if (!isArray(children)) {
    return React.cloneElement(children, {
      ...children.props,
      ...newProps,
    })
  }
  return children.map(child => React.cloneElement(child, {
    ...child.props,
    ...newProps,
  }))
}

/**
 * Render method for HOC rendering only their children
 * @param {*} children  children list
 * @return {*} rendered children
 */
function renderChildren(children) {
  if (!children) {
    return null
  }
  switch (children.length) {
    case 0:
      return null
    case 1:
      return children[0]
    default:
      return children
  }
}

export default {
  shouldCloneChildren,
  cloneChildrenWith,
  renderChildren,
}
