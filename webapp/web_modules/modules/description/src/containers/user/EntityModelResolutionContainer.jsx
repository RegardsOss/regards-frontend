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
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import { TreePath } from '../../shapes/NavigationTree'
import MainModuleComponent from '../../components/user/MainModuleComponent'

/**
 * Comment Here
 * @author Raphaël Mechali
 */
export class EntityModelResolutionContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {}
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {}
  }

  static propTypes = {
    // children properties
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    moduleConf: ModuleConfiguration.isRequired,
    selectedTreePath: TreePath.isRequired,
    onSelectTreePath: PropTypes.func.isRequired, // tree selection callback: path => ()
  // from mapStateToProps
  // from mapDispatchToProps
  }

  // TODO resolve entity from module conf into an array of entity with tree model, then show child MainModuleComponent

  render() {
    const { maProp } = this.props
    return (
      <div />
    )
  }
}
export default connect(
  EntityModelResolutionContainer.mapStateToProps,
  EntityModelResolutionContainer.mapDispatchToProps)(EntityModelResolutionContainer)
