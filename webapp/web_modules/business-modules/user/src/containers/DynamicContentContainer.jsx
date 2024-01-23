/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { AccessProjectClient, UIClient } from '@regardsoss/client'
import { LazyModuleComponent } from '@regardsoss/modules'
import { AccessShapes } from '@regardsoss/shape'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'

// get default modules client selector
const modulesSelectors = AccessProjectClient.getModuleSelectors()
// get default selected dynamic module actions (to update store when it changed)
const selectedDynamicModuleActions = new UIClient.SelectedDynamicModuleActions()

/**
 * Component to display the dynamic content of the application.
 * The dynamic content is one of the modules associated to the dynamic container content.
 * The module to display is retrieved from the url from react-router /modules/moduleId
 */
class DynamicContentContainer extends React.Component {
  static propTypes = {
    // From React router
    params: PropTypes.shape({
      project: PropTypes.string,
      moduleId: PropTypes.string,
    }),
    // from mapStateToProps
    module: AccessShapes.Module,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    setSelectedDynamicModule: PropTypes.func.isRequired, // used only in onPropertiesUpdated
    throwError: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { params }) {
    return {
      module: modulesSelectors.getById(state, params.moduleId),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      setSelectedDynamicModule: (moduleId) => dispatch(selectedDynamicModuleActions.setDynamicModule(moduleId)),
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
    }
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  static onPropertiesUpdated(oldProps, newProps) {
    const { module, setSelectedDynamicModule } = newProps
    if (oldProps.module !== newProps.module) {
      const moduleId = get(module, 'content.id', null)
      // update the redux app state
      setSelectedDynamicModule(moduleId)
    }
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => DynamicContentContainer.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component did mount. Used here to log error when no module is found
   */
  componentDidMount() {
    if (!this.props.module) {
      const message = `No module found for id=${this.props.params.moduleId}`
      console.warn(message)
      this.props.throwError(message)
    }
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => DynamicContentContainer.onPropertiesUpdated(this.props, nextProps)

  render() {
    if (this.props.module) {
      return (
        <LazyModuleComponent
          key={this.props.module.content.id}
          appName="user"
          project={this.props.params.project}
          module={this.props.module.content}
        />
      )
    }

    return null
  }
}

export default connect(
  DynamicContentContainer.mapStateToProps,
  DynamicContentContainer.mapDispatchToProps)(DynamicContentContainer)
