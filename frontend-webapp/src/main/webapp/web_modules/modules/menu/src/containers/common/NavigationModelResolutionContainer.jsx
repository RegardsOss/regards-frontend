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
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { AccessDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'

import { HOCUtils } from '@regardsoss/display-control'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../domain/NavigationItemTypes'

const EMPTY_PAGE = {
  home: false,
  title: {},
  iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
}

/**
 * Provides resolved navigation items list by comparing configuration with dynamic modules list. Takes clearNonNavigable
 * property in account when computing list
 * @author Raphaël Mechali
 */
export class NavigationModelResolutionContainer extends React.Component {
  /**
   * Converts elements to a navigation model
   * @param {*} navigationModules navigation modules
   * @param {boolean} clearNonNavigable should clear non navigable elements? (unknwon / inactive modules and empty sections)
   */
  static convertToNavigationModel(navigationModules, clearNonNavigable, currentModuleId) {
    // TODO also take in account the sections from configuration
    return navigationModules.reduce((model, {
      content: {
        id, type, active, description, page = EMPTY_PAGE,
      },
    }, index) => {
      const moduleLinkModel = {
        key: id,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        title: page.title, // TODO: page.home ? HOME PAGE CONFIG : page.title
        iconType: page.iconType, // TODO: page.home ? HOME PAGE CONFIG : page.iconType
        customIconURL: page.customIconURL, // TODO: page.home ? HOME PAGE CONFIG : page.customIconURL
        selected: id === currentModuleId,
        module: {
          id, type, description, home: page.home,
        },
      }
      // set home module as first in list
      return page.home ? [moduleLinkModel, ...model] : [...model, moduleLinkModel]
    }, [])
  }

  static propTypes = {
    // should clear non navigable elements? (unknwon / inactive modules and empty sections)
    // eslint-disable-next-line react/no-unused-prop-types
    clearNonNavigable: PropTypes.bool.isRequired, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicModules: PropTypes.arrayOf(AccessShapes.Module), // used only in onPropertiesUpdated
  }

  static defaultProps = {
    dynamicModules: [],
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // detect children or modules list changes
    // TODO: get navigation configuration too
    if (!isEqual(oldProps.dynamicModules, newProps.dynamicModules) ||
      !isEqual(oldProps.clearNonNavigable, newProps.clearNonNavigable) ||
      !isEqual(oldProps.currentModuleId, newProps.currentModuleId) ||
      oldProps.children !== newProps.children) {
      // 2 - convert modules and configuration into a navigation model
      const {
        dynamicModules, clearNonNavigable, currentModuleId, children,
      } = newProps
      const navigationElements =
        NavigationModelResolutionContainer.convertToNavigationModel(dynamicModules, clearNonNavigable, currentModuleId)
      // 3 - prepare children with model
      this.setState({
        children: HOCUtils.cloneChildrenWith(children, { navigationElements }),
      })
    }
  }


  render() {
    const { children } = this.state
    return HOCUtils.renderChildren(children)
  }
}
export default connect(
  NavigationModelResolutionContainer.mapStateToProps,
  NavigationModelResolutionContainer.mapDispatchToProps)(NavigationModelResolutionContainer)
