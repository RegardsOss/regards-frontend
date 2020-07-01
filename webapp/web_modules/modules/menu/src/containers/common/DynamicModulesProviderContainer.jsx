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
import filter from 'lodash/filter'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { HOCUtils } from '@regardsoss/display-control'
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * Dynamic modules provider: provides to children the list of resolved dynamic modules
 * @author Raphaël Mechali
 */
export class DynamicModulesProviderContainer extends React.Component {
  /**
   * Filters module list
   * @param modules modules array
   * @param dynamicContainerId dynamic container ID
   * @param keepOnlyActive should keep only active modules?
   * @return [Module] filtered dynamic modules list
   */
  static filterModules = (modules, dynamicContainerId, keepOnlyActive) => modules && filter(modules, (module) => get(module, 'content.container') === dynamicContainerId && (!keepOnlyActive || get(module, 'content.active')))

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { moduleSelectors, layoutSelectors }) {
    return {
      modules: moduleSelectors.getOrderedList(state),
      dynamicContainerId: layoutSelectors.getDynamicContainerId(state),
      isFetching: moduleSelectors.isFetching(state) || layoutSelectors.isFetching(state),
    }
  }

  static propTypes = {
    // selectors for modules results
    // eslint-disable-next-line react/no-unused-prop-types
    moduleSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // used only in map state to props
    // selectors for layout results
    // eslint-disable-next-line react/no-unused-prop-types
    layoutSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // used only in map state to props
    // should keep only active dynamic modules?
    // eslint-disable-next-line react/no-unused-prop-types
    keepOnlyActive: PropTypes.bool.isRequired, // used only in onPropertiesUpdated
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicContainerId: PropTypes.string, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleArray, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    isFetching: PropTypes.bool, // used only in onPropertiesUpdated
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (!isEqual(oldProps.modules, newProps.modules)
      || !isEqual(oldProps.dynamicContainerId, newProps.dynamicContainerId)
      || oldProps.children !== newProps.children) {
      const {
        modules, dynamicContainerId, keepOnlyActive, children,
      } = newProps
      const dynamicModules = DynamicModulesProviderContainer.filterModules(modules, dynamicContainerId, keepOnlyActive)

      this.setState({
        children: HOCUtils.cloneChildrenWith(children, {
          dynamicModules,
        }),
      })
    }
  }

  render() {
    const { isFetching } = this.props
    const { children } = this.state
    if (isFetching) {
      // no child should be shown while fetching
      return null
    }
    return HOCUtils.renderChildren(children)
  }
}
export default connect(DynamicModulesProviderContainer.mapStateToProps)(DynamicModulesProviderContainer)
