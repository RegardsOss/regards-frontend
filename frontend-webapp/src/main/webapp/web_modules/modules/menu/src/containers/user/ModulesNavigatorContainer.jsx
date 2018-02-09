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
import ModulesNavigatorComponent from '../../components/user/ModulesNavigatorComponent'

/**
* Container for modules navigation functionality
* @author Raphaël Mechali
*/
export class ModulesNavigatorContainer extends React.Component {
  static propTypes = {
    appName: PropTypes.string,
    project: PropTypes.string,
  }


  // TODO delete, and every sub element

  /**
   * Component lifecycle method: componentWillMount. This method is used here to initilize menu state
   */
  componentWillMount = () => this.setMenuOpen(false)

  /**
   * U8ser callback: on menu closed
   */
  onCloseMenu = () => this.setMenuOpen(false)
  /**
  * User callback: on menu state toggled
  */
  onToggleMenu = () => this.setMenuOpen(!this.state.menuOpen)

  /**
   * Callback : sets the menu opened state
   */
  setMenuOpen = menuOpen => this.setState({ menuOpen })

  /**
   * Is currently in user app?
   * @return true if user app, false otherwise
   */
  isUserApp = () => this.props.appName === 'user'

  render() {
    const { project } = this.props
    const { menuOpen } = this.state
    // show / hide the navigator according with current app (not required in admin)
    return this.isUserApp() ?
      <ModulesNavigatorComponent
        project={project}
        menuOpen={menuOpen}
        onCloseMenu={this.onCloseMenu}
        onToggleMenu={this.onToggleMenu}
      /> : null
  }
}

export default ModulesNavigatorContainer
