/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { AuthenticationParametersSelectors, AuthenticationClient } from '@regardsoss/authentication-utils'
import { isEqual } from 'date-fns'
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import { descriptionStateActions, descriptionStateSelectors } from '../../clients/DescriptionStateClient'
import EntityModelResolutionContainer from './EntityModelResolutionContainer'
import { TreePath } from '../../shapes/NavigationTree'

/**
 * Module container for runtime. This container handles dialog requests. When it should be handled by this module,
 * it initiliazes description context and provide the parameters to sub components.
 * @author Raphaël Mechali
 */
export class UserContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      // user auth info
      accessToken: AuthenticationClient.authenticationSelectors.getAccessToken(state),
      projectName: AuthenticationParametersSelectors.getProject(state),
      selectedTreePath: descriptionStateSelectors.getSelectedPath(state),
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
      setSelectedPath: entryPath => dispatch(descriptionStateActions.selectEntryPath(entryPath)),
    }
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,

    // from map state to props
    selectedTreePath: TreePath.isRequired,
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,

    // from map dispatch to props
    setSelectedPath: PropTypes.func.isRequired,
  }

  /**
   * User callback: On select tree path
   * @param {[number]} path selected path
   */
  onSelectTreePath = (path) => {
    const { selectedPath, setSelectedPath } = this.props
    if (!isEqual(path, selectedPath)) {
      setSelectedPath(path)
    }
  }

  /**
   * Computes if this module is shadow module (ie the module statically injected that should never be shown)
   * @return {boolean} true if that module is shadow module
   */
  isShadowModule() {
    const { moduleConf } = this.props
    return !moduleConf.runtime // shadow when runtime fields are not provided
  }


  render() {
    const {
      selectedTreePath, accessToken, projectName, moduleConf,
    } = this.props

    if (this.isShadowModule()) {
      return null
    }

    // render component with currently shown entity (it will hide if entity is undefined)
    return (
      <EntityModelResolutionContainer
        accessToken={accessToken}
        projectName={projectName}
        moduleConf={moduleConf}
        selectedTreePath={selectedTreePath}
        onSelectTreePath={this.onSelectTreePath}
      />)
  }
}
export default connect(
  UserContainer.mapStateToProps,
  UserContainer.mapDispatchToProps)(UserContainer)
