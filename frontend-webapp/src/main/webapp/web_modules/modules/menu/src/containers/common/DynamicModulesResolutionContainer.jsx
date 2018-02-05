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
import { AccessShapes } from '@regardsoss/shape'
import { BasicPageableActions, BasicPageableSelectors } from '@regardsoss/store-utils'
import { HOCUtils } from '@regardsoss/display-control'

/**
 * Provides resolved dynamic modules list to children as follow:
 * 1 - Loads / selects the currently known dynamic modules list
 * 2 - Resolves module bundle
 * 3 - Provides, for each dynamic module the following fields:
 * {
 *   id: number, // module id
 *   default: boolean, // is the default module?
 *   type: string, // module type
 *   description: string, // description
 *   defaultIcon: function, // default module icon as a react component
 * }
 * @author Raphaël Mechali
 */
export class DynamicModulesResolutionContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { moduleSelectors }) {
    return {
      modules: moduleSelectors.getList(state),
      isFetching: moduleSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { moduleActions, applicationId }) {
    return {
      // fetch only when modules actions are provided
      fetchModules: () => moduleActions && dispatch(moduleActions.fetchPagedEntityList(0, null, { applicationId })),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    applicationId: PropTypes.string, // used only in map dispatch to props, when actions are provided
    // actions for modules results, keep null if this HOC should not fetch modules (user app pre-fetches modules list)
    // eslint-disable-next-line react/no-unused-prop-types
    moduleActions: PropTypes.instanceOf(BasicPageableActions), // used only in map dispatch to props
    // selectors for modules results
    // eslint-disable-next-line react/no-unused-prop-types
    moduleSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // used only in map state to props
    // from mapStateToProps
    modules: AccessShapes.ModuleList,
    isFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchModules: PropTypes.func.isRequired,
  }

  state = {
    childrenWithProps: [],
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component did mount. Used here to fetch data (if module actions were provided)
   */
  componentDidMount = () => this.props.fetchModules()

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
    if (!isEqual(oldProps.modules, newProps.modules) ||
      !isEqual(oldProps.children, newProps.children)) {
      const modulesDefinitions = [] // TODO resolve modules here
      // set up definitions in children
      this.setState({
        children: HOCUtils.cloneChildrenWith(newProps.children, { modulesDefinitions }),
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
export default connect(
  DynamicModulesResolutionContainer.mapStateToProps,
  DynamicModulesResolutionContainer.mapDispatchToProps)(DynamicModulesResolutionContainer)
